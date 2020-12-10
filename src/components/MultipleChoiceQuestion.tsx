import React, { ReactElement, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
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
		}
	}

	return (
		<Card className="questionBox" key={props.idx.toString()}>
			{image}
			<Card.Body>
				<Card.Text className="text-left">{props.config.text}</Card.Text>
				<br />
				<fieldset>{answerBoxes}</fieldset>
			</Card.Body>
			<Card.Footer>
				<Row>
					<Col></Col>
					<Col>
						<Button variant="success" onClick={() => check()}>
							Lösen
						</Button>
					</Col>
					<Col>{status}</Col>
				</Row>
			</Card.Footer>
		</Card>
	);
}
