import React, { ReactElement, useState } from "react";
import { Badge, Button, Card, Col, Form, FormCheck, Row } from "react-bootstrap";
import "./../css/style.quiz.css";

export interface QuestionConfig {
	/** The question text. Can be a string or JSX.Element, but be careful (test and check console before committing)! */
	question: JSX.Element | string;
	type: "multipleChoice" | "singleChoice";
	/** Array of options, each option represents a possible answer to the question */
	options: {
		/** One possible answer to the question. Can be a string or JSX.Element, but be careful (test and check console before committing)! */
		answer: JSX.Element | string;
		correct: boolean;
	}[];
}

export function Question(props: { config: QuestionConfig; id: number }): ReactElement {
	const [status, setStatus] = useState<"Unsolved" | "Correct" | "Incorrect">("Unsolved");
	const [badge, setBadge] = useState<"success" | "danger" | "info">("info");
	const [selected, setSelected] = useState<boolean[]>(props.config.options.map((_) => false));

	const formType = props.config.type === "multipleChoice" ? "checkbox" : "radio";
	const subtitle =
		props.config.type === "multipleChoice"
			? "Es können beliebig viele Antworten richtig sein."
			: "Es ist genau eine Antwort richtig.";

	// Updates selected options when a option is clicked
	function select(index: number) {
		const old = selected;
		old[index] = !old[index];
		setSelected(old);
	}

	// Check if the selected options are correct
	function check(): void {
		if (status === "Unsolved") {
			// Check if selected equals correct values
			for (let i = 0; i < selected.length; i++) {
				if (selected[i] !== props.config.options[i].correct) {
					setStatus("Incorrect");
					setBadge("danger");
					return;
				}
			}
			setStatus("Correct");
			setBadge("success");
		}
	}

	return (
		<Card className="questionBox">
			<Card.Body>
				<Card.Text className="mb-4">{props.config.question}</Card.Text>
				<fieldset>
					<Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
					<Form className="questionOptionsWrapper">
						<div>
							{props.config.options.map((option, index) => (
								<FormCheck
									type={formType}
									key={props.id + "-" + index}
									id={props.id + "-" + index}
									label={option.answer}
									onChange={() => select(index)}
									disabled={status !== "Unsolved"}
									className="questionOption"
								/>
							))}
						</div>
					</Form>
				</fieldset>
			</Card.Body>
			<Card.Footer>
				<Row className="text-center">
					<Col></Col>
					<Col>
						<Button
							variant="success"
							disabled={status !== "Unsolved"}
							onClick={() => {
								check();
							}}
						>
							L&ouml;sen
						</Button>
					</Col>
					<Col>
						<div className="quizStatusBadgeBox">
							<Badge variant={badge}>{status}</Badge>
						</div>
					</Col>
				</Row>
			</Card.Footer>
		</Card>
	);
}
