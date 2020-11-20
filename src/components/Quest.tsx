import React, { ReactElement } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { gameSettingsType } from "../GameLogic/gameSettingsType";
import GameComponent from "./GameComponent";

// TODO: Add Game component and Controller component
export default function Quest(props: { title: string; settings: gameSettingsType }): ReactElement {
	return (
		<Container fluid>
			<Row>
				<Col>
					<h3 className="text-center">{props.title}</h3>
				</Col>
			</Row>
			<Row>
				<Col sm="12" md="6">
					<p>Controller</p>
				</Col>
				<Col sm="12" md="6">
					<p>Game</p>
					<GameComponent settings={props.settings} />
				</Col>
			</Row>
		</Container>
	);
}
