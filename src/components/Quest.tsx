import React, { ReactElement } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GameConfig } from "../GameLogic/GameConfig";
import GameComponent from "./GameComponent";
import GraphInput, { GraphInputConfig } from "./GraphInput";

export interface QuestConfig {
	title: string;
	game: GameConfig;
	graph: GraphInputConfig;
}

// Game started?
let start = false;

export default function Quest(props: { config: QuestConfig }): ReactElement {
	// Log game data (for debugging)
	const logData = () => console.log(props.config.graph.data);

	// Start the game
	const startGame = () => {
		start = true;
		console.log("Game started");
	};

	// Get the state of start from another component
	const started = () => {
		return start;
	};

	return (
		<Container fluid>
			<Row>
				<Col>
					<h3 className="text-center">{props.config.title}</h3>
				</Col>
			</Row>
			<Row>
				<Col sm="12" md="6">
					<p>Controller</p>
					<GraphInput cfg={props.config.graph}></GraphInput>
					<Button variant="secondary" onClick={logData}>
						Log Data array
					</Button>{" "}
					<Button variant="primary" onClick={startGame}>
						Start Game
					</Button>
				</Col>
				<Col sm="12" md="6">
					<p>Game</p>
					<GameComponent
						settings={props.config.game}
						data={props.config.graph.data}
						started={started}
					/>
				</Col>
			</Row>
		</Container>
	);
}
