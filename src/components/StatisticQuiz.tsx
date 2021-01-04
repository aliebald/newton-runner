import React, { ReactElement } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { QuizProgress } from "../userdata";
import { QuizConfig } from "./Quiz";
import TextProgressBar from "./TextProgressBar";

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
					<TextProgressBar
						now={solved}
						max={props.quizConfig.questions.length}
						label="Aufgaben bearbeitet"
						prefix
					/>
				</Col>
				<Col>
					<TextProgressBar
						now={points}
						max={props.quizConfig.questions.length}
						label="Punkten"
						prefix
					/>
				</Col>
				<Col></Col>
			</Row>
		</div>
	);
}
