import React, { ReactElement, useState } from "react";
import { Button, Card, Col, Form, FormCheck, Row } from "react-bootstrap";
import {
	equal,
	getOptionalImageElement,
	getQuestionStatusElement
} from "../questionLogic/questionUtility";
import { QuestionStatus } from "./Question";

export interface StatementConfig {
	kind: "Statement";
	text: string;
	isTrue: boolean;
	imgPath?: string;
}

export function BooleanQuestion(props: { config: StatementConfig; idx: number }): ReactElement {
	const [status, setStatus] = useState("Unsolved" as QuestionStatus);
	const [correctValues, setCorrectValues] = useState(getCorrectStateValues());
	const [selected, setSelected] = useState([false, false]);

	function getCorrectStateValues(): Array<boolean> {
		if (props.config.isTrue) {
			return [true, false];
		} else {
			return [false, true];
		}
	}

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
	return (
		<Card style={{ width: "40rem" }} key={props.idx.toString()}>
			{getOptionalImageElement(props.config.imgPath)}
			<Card.Body>
				<Card.Text className="text-left">{props.config.text}</Card.Text>
				<Form>
					<div key="default-radio" className="mb-3">
						<fieldset>
							<FormCheck
								type="radio"
								id={props.idx.toString() + "-bool-true"}
								label="Wahr"
								name="trueFalseRadios"
								onChange={() => select(0)}
							/>
							<FormCheck
								type="radio"
								id={props.idx.toString() + "-bool-false"}
								label="Falsch"
								name="trueFalseRadios"
								onChange={() => select(1)}
							/>
						</fieldset>
					</div>
				</Form>
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
