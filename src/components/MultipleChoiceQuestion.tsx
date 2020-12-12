import React, { ReactElement, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { getSolveButton } from "../questionLogic/questionUtility";
import {
	equal,
	getOptionalImageHeader,
	QuestionStatus,
	getCorrectAnswerVector,
	getEmptyAnswerVector,
	getAnswerBoxes
} from "../questionLogic/questionUtility";

export interface MultipleChoiceConfig {
	kind: "MultipleChoice" | "SingleChoice";
	text: string;
	statements: Array<StatementConfig>;
	imgPath?: string;
}

export interface StatementConfig {
	kind: "Statement";
	text: string;
	isTrue: boolean;
	imgPath?: string;
}

export function MultipleChoiceQuestion(props: {
	config: MultipleChoiceConfig | StatementConfig;
	idx: number;
}): ReactElement {
	const [status, setStatus] = useState(QuestionStatus.Unsolved);
	const [correctValues] = useState(getCorrectAnswerVector(props.config));
	const [selected, setSelected] = useState(getEmptyAnswerVector(props.config));
	const [answerBoxes] = useState(getAnswerBoxes(props.config, props.idx, select));
	const [image] = useState(getOptionalImageHeader(props.config.imgPath));
	const [solveButton, setSolveButton] = useState(getSolveButton(check));

	function select(idx: number) {
		const old = selected.slice();
		old[idx] = !old[idx];
		setSelected(old);
	}

	function check(): void {
		if (status === QuestionStatus.Unsolved) {
			if (equal(selected, correctValues)) {
				setStatus(QuestionStatus.Correct);
			} else {
				setStatus(QuestionStatus.Wrong);
			}
			setSolveButton(getSolveButton(check, false));
		}
	}

	return (
		<Card className="questionBox" key={props.idx.toString()}>
			{image}
			<Card.Body>
				<Card.Text>{props.config.text}</Card.Text>
				<br />
				<fieldset className="text-center">{answerBoxes}</fieldset>
			</Card.Body>
			<Card.Footer>
				<Row className="text-center">
					<Col></Col>
					<Col>{solveButton}</Col>
					<Col>{status}</Col>
				</Row>
			</Card.Footer>
		</Card>
	);
}
