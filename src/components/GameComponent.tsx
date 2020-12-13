import React, { ReactElement, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Game from "../gameLogic/game";
import { GameConfig } from "../gameLogic/GameConfig";
import { Redirect } from "react-router-dom";
import { saveTaskProgress, loadTaskProgress } from "../userdata";

// Information about the Error: https://github.com/react-bootstrap/react-bootstrap/issues/5075

export default class GameComponent extends React.Component<
	{
		settings: GameConfig;
		data: { y: number }[];
		setGraphProgress: (x: number) => void;
		title: string;
		id: string;
		nextPage: string;
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
	}) {
		super(props);
		// check if this game was already won once
		const task = loadTaskProgress(props.id);
		if (task && task.won) {
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

	public gameEnded = (goal: boolean, trap: boolean, score: number, restart: () => void): void => {
		this.setState({ restart: restart });

		let won = false;
		if (trap) {
			this.setState({
				showModal: true,
				nextBtnCSS: "none",
				retryBtnVariant: "primary",
				title: "Aufgabe fehlgeschlagen",
				text:
					"Pass auf, du bist in eine Falle getreten! Versuch das nächste mal nicht mit der Falle in berührung zu kommen."
			});
		} else if (
			(this.props.settings.pointsToWin && score >= this.props.settings.pointsToWin) ||
			goal
		) {
			won = true;
			console.log("Won");
			this.setState({
				showModal: true,
				nextBtnCSS: "inline-block",
				retryBtnVariant: "outline-primary",
				title: "Aufgabe erfolgreich abgeschlossen",
				text:
					"Gratuliere, du hast die Aufgabe erfolgreich mit " +
					score +
					" Punkten  abgeschlossen"
			});
		} else {
			console.log("Lost");
			this.setState({
				showModal: true,
				nextBtnCSS: "none",
				retryBtnVariant: "primary",
				title: "Aufgabe fehlgeschlagen",
				text: "Schade, vielleicht klappt es ja beim nächsten Versuch"
			});
		}

		// Save as task
		saveTaskProgress({
			type: "quest",
			id: this.props.id,
			title: this.props.title,
			won: won,
			achievedPoints: score,
			possiblePoints: 0 //TODO
		});

		console.log("btn: " + this.state.nextBtnCSS);
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
			this.props.setGraphProgress
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
