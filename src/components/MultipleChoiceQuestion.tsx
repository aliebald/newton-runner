import React, { ReactElement, useState } from "react";
import { Button, Card, Col, Form, FormCheck, Row } from "react-bootstrap";
import {
	equal,
	getOptionalImageElement,
	getQuestionStatusElement
} from "../questionLogic/questionUtility";
import { StatementConfig } from "./BooleanQuestion";
import { QuestionStatus } from "./Question";

export interface MultipleChoiceConfig {
	kind: "MultipleChoice";
	text: string;
	statements: Array<StatementConfig>;
	imgPath?: string;
}

export function MultipleChoiceQuestion(props: {
	config: MultipleChoiceConfig;
	idx: number;
}): ReactElement {
	const [status, setStatus] = useState("Unsolved" as QuestionStatus);
	const [correctValues, setCorrectValues] = useState(
		props.config.statements.map((s) => s.isTrue)
	);
	const [selected, setSelected] = useState(props.config.statements.map((s) => false));

	function check(): void {
		if (status == "Unsolved") {
			if (equal(selected, correctValues)) {
				setStatus("Correct");
			} else {
				setStatus("Wrong");
			}
		}
	}

	function select(idx: number) {
		const old = selected.slice();
		old[idx] = !old[idx];
		setSelected(old);
	}

	function getCheckboxes(): ReactElement {
		return (
			<Form>
				<div key="default-radio" className="mb-3">
					{props.config.statements.map((e, idx) => mapStatementToButton(e, idx))}
				</div>
			</Form>
		);
	}

	function mapStatementToButton(elementConfig: StatementConfig, idx: number): ReactElement {
		return (
			<FormCheck
				type="checkbox"
				id={props.idx.toString() + "-mc-" + idx.toString()}
				label={elementConfig.text}
				name="mcCheckbox"
				onChange={() => select(idx)}
			/>
		);
	}

	return (
		<Card className="questionBox" key={props.idx.toString()}>
			{getOptionalImageElement(props.config.imgPath)}
			<Card.Body>
				<Card.Text className="text-left">{props.config.text}</Card.Text>
				<br />
				<Card.Subtitle className="mb-2 text-muted">
					Es können beliebig viele Antworten richtig sein.
				</Card.Subtitle>
				<fieldset>{getCheckboxes()}</fieldset>
			</Card.Body>
			<Card.Footer>
				<Row>
					<Col></Col>
					<Col>
						<Button variant="success" onClick={() => check()}>
							Lösen
						</Button>
					</Col>
					<Col>{getQuestionStatusElement(status)}</Col>
				</Row>
			</Card.Footer>
		</Card>
	);
}
