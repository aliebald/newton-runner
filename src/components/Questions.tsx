import React, { ReactElement } from "react";

export type QuestionConfig =
	| SingleChoiceConfig
	| MultipleChoiceConfig
	| TextInputConfig
	| StatementConfig;

export interface TextInputConfig {
	kind: "TextDropDown";
	text: string;
	correctInputValues: Array<string>;
}

export interface SingleChoiceConfig {
	kind: "SingleChoice";
	text: string;
	statements: Array<StatementConfig>;
	shuffleStatements: boolean;
}

export interface MultipleChoiceConfig {
	kind: "MultipleChoice";
	text: string;
	statements: Array<StatementConfig>;
	shuffleStatements: boolean;
}

export interface StatementConfig {
	kind: "Statement";
	text: string;
	isTrue: boolean;
}

export function TextDropDown(props: { cfg: TextInputConfig }): ReactElement {
	return <></>;
}

export function SingleChoice(props: { cfg: SingleChoiceConfig }): ReactElement {
	return <></>;
}

export function MultipleChoice(props: { cfg: MultipleChoiceConfig }): ReactElement {
	return <></>;
}

export function TrueFalse(props: { cfg: StatementConfig }): ReactElement {
	return <></>;
}
