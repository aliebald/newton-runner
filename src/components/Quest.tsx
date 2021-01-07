import React, { ReactElement, useRef, useState } from "react";
import { Container, Row, Col, Button, OverlayTrigger, Popover } from "react-bootstrap";
import { GameConfig } from "../gameLogic/GameConfig";
import GameComponent from "./GameComponent";
import GraphInput, { GraphInputConfig } from "./GraphInput";
import "./../css/style.quest.css";

export interface QuestConfig {
	title: string;
	id: string;
	description: string;
	game: GameConfig;
	graph: GraphInputConfig;
}

export default function Quest(props: { config: QuestConfig; nextPage: string }): ReactElement {
	const [gameState, setGameState] = useState<"ready" | "running" | "ended" | "restarting">(
		"ready"
	);
	const [attempt, setAttempt] = useState(1);
	// solvedAtAttempt is -1 if Quest is unsolved and a positive number if it is saved. This number is the attempt at which the quest was solved
	const [solvedAtAttempt, setSolvedAtAttempt] = useState<number>(-1);

	const graphInput = useRef<GraphInput>(null);

	function setColorUpToX(x: number): void {
		graphInput?.current?.colorGraphUpToX(x);
	}

	return (
		<Container fluid>
			<Row className="mx-auto mt-3 boxWrapper">
				<Col sm="12" md="6">
					<Row>
						<Col
							xs={{ span: 12, order: 1 }}
							sm={{ span: 12, order: 1 }}
							lg={{ span: 6, order: 1 }}
							xl={{ span: 7, order: 1 }}
							className="py-1"
						>
							<h2 className="title">{props.config.title}</h2>
						</Col>
						<Col
							xs={{ span: 12, order: 4 }}
							sm={{ span: 12, order: 4 }}
							lg={{ span: 6, order: 2 }}
							xl={{ span: 5, order: 2 }}
							className="py-1 align-self-center"
						>
							<InfoTags
								pointsPerAttempt={props.config.game.pointsPerAttempt}
								attempt={attempt}
								solvedAtAttempt={solvedAtAttempt}
							/>
						</Col>
						<Col
							xs={{ span: 12, order: 3 }}
							sm={{ span: 12, order: 3 }}
							className="py-1"
						>
							<p>{props.config.description}</p>
						</Col>
					</Row>
					<div className="pt-3">
						<GraphInput cfg={props.config.graph} ref={graphInput}></GraphInput>
					</div>
				</Col>
				<Col sm="12" md="6">
					<GameComponent
						settings={props.config.game}
						title={props.config.title}
						id={props.config.id}
						data={props.config.graph.data}
						setGraphProgress={setColorUpToX}
						nextPage={props.nextPage}
						setGameState={setGameState}
						setAttempt={setAttempt}
						setSolvedAtAttempt={setSolvedAtAttempt}
					/>
					<div className="btnWrapper">
						<div className="btnWrapperLeft">
							<Button
								variant="primary"
								id="startGameBtn"
								className="px-3 mr-1"
								disabled={gameState !== "ready"}
							>
								Spiel&nbsp;starten
							</Button>
							<Button
								variant="primary"
								id="restartGameBtn"
								className="px-3"
								disabled={gameState === "ready" || gameState === "restarting"}
							>
								Nochmal&nbsp;versuchen
							</Button>
						</div>
						<div className="btnWrapperRight">
							<Button
								variant="primary"
								id="cameraLeftBtn"
								className="px-3 arrowKey my-1"
								disabled={gameState !== "ready"}
							>
								<i className="arrowLeft"></i>
							</Button>
							<div className="arrowKeysVertical">
								<Button
									variant="primary"
									id="cameraUpBtn"
									className="px-3 arrowKey"
									disabled={gameState !== "ready"}
								>
									<i className="arrowUp"></i>
								</Button>
								<Button
									variant="primary"
									id="cameraDownBtn"
									className="px-3 arrowKey"
									disabled={gameState !== "ready"}
								>
									<i className="arrowDown"></i>
								</Button>
							</div>
							<Button
								variant="primary"
								id="cameraRightBtn"
								className="px-3 arrowKey my-1"
								disabled={gameState !== "ready"}
							>
								<i className="arrowRight"></i>
							</Button>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);

	function InfoTags(props: {
		pointsPerAttempt?: number[];
		attempt: number;
		solvedAtAttempt: number;
	}): JSX.Element {
		let label: string, title: string;
		let exerciseMode = false;
		const text: JSX.Element[] = [];

		if (props.pointsPerAttempt) {
			exerciseMode = props.solvedAtAttempt > 0;
			label = exerciseMode ? "Übungsmodus" : "Bewertet";
			title = exerciseMode
				? "Du hast die Quest bereits bestanden"
				: "Diese Quest ist Bewertet";
		} else {
			label = "Unbewertet";
			title = "Diese Quest ist nicht bewertet";
		}

		if (props.pointsPerAttempt) {
			// Basic description for rated mode
			text.push(
				<div key={"description"} className="pb-1">
					Umso weniger Versuche du f&uuml;r die Quest ben&ouml;tigst, umso mehr Punkte
					bekommst du. Die Punkteverteilung ist Quest abh&auml;ngig.
					<br />
				</div>
			);
			for (let i = 0; i < props.pointsPerAttempt.length; i++) {
				// Highlight the current or (if exists) successful attempt. Cross out everything before this index (highlight index bellow)
				const highlight = exerciseMode ? props.solvedAtAttempt : props.attempt;
				const style =
					i + 1 === highlight
						? "colorSecondary"
						: i + 1 >= highlight
						? ""
						: "textLineThrough";
				// List all attempt / points ratios
				text.push(
					<div key={i} className={style}>
						{i + 1}-ter Versuch: {props.pointsPerAttempt[i]} Punkte
						<br />
					</div>
				);
			}

			// Note at the bottom if in exerciseMode
			if (exerciseMode) {
				text.push(
					<div key={"exerciseModeNote"} className="pt-1">
						Du hast die Quest bereits im {solvedAtAttempt} Versuch bestanden. Du kannst
						deine verdienten Punkte nicht mehr &auml;ndern, aber die Quest trotzdem noch
						einmal versuchen.
					</div>
				);
			}
		} else {
			text.push(
				<p key={0}>In dieser Aufgabe kannst du keine regul&auml;ren Punkte sammeln.</p>
			);
		}

		// The popover you see when hovering over the label
		const ratingPopover = (
			<Popover id="ratingPopover">
				<Popover.Title as="h3">{title}</Popover.Title>
				<Popover.Content>{text}</Popover.Content>
			</Popover>
		);

		return (
			<div className="d-flex justify-content-end">
				<div className="infoBoxOuter">
					<div className="infoBoxText">Versuch&nbsp;{props.attempt}</div>
				</div>
				<OverlayTrigger
					placement="auto"
					delay={{ show: 0, hide: 150 }}
					overlay={ratingPopover}
					/* setting transition to false will avoids a React.findDOMNode call, which is not strict mode compliant (but still works) */
					transition={true}
				>
					{({ ref, ...triggerHandler }) => (
						<div
							className="infoBoxOuter infoBoxOuterInteractive"
							{...triggerHandler}
							ref={ref}
						>
							<div className="infoBoxText pr-0">{label}&nbsp;</div>
							<div className="infoIcon">&#x1F6C8;</div>
						</div>
					)}
				</OverlayTrigger>
			</div>
		);
	}
}
