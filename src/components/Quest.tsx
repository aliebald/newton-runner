import React, { ReactElement, useRef, useState } from "react";
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
	const [gameState, setGameState] = useState<"ready" | "running" | "ended">("ready");
	const graphInput = useRef<GraphInput>(null);

	function setColorUpToX(x: number): void {
		graphInput?.current?.colorGraphUpToX(x);
	}

	return (
		<Container fluid>
			<Row className="mx-auto mt-3 boxWrapper">
				<Col sm="12" md="6">
					<h2 className="text-left title">{props.config.title}</h2>
					<p className="text-left">{props.config.description}</p>
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
								disabled={gameState === "ready"}
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
}
