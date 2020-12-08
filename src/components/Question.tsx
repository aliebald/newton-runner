import React, { ReactElement } from "react";
import { StatementConfig, BooleanQuestion } from "./BooleanQuestion";
import { MultipleChoiceConfig, MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { SingleChoiceQuestion, SingleChoiceConfig } from "./SingleChoiceQuestion";

export type QuestionStatus = "Unsolved" | "Correct" | "Wrong";

export type QuestionConfig = SingleChoiceConfig | MultipleChoiceConfig | StatementConfig;

export function Question(props: { config: QuestionConfig; idx: number }): ReactElement {
	function getQuestionCode(): ReactElement {
		switch (props.config.kind) {
			case "SingleChoice":
				return SingleChoiceQuestion({
					config: props.config as SingleChoiceConfig,
					idx: props.idx
				});
			case "MultipleChoice":
				return MultipleChoiceQuestion({
					config: props.config as MultipleChoiceConfig,
					idx: props.idx
				});
			case "Statement":
				return BooleanQuestion({ config: props.config as StatementConfig, idx: props.idx });
			default:
				return <></>;
		}
	}

	return <>{getQuestionCode()}</>;
}
