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
	const solved = props.questProgress.attempts.length >= 0;
	// temporary index, only showing the first successful attempt
	const index = props.questProgress.solvedAt;
	if (index < 0) {
		return <></>;
	}
	return (
		<div className="separator">
			<div className="d-flex pt-4">
				<h4 className="mr-auto">{props.questStats.title}</h4>
				<div className={solved ? "infoBoxOuter correct" : "infoBoxOuter"}>
					<div className="infoBoxText">{solved ? "Gelöst" : "Ungelöst"}</div>
				</div>
			</div>
			<Row className="pt-2">
				<Col>
					<div>
						{props.questProgress.attempts[index].achievedPoints} von{" "}
						{props.questStats.maxPoints} Punkten
					</div>
					<ProgressBar
						variant="success"
						now={props.questProgress.attempts[index].achievedPoints}
						max={props.questStats.maxPoints}
						className="smallProgress"
					/>
					<div className="pb-2">
						{props.questProgress.attempts.length + 1} Versuche ben&ouml;tigt
					</div>
				</Col>
				<Col>
					<div>
						{props.questProgress.attempts[index].achievedBonusPoints} von{" "}
						{props.questStats.maxBonuspoints}
						{props.questStats.maxBonuspoints > 1 ? " Bonuspunkten" : " Bonuspunkt"}
					</div>
					<ProgressBar
						variant="success"
						now={props.questProgress.attempts[index].achievedBonusPoints}
						max={props.questStats.maxBonuspoints}
						className="smallProgress"
					/>
				</Col>
				<Col>
					<div>
						{props.questProgress.attempts[index].requiredTime} von{" "}
						{props.questStats.maxTime} Sekunden ben&ouml;tigt
					</div>
					<ProgressBar
						variant="success"
						now={props.questProgress.attempts[index].requiredTime}
						max={props.questStats.maxTime}
						className="smallProgress"
					/>
				</Col>
			</Row>
		</div>
	);
}
