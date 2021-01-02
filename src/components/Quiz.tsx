import React, { ReactElement } from "react";
import { Button, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Question, QuestionConfig, questionStateType } from "./Question";
import "./../css/style.quiz.css";
import { saveSingleQuestion, loadQuizProgress, QuestionProgress, QuizProgress } from "../userdata";
import { Link } from "react-router-dom";
import { useState } from "react";

export interface QuizConfig {
	id: string;
	title: string;
	rated: boolean;
	/** Introduction text to the following questions. Can be a string or JSX.Element, but be careful (test and check console before committing)! */
	description: JSX.Element | string;
	questions: QuestionConfig[];
}

export function Quiz(props: {
	config: QuizConfig;
	nextPage: string;
	theoryLink?: string;
}): ReactElement {
	const progress = getQuizProgress(props.config.id, props.config.questions);
	const [allSolved, setallSolved] = useState(checkAllSolved());
	console.log(allSolved);

	const navButtons = (
		<div className="d-flex">
			{props.theoryLink ? (
				<Link to={props.theoryLink}>
					<Button variant="primary">Theorie&nbsp;wiederholen</Button>
				</Link>
			) : (
				<></>
			)}
			{allSolved ? (
				<Link to={props.nextPage} className="ml-auto">
					<Button variant="primary">Weiter</Button>
				</Link>
			) : (
				<OverlayTrigger
					placement="auto"
					delay={{ show: 0, hide: 150 }}
					/* setting transition to false will avoids a React.findDOMNode call, which is not strict mode compliant (but still works) */
					transition={true}
					overlay={
						<Tooltip id="tooltip-disabled">
							Beantworte erst alle Fragen bevor du weiter gehst
						</Tooltip>
					}
				>
					<span className="d-inline-block ml-auto">
						<Button variant="primary" disabled style={{ pointerEvents: "none" }}>
							Weiter
						</Button>
					</span>
				</OverlayTrigger>
			)}
		</div>
	);

	return (
		<Container fluid="lg">
			<Row>
				<Col>
					<div className="quizPageTextBox pt-3">
						<h2 className="px-3">{props.config.title}</h2>
						<p className="px-3">{props.config.description}</p>
						<div className="px-3 card-footer">{navButtons}</div>
					</div>
				</Col>
			</Row>
			{props.config.questions.map((question, index) => (
				<Row key={question.id}>
					<Col>
						<Question
							config={question}
							state={getQuestionProgress(question.id)}
							saveState={updateQuestionProgress}
							rated={props.config.rated}
						/>
					</Col>
				</Row>
			))}
			<Row className="pt-2 pb-5">
				<Col>
					<div className="boxWrapper px-4">{navButtons}</div>
				</Col>
			</Row>
		</Container>
	);

	/**
	 * Searches for the question with `questionId` in `progress` and returns the state
	 * of the question if found, otherwise `Unsolved` is returned
	 */
	function getQuestionProgress(questionId: string): questionStateType {
		if (progress) {
			for (let i = 0; i < progress.questions.length; i++) {
				if (progress.questions[i].id === questionId) {
					return progress.questions[i].state;
				}
			}
		}
		return "unsolved";
	}

	// Loads either the QuizProgress or creates a new one if none was saved
	function getQuizProgress(id: string, questions: QuestionConfig[]): QuizProgress {
		const progress = loadQuizProgress(id);
		if (progress) {
			return progress;
		}

		// Create new QuizProgress
		const questionProgress: QuestionProgress[] = [];
		for (let i = 0; i < questions.length; i++) {
			questionProgress.push({
				id: questions[i].id,
				state: "unsolved"
			});
		}

		return {
			id: id,
			rated: true, // TODO
			questions: questionProgress
		};
	}

	/**
	 * Checks if all questions are solved (correct or incorrect)
	 */
	function checkAllSolved() {
		let allSolved = true;
		progress.questions.forEach((question) => {
			allSolved = allSolved && question.state !== "unsolved";
		});
		return allSolved;
	}

	function updateQuestionProgress(state: questionStateType, questionId: string): void {
		const question: QuestionProgress = {
			id: questionId,
			state: state
		};

		for (let i = 0; i < progress.questions.length; i++) {
			if (progress.questions[i].id === questionId) {
				progress.questions[i] = question;
			}
		}

		saveSingleQuestion(progress, question);
		setallSolved(checkAllSolved());
	}
}
