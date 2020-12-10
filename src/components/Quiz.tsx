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
	return (
		<Container>
			<Row className="justify-content-center">
				<div className="quizPageTextBox">
					<h1>{props.config.title}</h1>
					<p className="text-left">{props.config.text}</p>
				</div>
			</Row>
			<Row>
				<div className="questionBox">
					{props.config.questions.map((e, idx) => Question({ config: e, idx: idx }))}
				</div>
			</Row>
		</Container>
	);
}
