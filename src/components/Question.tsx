import React, { ReactElement, useState } from "react";
import { Button, Card, Col, Form, FormCheck, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
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

	let attemptsTooltip = <>Du kannst bereits beantwortete Fragen nicht nochmal beantworten</>;
	let stateText;
	let attemptsText = <>Bereits&nbsp;beantwortet</>;
	switch (state) {
		case "unsolved": {
			stateText = "Noch nicht gelöst";
			attemptsText = props.rated ? <>Ein&nbsp;Versuch</> : <>&infin;&nbsp;Versuche</>;
			attemptsTooltip = props.rated ? (
				<>Du hast genau einen Versuch f&uuml;r diese Frage.</>
			) : (
				<>
					Ist deine Antwort falsch kannst du dich entscheiden, ob du die L&ouml;sung sehen
					oder es nochmal versuchen willst.
				</>
			);
			break;
		}
		case "correct": {
			stateText = "Korrekt";
			break;
		}
		case "incorrect": {
			stateText = "Inkorrekt";
			break;
		}
	}

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
				<div className="mb-4">{props.config.question}</div>
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
					<Col className="d-flex" xs={{ span: 6, order: 2 }} sm={{ span: 4, order: 1 }}>
						<OverlayTrigger
							placement="auto"
							delay={{ show: 0, hide: 150 }}
							overlay={
								<Tooltip id={`Question-${props.config.id}-AttemptsTooltip`}>
									{attemptsTooltip}
								</Tooltip>
							}
							/* setting transition to false will avoids a React.findDOMNode call, which is not strict mode compliant (but still works) */
							transition={true}
						>
							<div className="infoBoxOuter infoBoxOuterInteractive">
								<div className="infoBoxText">{attemptsText}</div>
							</div>
						</OverlayTrigger>
					</Col>
					<Col className="py-1" xs={{ span: 12, order: 1 }} sm={{ span: 4, order: 2 }}>
						{solveBtn}
					</Col>
					<Col
						className="d-flex justify-content-end"
						xs={{ span: 6, order: 3 }}
						sm={{ span: 4, order: 3 }}
					>
						<div className={"infoBoxOuter " + state}>
							<div className="infoBoxText">{stateText}</div>
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
		if (props.config.type === "singleChoice") {
			const replacement = props.config.options.map((_) => false);
			replacement[index] = true;
			setSelected(replacement);
		} else {
			selected[index] = !selected[index];
			setSelected(selected);
		}
	}

	/**
	 * Updates the state hook and saves the progress
	 */
	function setAndUpdateState(state: questionStateType) {
		setState(state);
		props.saveState(state, props.config.id);
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
