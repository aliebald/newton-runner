import React, { ReactElement, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
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
	const graphInputRef = React.createRef<GraphInput>();
	const graphInputComponent = (
		<GraphInput cfg={props.config.graph} ref={graphInputRef}></GraphInput>
	);

	function setColorUpToX(x: number): void {
		graphInputRef?.current?.colorGraphUpToX(x);
	}

	return (
		<Container fluid>
			<Row className="mx-auto mt-1 boxWrapper">
				<Col sm="12" md="6">
					<h2 className="text-left title">{props.config.title}</h2>
					<p className="text-left">{props.config.description}</p>
					<div className="pt-3">{graphInputComponent}</div>
				</Col>
				<Col sm="12" md="6">
					<GameComponent
						settings={props.config.game}
						title={props.config.title}
						id={props.config.id}
						data={props.config.graph.data}
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						setGraphProgress={setColorUpToX}
						nextPage={props.nextPage}
					/>
					<div className="btnWrapper">
						<div className="btnWrapperLeft">
							<Button variant="primary" id="startGameBtn" className="px-3 mr-1">
								Spiel&nbsp;starten
							</Button>
							<Button variant="primary" id="restartGameBtn" className="px-3 mx-1">
								Nochmal&nbsp;versuchen
							</Button>
						</div>
						<div className="btnWrapperRight">
							<Button
								variant="primary"
								id="cameraLeftBtn"
								className="px-3 arrowKey my-1"
							>
								<i className="arrowLeft"></i>
							</Button>
							<div className="arrowKeysVertical">
								<Button
									variant="primary"
									id="cameraUpBtn"
									className="px-3 arrowKey"
								>
									<i className="arrowUp"></i>
								</Button>
								<Button
									variant="primary"
									id="cameraDownBtn"
									className="px-3 arrowKey"
								>
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
					</div>
				</Col>
			</Row>
		</Container>
	);
}
