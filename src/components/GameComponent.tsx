import React, { ReactElement } from "react";
import { Button, Modal } from "react-bootstrap";
import Game from "../gameLogic/game";
import { GameConfig } from "../gameLogic/GameConfig";
import { Redirect } from "react-router-dom";
import { loadQuestProgress, saveQuestAttempt } from "../userdata";

// Information about the Error: https://github.com/react-bootstrap/react-bootstrap/issues/5075

export default class GameComponent extends React.Component<
	{
		settings: GameConfig;
		data: { y: number }[];
		setGraphProgress: (x: number) => void;
		title: string;
		id: string;
		nextPage: string;
		setGameState: (state: "ready" | "running" | "ended") => void;
		setSolvedAtAttempt: (solved: number) => void;
		setAttempt: (attempt: number) => void;
	},
	{
		showModal: boolean;
		restart: undefined | (() => void);
		title: string;
		text: string;
		redirect: string | null;
		nextBtnCSS: "none" | "inline-block";
		retryBtnVariant: "primary" | "outline-primary";
		attempt: number;
		solved: boolean;
	}
> {
	constructor(props: {
		settings: GameConfig;
		data: { y: number }[];
		setGraphProgress: (x: number) => void;
		title: string;
		id: string;
		nextPage: string;
		setGameState: (state: "ready" | "running" | "ended") => void;
		setSolvedAtAttempt: (solved: number) => void;
		setAttempt: (attempt: number) => void;
	}) {
		super(props);
		// check if this game was already won once
		const progress = loadQuestProgress(props.id);
		const solved: boolean = progress.solvedAt >= 0;
		if (solved && progress.attempts) {
			props.setSolvedAtAttempt(progress.solvedAt);
		}
		const attempt = progress.attempts[progress.solvedAt];
		this.state = {
			showModal: solved,
			restart: () => {
				this.setState({ showModal: false });
			},
			title: solved ? "Quest bereits geschafft" : "",
			text: solved
				? `Du hast diese Quest bereits 
				${props.settings.pointsPerAttempt ? `mit ${attempt?.achievedPoints} Punkten ` : ""}
				${
					attempt?.achievedBonusPoints && attempt?.achievedBonusPoints > 0
						? "und " + attempt?.achievedBonusPoints + " Bonuspunkten"
						: ""
				}
				geschafft. Du kannst ${
					props.settings.pointsPerAttempt
						? "deine verdienten Punkte nicht mehr ändern, aber "
						: ""
				} die Quest trotzdem noch einmal versuchen (unbewertet).`
				: "",
			redirect: null,
			nextBtnCSS: solved ? "inline-block" : "none",
			retryBtnVariant: "outline-primary",
			attempt: progress.attempts.length + 1,
			solved: solved
		};
		this.props.setAttempt(this.state.attempt);
	}

	public gameEnded = (
		goal: boolean,
		trap: boolean,
		requiredTime: number,
		bonusPoints: number,
		maxBonusPoints: number,
		restart: () => void
	): void => {
		let won = false;
		const points =
			this.props.settings.pointsPerAttempt &&
			this.props.settings.pointsPerAttempt.length > this.state.attempt
				? this.props.settings.pointsPerAttempt[this.state.attempt - 1]
				: 0;
		// maxPoints is -1 if pointsPerAttempt is undefined, this is used bellow as a compact check if pointsPerAttempt is defined
		const maxPoints =
			this.props.settings.pointsPerAttempt && this.props.settings.pointsPerAttempt.length > 0
				? max(this.props.settings.pointsPerAttempt)
				: -1;

		if (trap) {
			// Case: collided with trap
			this.setState({
				showModal: true,
				nextBtnCSS: "none",
				retryBtnVariant: "primary",
				title: "Quest fehlgeschlagen",
				text:
					"Pass auf, du bist in eine Falle getreten! Versuch das nächste mal nicht mit der Falle in berührung zu kommen."
			});
		} else if (
			(this.props.settings.pointsToWin && bonusPoints >= this.props.settings.pointsToWin) ||
			goal
		) {
			// Case: won
			won = true;
			this.setState({
				showModal: true,
				nextBtnCSS: "inline-block",
				retryBtnVariant: "outline-primary",
				title: "Quest erfolgreich abgeschlossen",
				text: `Gratuliere, du hast die Quest erfolgreich 
					${maxPoints >= 0 || maxBonusPoints > 0 ? "mit " : ""}
					${maxPoints >= 0 ? points + " von " + maxPoints + " Punkten und " : ""}
					${maxBonusPoints > 0 ? bonusPoints + " von " + maxBonusPoints + " Bonuspunkten " : ""}
					abgeschlossen.
					${
						this.state.solved
							? " Da du in einem vorherigen Versuch die Quest bereits bestanden hast, wird dieser Versuch nicht gewertet."
							: ""
					}`
			});
		} else {
			// Case: did not reach goal but time ran out
			this.setState({
				showModal: true,
				nextBtnCSS: "none",
				retryBtnVariant: "primary",
				title: "Quest fehlgeschlagen",
				text: "Schade, vielleicht klappt es ja beim nächsten Versuch"
			});
		}

		saveQuestAttempt(this.props.id, {
			solved: won,
			requiredTime: requiredTime,
			achievedBonusPoints: bonusPoints,
			achievedPoints: points
		});

		if (won) {
			this.props.setSolvedAtAttempt(this.state.attempt);
		}
		this.setState({ restart: restart, attempt: this.state.attempt + 1 });
		this.props.setAttempt(this.state.attempt);
	};

	/**
	 * Closes the modal
	 */
	private handleClose = () => {
		this.setState({ showModal: false });
	};

	/**
	 * Restart the game
	 */
	private handleRestart = () => {
		this.setState({ showModal: false });
		if (this.state.restart) {
			this.state.restart();
		} else {
			console.log("%cERROR: restart function is not defined", "color: red");
		}
	};

	/**
	 * Go to the next Page
	 */
	private handleNext = () => {
		this.setState({ showModal: false, redirect: this.props.nextPage });
	};

	componentDidMount(): void {
		new Game(
			this.props.settings,
			this.props.data,
			this.gameEnded.bind(this),
			this.props.setGraphProgress,
			this.props.setGameState
		);
	}

	render(): ReactElement {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		}
		return (
			<>
				<Modal
					show={this.state.showModal}
					onHide={this.handleClose}
					centered
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>{this.state.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{this.state.text}</Modal.Body>
					<Modal.Footer>
						<Button
							variant={this.state.retryBtnVariant}
							id="restartGameBtnModal"
							onClick={this.handleRestart}
						>
							Nochmal&nbsp;versuchen
						</Button>
						<Button
							style={{ display: this.state.nextBtnCSS }}
							variant="primary"
							onClick={this.handleNext}
						>
							N&auml;chste&nbsp;Quest
						</Button>
					</Modal.Footer>
				</Modal>
				<div id="gameDestination"></div>
			</>
		);
	}
}

// finds largest value in number array
function max(array: number[]): number {
	let ret = array[0];
	for (let i = 1; i < array.length; i++) {
		if (array[i] > ret) {
			ret = array[i];
		}
	}
	return ret;
}
