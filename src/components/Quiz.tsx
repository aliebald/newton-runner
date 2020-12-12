import React, { ReactElement } from "react";
import { Col, Container } from "react-bootstrap";
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
			<Col>
				<div className="quizPageTextBox">
					<h1>{props.config.title}</h1>
					<p className="text-left">{props.config.text}</p>
				</div>
				{props.config.questions.map((e, idx) => Question({ config: e, idx: idx }))}
			</Col>
		</Container>
	);
}
