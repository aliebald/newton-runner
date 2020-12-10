import React, { ReactElement } from "react";
import {
	MultipleChoiceConfig,
	MultipleChoiceQuestion,
	StatementConfig
} from "./MultipleChoiceQuestion";

export type QuestionStatus = "Unsolved" | "Correct" | "Wrong";

export type QuestionConfig = MultipleChoiceConfig | StatementConfig;

export function Question(props: { config: QuestionConfig; idx: number }): ReactElement {
	function getQuestionCode(): ReactElement {
		switch (props.config.kind) {
			case "SingleChoice":
				return MultipleChoiceQuestion({
					config: props.config as MultipleChoiceConfig,
					idx: props.idx
				});
			case "MultipleChoice":
				return MultipleChoiceQuestion({
					config: props.config as MultipleChoiceConfig,
					idx: props.idx
				});
			case "Statement":
				return MultipleChoiceQuestion({
					config: props.config as StatementConfig,
					idx: props.idx
				});
		}
	}

	return <>{getQuestionCode()}</>;
}
