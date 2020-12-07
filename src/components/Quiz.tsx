import React, { ReactElement } from "react";
import { CardGroup, Col, Container } from "react-bootstrap";
import { Question, QuestionConfig } from "./Questions";

export interface QuizConfig {
	title: string;
	text: string;
	questions: Array<QuestionConfig>;
	shuffleQuestions?: boolean;
}

export function Quiz(props: { config: QuizConfig }): ReactElement {
	function center(element: ReactElement): ReactElement {
		return <div className="d-flex justify-content-center quizBox">{element}</div>;
	}
	return (
		<Container>
			<h1>{props.config.title}</h1> <p>{props.config.text}</p>
			{props.config.questions.map((e) => Question({ config: e })).map((e) => center(e))}
		</Container>
	);
}
