import React, { ReactElement } from "react";
import { Button, Modal } from "react-bootstrap";
import Game from "../gameLogic/game";
import { GameConfig } from "../gameLogic/GameConfig";
import { Redirect } from "react-router-dom";
import { saveProgress, loadQuestProgress } from "../userdata";

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
	},
	{
		showModal: boolean;
		restart: undefined | (() => void);
		title: string;
		text: string;
		redirect: string | null;
		nextBtnCSS: "none" | "inline-block";
		retryBtnVariant: "primary" | "outline-primary";
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
	}) {
		super(props);
		// check if this game was already won once
		const progress = loadQuestProgress(props.id);
		if (progress && progress.solved) {
			this.state = {
				showModal: true,
				restart: () => {
					this.setState({ showModal: false });
				},
				title: "Aufgabe bereits geschafft",
				text:
					"Sieht so aus als hättest du diese Aufgabe bereits geschafft. Willst du sie trotzdem nochmal versuchen?",
				redirect: null,
				nextBtnCSS: "inline-block",
				retryBtnVariant: "outline-primary"
			};
		} else {
			this.state = {
				showModal: false,
				restart: undefined,
				title: "",
				text: "",
				redirect: null,
				nextBtnCSS: "none",
				retryBtnVariant: "outline-primary"
			};
		}
	}

	public gameEnded = (
		goal: boolean,
		trap: boolean,
		bonusPoints: number,
		maxBonusPoints: number,
		restart: () => void
	): void => {
		this.setState({ restart: restart });

		let won = false;
		if (trap) {
			// Case: collided with trap
			this.setState({
				showModal: true,
				nextBtnCSS: "none",
				retryBtnVariant: "primary",
				title: "Aufgabe fehlgeschlagen",
				text:
					"Pass auf, du bist in eine Falle getreten! Versuch das nächste mal nicht mit der Falle in berührung zu kommen."
			});
		} else if (
			(this.props.settings.pointsToWin && bonusPoints >= this.props.settings.pointsToWin) ||
			goal
		) {
			// Case: won
			won = true;
			const text =
				maxBonusPoints > 0
					? `Gratuliere, du hast die Aufgabe erfolgreich mit ${bonusPoints} von ${maxBonusPoints} Punkten abgeschlossen`
					: `Gratuliere, du hast die Aufgabe erfolgreich abgeschlossen`;

			this.setState({
				showModal: true,
				nextBtnCSS: "inline-block",
				retryBtnVariant: "outline-primary",
				title: "Aufgabe erfolgreich abgeschlossen",
				text: text
			});
		} else {
			// Case: did not reach goal but time ran out
			this.setState({
				showModal: true,
				nextBtnCSS: "none",
				retryBtnVariant: "primary",
				title: "Aufgabe fehlgeschlagen",
				text: "Schade, vielleicht klappt es ja beim nächsten Versuch"
			});
		}

		// Save progress
		saveProgress({
			id: this.props.id,
			solved: won,
			attemptsLeft: 0, // TODO
			achievedBonusPoints: bonusPoints,
			achievedPoints: 0 // TODO
		});
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
							Nochmal versuchen
						</Button>
						<Button
							style={{ display: this.state.nextBtnCSS }}
							variant="primary"
							onClick={this.handleNext}
						>
							N&auml;chste Aufgabe
						</Button>
					</Modal.Footer>
				</Modal>
				<div id="gameDestination"></div>
			</>
		);
	}
}
