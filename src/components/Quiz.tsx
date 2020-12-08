import React, { ReactElement } from "react";
import { CardGroup, Col, Container, Row } from "react-bootstrap";
import { Question, QuestionConfig } from "./Question";

export interface QuizConfig {
	title: string;
	text: string;
	questions: Array<QuestionConfig>;
	shuffleQuestions?: boolean;
}

export function Quiz(props: { config: QuizConfig }): ReactElement {
	function center(element: ReactElement, idx: number): ReactElement {
		return (
			<Row className="d-flex justify-content-center quizBox" key={idx.toString()}>
				{element}
			</Row>
		);
	}
	return (
		<Container>
			<Row className="justify-content-center">
				<h1>{props.config.title}</h1>
			</Row>
			<Row className="justify-content-center">
				<p className="text-left">{props.config.text}</p>
			</Row>
			<Row>
				<Col>
					{props.config.questions
						.map((e, idx) => Question({ config: e, idx: idx }))
						.map((e, idx) => center(e, idx))}
				</Col>
			</Row>
		</Container>
	);
}
