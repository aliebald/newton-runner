import React, { ReactElement } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { QuizProgress } from "../userdata";
import { QuizConfig } from "./Quiz";

export default function StatisticQuiz(props: {
	quizProgress: QuizProgress | undefined;
	quizConfig: QuizConfig;
}): ReactElement {
	let points = 0;
	let solved = 0;
	let progressBadge = "Ungelöst";
	let allSolved = false;

	if (props.quizProgress) {
		props.quizProgress.questions.forEach((question) => {
			if (question.state === "correct") {
				points++;
				solved++;
			} else if (question.state === "incorrect") {
				solved++;
			}
		});
		if (solved === props.quizProgress.questions.length) {
			progressBadge = "Gelöst";
			allSolved = true;
		} else if (solved > 0) {
			progressBadge = "Begonnen";
		}
	}

	return (
		<div className="separator">
			<div className="d-flex pt-4">
				<h4 className="mr-auto">{props.quizConfig.title}</h4>
				<div className={allSolved ? "infoBoxOuter correct" : "infoBoxOuter"}>
					<div className="infoBoxText">{progressBadge}</div>
				</div>
			</div>
			<Row className="pt-2">
				<Col>
					<div>
						{solved} von {props.quizConfig.questions.length} Aufgaben bearbeitet
					</div>
					<ProgressBar
						variant="success"
						now={solved}
						max={props.quizConfig.questions.length}
						className="smallProgress"
					/>
				</Col>
				<Col>
					<div>
						{points} von {props.quizConfig.questions.length} Punkten
					</div>
					<ProgressBar
						variant="success"
						now={points}
						max={props.quizConfig.questions.length}
						className="smallProgress"
					/>
				</Col>
				<Col></Col>
			</Row>
		</div>
	);
}
