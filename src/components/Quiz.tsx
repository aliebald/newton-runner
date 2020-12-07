import React, { ReactElement } from "react";
import { QuestionConfig } from "./Questions";

export interface QuizConfig {
	title: string;
	text: string;
	questions: Array<QuestionConfig>;
	shuffleQuestions: boolean;
}

export function Quiz(props: { cfg: QuizConfig }): ReactElement {
	return <></>;
}
