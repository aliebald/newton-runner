import React, { ReactElement } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { gameSettingsType } from "../GameLogic/gameSettingsType";
import GameComponent from "./GameComponent";
import GraphInput, { GraphInputConfig } from "./GraphInput";

export interface QuestConfig {
	title: string;
	game: gameSettingsType;
	graph: GraphInputConfig;
}

// TODO: Add Game component and Controller component
export default function Quest(props: { config: QuestConfig }): ReactElement {
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
				</Col>
				<Col sm="12" md="6">
					<p>Game</p>
					<GameComponent settings={props.config.game} />
				</Col>
			</Row>
		</Container>
	);
}
