import React, { ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Question, QuestionConfig } from "./Question";
import "./../css/style.quiz.css";

export interface QuizConfig {
	title: string;
	/** Introduction text to the following questions. Can be a string or JSX.Element, but be careful (test and check console before committing)! */
	description: JSX.Element | string;
	questions: QuestionConfig[];
}

export function Quiz(props: { config: QuizConfig; nextPage: string }): ReactElement {
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
				<Row key={index}>
					<Col>
						<Question config={question} id={index} />
					</Col>
				</Row>
			))}
		</Container>
	);
}
