import React, { ReactElement } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { QuestProgress } from "../userdata";
import "./../css/style.statistics.css";

export interface QuestStats {
	title: string;
	maxPoints: number;
	maxBonuspoints: number;
	maxTime: number;
}

// Statistics for a single quest. Named StatisticQuest for better overview in components folder
export function StatisticQuest(props: {
	questProgress: QuestProgress;
	questStats: QuestStats;
}): ReactElement {
	return (
		<div className="separator">
			<div className="d-flex pt-3">
				<h4 className="mr-auto">{props.questStats.title}</h4>
				<div
					className={props.questProgress.solved ? "infoBoxOuter correct" : "infoBoxOuter"}
				>
					<div className="infoBoxText">
						{props.questProgress.solved ? "Gelöst" : "Ungelöst"}
					</div>
				</div>
			</div>
			<Row className="pt-2">
				<Col>
					<div>
						{props.questProgress.achievedPoints} von {props.questStats.maxPoints}{" "}
						Punkten
					</div>
					<ProgressBar
						variant="success"
						now={props.questProgress.achievedPoints}
						max={props.questStats.maxPoints}
						className="smallProgress"
					/>
					<div className="pb-2">
						{props.questProgress.attempts} Versuche ben&ouml;tigt
					</div>
				</Col>
				<Col>
					<div>
						{props.questProgress.achievedBonusPoints} von{" "}
						{props.questStats.maxBonuspoints}
						{props.questStats.maxBonuspoints > 1 ? " Bonuspunkten" : " Bonuspunkt"}
					</div>
					<ProgressBar
						variant="success"
						now={props.questProgress.achievedBonusPoints}
						max={props.questStats.maxBonuspoints}
						className="smallProgress"
					/>
				</Col>
				<Col>
					<div>
						{props.questProgress.requiredTime} von {props.questStats.maxTime} Sekunden
						ben&ouml;tigt
					</div>
					<ProgressBar
						variant="success"
						now={props.questProgress.requiredTime}
						max={props.questStats.maxTime}
						className="smallProgress"
					/>
				</Col>
			</Row>
		</div>
	);
}
