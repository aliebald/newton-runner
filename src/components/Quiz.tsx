import React, { ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Question, QuestionConfig, questionStateType } from "./Question";
import "./../css/style.quiz.css";
import { saveSingleQuestion, loadQuizProgress, QuestionProgress, QuizProgress } from "../userdata";

export interface QuizConfig {
	id: string;
	title: string;
	rated: boolean;
	/** Introduction text to the following questions. Can be a string or JSX.Element, but be careful (test and check console before committing)! */
	description: JSX.Element | string;
	questions: QuestionConfig[];
}

export function Quiz(props: { config: QuizConfig; nextPage: string }): ReactElement {
	const progress = getQuizProgress(props.config.id, props.config.questions);

	return (
		<Container fluid="lg">
			<Row>
				<Col>
					<div className="quizPageTextBox">
						<h1>{props.config.title}</h1>
						<p>{props.config.description}</p>
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
	}
}
