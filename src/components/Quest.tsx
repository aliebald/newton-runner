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

export default function Quest(props: { config: QuestConfig }): ReactElement {
	// Log game data (for debugging)
	const logData = () => console.log(props.config.graph.data);

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
					<Button variant="primary" id="startGameBtn">
						Start Game
					</Button>{" "}
					<Button variant="primary" id="restartGameBtn">
						Restart Game
					</Button>
				</Col>
				<Col sm="12" md="6">
					<p>Game</p>
					<GameComponent settings={props.config.game} data={props.config.graph.data} />
				</Col>
			</Row>
		</Container>
	);
}
