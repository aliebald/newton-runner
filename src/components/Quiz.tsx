import React, { ReactElement } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Question, QuestionConfig } from "./Question";
import { useHistory } from "react-router";

export interface QuizConfig {
	title: string;
	text: string;
	questions: Array<QuestionConfig>;
	shuffleQuestions?: boolean;
}

export function Quiz(props: { config: QuizConfig; nextPage: string }): ReactElement {
	const { push } = useHistory();
	return (
		<Container>
			<Col className="justify-content-center align-items-center">
				<div className="quizPageTextBox">
					<h1 className="text-center">{props.config.title}</h1>
					<p>{props.config.text}</p>
				</div>
				{props.config.questions.map((e, idx) => Question({ config: e, idx: idx }))}
				<Row className="justify-content-end">
					<Button className="nextPageButtonRowQuiz" onClick={() => push(props.nextPage)}>
						N&auml;chste Aufgabe
					</Button>
				</Row>
			</Col>
		</Container>
	);
}
