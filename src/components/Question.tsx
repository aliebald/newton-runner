import React, { ReactElement, useState } from "react";
import { Badge, Button, Card, Col, Form, FormCheck, Row } from "react-bootstrap";
import "./../css/style.quiz.css";

export interface QuestionConfig {
	id: string;
	/** A Hint that is shown after the Question was answered */
	solutionHint?: string;
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

export type questionStateType = "unsolved" | "correct" | "incorrect";

export function Question(props: {
	config: QuestionConfig;
	state: questionStateType;
	saveState: (state: questionStateType, questionId: string) => void;
	rated: boolean;
}): ReactElement {
	const [state, setState] = useState<questionStateType>(props.state);
	const [retry, setRetry] = useState<boolean>(false);
	const [selected, setSelected] = useState<boolean[]>(props.config.options.map((_) => false));

	const formType = props.config.type === "multipleChoice" ? "checkbox" : "radio";
	const subtitle =
		props.config.type === "multipleChoice"
			? "Es können beliebig viele Antworten richtig sein."
			: "Es ist genau eine Antwort richtig.";

	const showHint =
		props.config.solutionHint !== undefined && state !== "unsolved" && retry === false;
	console.log("showHint " + showHint);

	const solveBtn = retry ? (
		<div className="d-flex justify-content-center">
			<Button
				className="mr-1"
				variant="primary"
				onClick={() => {
					setRetry(false);
					setAndUpdateState("unsolved");
				}}
			>
				Nochmal&nbsp;Versuchen
			</Button>
			<Button
				variant="primary"
				onClick={() => {
					setRetry(false);
					setAndUpdateState("incorrect");
				}}
			>
				L&ouml;sung&nbsp;anzeigen
			</Button>
		</div>
	) : (
		<Button
			variant="primary"
			disabled={state !== "unsolved"}
			onClick={() => {
				check();
			}}
		>
			{state === "unsolved" ? "Lösen" : "Bereits gelöst"}
		</Button>
	);

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
									key={props.config.id + "-" + index}
									name={props.config.id}
									id={props.config.id + "-" + index}
									label={option.answer}
									onChange={() => select(index)}
									disabled={state !== "unsolved"}
									className="questionOption"
								/>
							))}
						</div>
					</Form>
				</fieldset>
				{showHint ? (
					<Card.Text className="green pt-2">{props.config.solutionHint}</Card.Text>
				) : (
					<></>
				)}
			</Card.Body>
			<Card.Footer>
				<Row className="text-center">
					<Col className="d-flex">
						<div className="infoBoxOuter">
							<div className="infoBoxText">
								{props.rated ? <>Ein&nbsp;Versuch</> : <>&infin;&nbsp;Versuche</>}
							</div>
						</div>
					</Col>
					<Col>{solveBtn}</Col>
					<Col>
						<div className="quizStatusBadgeBox ml-5" style={{ color: "green" }}>
							<Badge variant={getCorrectBadge(state)}>{state}</Badge>
						</div>
					</Col>
				</Row>
			</Card.Footer>
		</Card>
	);

	/**
	 * Updates selected options when a option is clicked
	 */
	function select(index: number) {
		const old = selected;
		old[index] = !old[index];
		setSelected(old);
	}

	/**
	 * Updates the state hook and saves the progress
	 */
	function setAndUpdateState(state: questionStateType) {
		setState(state);
		props.saveState(state, props.config.id);
	}

	function getCorrectBadge(state: questionStateType): "success" | "danger" | "info" {
		switch (state) {
			case "unsolved": {
				return "info";
			}
			case "correct": {
				return "success";
			}
			case "incorrect": {
				return "danger";
			}
		}
	}

	/**
	 * Checks if the selected options are correct
	 */
	function check(): void {
		if (state === "unsolved") {
			// Check if selected equals correct values
			for (let i = 0; i < selected.length; i++) {
				if (selected[i] !== props.config.options[i].correct) {
					// incorrect -> if not ratet give option to try again
					if (!props.rated) {
						setRetry(true);
						setState("incorrect");
						return;
					}
					setAndUpdateState("incorrect");
					return;
				}
			}
			setAndUpdateState("correct");
		}
	}
}
