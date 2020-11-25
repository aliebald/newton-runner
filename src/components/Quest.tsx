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

// TODO: Add Game component and Controller component
export default function Quest(props: { config: QuestConfig }): ReactElement {
	const runGame = () => console.log(props.config.graph.data);

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
					<Button variant="primary" onClick={runGame}>
						Log Data array
					</Button>
				</Col>
				<Col sm="12" md="6">
					<p>Game</p>
					<GameComponent settings={props.config.game} />
				</Col>
			</Row>
		</Container>
	);
}
