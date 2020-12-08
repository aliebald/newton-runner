import React, { ReactElement, useState } from "react";
import { Button, Card, Col, Form, FormCheck, Row } from "react-bootstrap";
import {
	equal,
	getOptionalImageElement,
	getQuestionStatusElement
} from "../questionLogic/questionUtility";
import { StatementConfig } from "./BooleanQuestion";
import { QuestionStatus } from "./Question";

export interface SingleChoiceConfig {
	kind: "SingleChoice";
	text: string;
	statements: Array<StatementConfig>;
	imgPath?: string;
}

export function SingleChoiceQuestion(props: {
	config: SingleChoiceConfig;
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

	function getRadioButtons(): ReactElement {
		return (
			<Form>
				<div key="default-radio" className="mb-3">
					<fieldset>
						{props.config.statements.map((e, idx) => mapStatementToButton(e, idx))}
					</fieldset>
				</div>
			</Form>
		);
	}

	function mapStatementToButton(elementConfig: StatementConfig, idx: number): ReactElement {
		return (
			<FormCheck
				type="radio"
				id={props.idx.toString() + "-sc-" + idx.toString()}
				label={elementConfig.text}
				name="scRadioButton"
				onChange={() => select(idx)}
			/>
		);
	}

	return (
		<Card style={{ width: "40rem" }} key={props.idx.toString()}>
			{getOptionalImageElement(props.config.imgPath)}
			<Card.Body>
				<Card.Text className="text-left">{props.config.text}</Card.Text>
				<br />
				<Card.Subtitle className="mb-2 text-muted">
					Es ist genau eine Antwort richtig.
				</Card.Subtitle>
				<fieldset>{getRadioButtons()}</fieldset>
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
