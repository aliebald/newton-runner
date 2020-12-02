import React, { ReactElement } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GameConfig } from "../GameLogic/GameConfig";
import GameComponent from "./GameComponent";
import GraphInput, { GraphInputConfig } from "./GraphInput";
import "./../css/style.quest.css";

export interface QuestConfig {
	title: string;
	description: string;
	game: GameConfig;
	graph: GraphInputConfig;
}

export default function Quest(props: { config: QuestConfig }): ReactElement {
	return (
		<Container fluid>
			<Row className="mx-2 mt-1">
				<Col sm="12" md="6">
					<h2 className="text-left">{props.config.title}</h2>
					<p className="text-left">{props.config.description}</p>
					<div className="pt-3">
						<GraphInput cfg={props.config.graph}></GraphInput>
					</div>
				</Col>
				<Col sm="12" md="6">
					<GameComponent settings={props.config.game} data={props.config.graph.data} />
					<div className="pt-2">
						<Button variant="primary" id="startGameBtn" className="px-3 mx-1">
							Spiel&nbsp;starten
						</Button>
						<Button variant="primary" id="restartGameBtn" className="px-3 mx-1">
							Nochmal&nbsp;versuchen
						</Button>
						<Button variant="primary" id="cameraLeftBtn" className="px-3 arrowKey my-1">
							<i className="arrowLeft"></i>
						</Button>
						<div className="arrowKeysVertical">
							<Button variant="primary" id="cameraUpBtn" className="px-3 arrowKey">
								<i className="arrowUp"></i>
							</Button>
							<Button variant="primary" id="cameraDownBtn" className="px-3 arrowKey">
								<i className="arrowDown"></i>
							</Button>
						</div>
						<Button
							variant="primary"
							id="cameraRightBtn"
							className="px-3 arrowKey my-1"
						>
							<i className="arrowRight"></i>
						</Button>
					</div>
				</Col>
			</Row>
		</Container>
	);
}
