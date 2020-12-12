import React from "react";
import { ReactElement } from "react";
import { Badge, Button, Card, Form, FormCheck, Image } from "react-bootstrap";
import { MultipleChoiceConfig, StatementConfig } from "../components/MultipleChoiceQuestion";

export function equal(array1: Array<boolean>, array2: Array<boolean>): boolean {
	if (array1.length == array2.length) {
		for (let i = 0; i < array1.length; i++) {
			if (array1[i] != array2[i]) {
				return false;
			}
		}
		return true;
	} else return false;
}
export class QuestionStatus {
	static Correct = (
		<div className="quizStatusBadgeBox">
			<Badge variant="success">Korrekt</Badge>
		</div>
	);
	static Wrong = (
		<div className="quizStatusBadgeBox">
			<Badge variant="danger">Falsch</Badge>
		</div>
	);
	static Unsolved = (
		<div className="quizStatusBadgeBox">
			<Badge variant="info">Ungelöst</Badge>
		</div>
	);
}

export function getOptionalImageHeader(path: string | undefined): ReactElement {
	if (path === undefined) {
		return <></>;
	} else {
		return (
			<Card.Header>
				<Image src={path} fluid rounded />
			</Card.Header>
		);
	}
}

export function getCorrectAnswerVector(
	config: MultipleChoiceConfig | StatementConfig
): Array<boolean> {
	switch (config.kind) {
		case "MultipleChoice":
			return config.statements.map((s) => s.isTrue);
		case "SingleChoice":
			return config.statements.map((s) => s.isTrue);
		case "Statement":
			return [config.isTrue, !config.isTrue];
	}
}

export function getEmptyAnswerVector(
	config: MultipleChoiceConfig | StatementConfig
): Array<boolean> {
	switch (config.kind) {
		case "MultipleChoice":
			return config.statements.map((_) => false);
		case "SingleChoice":
			return config.statements.map((_) => false);
		case "Statement":
			return [false, false];
	}
}

export function getAnswerBoxes(
	config: MultipleChoiceConfig | StatementConfig,
	questionIdx: number,
	onSelect: (buttonNumber: number) => void
): ReactElement {
	switch (config.kind) {
		case "MultipleChoice":
			return getCheckboxes(config, questionIdx, onSelect);
		case "SingleChoice":
			return getRadioButtons(config, questionIdx, onSelect);
		case "Statement":
			return getBooleanRadioButtons(questionIdx, onSelect);
	}
}

function getCheckboxes(
	config: MultipleChoiceConfig,
	questionIdx: number,
	onSelect: (buttonNumber: number) => void
): ReactElement {
	return (
		<>
			<Card.Subtitle className="mb-2 text-muted">
				Es können beliebig viele Antworten richtig sein.
			</Card.Subtitle>
			<Form>
				<div key="default-radio" className="mb-3">
					{config.statements.map((e, idx) =>
						mapStatementToCheckbox(e, questionIdx, idx, onSelect)
					)}
				</div>
			</Form>
		</>
	);
}

function mapStatementToCheckbox(
	elementConfig: StatementConfig,
	questionIdx: number,
	answerIdx: number,
	onSelect: (buttonNumber: number) => void
): ReactElement {
	return (
		<FormCheck
			type="checkbox"
			id={questionIdx.toString() + "-mc-" + answerIdx.toString()}
			label={elementConfig.text}
			name="mcCheckbox"
			onChange={() => onSelect(answerIdx)}
		/>
	);
}

function getRadioButtons(
	config: MultipleChoiceConfig,
	questionIdx: number,
	onSelect: (buttonNumber: number) => void
): ReactElement {
	return (
		<>
			<Card.Subtitle className="mb-2 text-muted">
				Es ist genau eine Antwort richtig.
			</Card.Subtitle>
			<Form>
				<div key="default-radio" className="mb-3">
					<fieldset>
						{config.statements.map((e, idx) =>
							mapStatementToButton(e, questionIdx, idx, onSelect)
						)}
					</fieldset>
				</div>
			</Form>
		</>
	);
}

function mapStatementToButton(
	elementConfig: StatementConfig,
	questionIdx: number,
	answerIdx: number,
	onSelect: (buttonNumber: number) => void
): ReactElement {
	return (
		<FormCheck
			type="radio"
			id={questionIdx.toString() + "-sc-" + answerIdx.toString()}
			label={elementConfig.text}
			name="scRadioButton"
			onChange={() => onSelect(answerIdx)}
		/>
	);
}

function getBooleanRadioButtons(
	questionIdx: number,
	onSelect: (buttonNumber: number) => void
): ReactElement {
	return (
		<Form>
			<div key="default-radio" className="mb-3">
				<fieldset>
					<FormCheck
						type="radio"
						id={questionIdx.toString() + "-bool-true"}
						label="Wahr"
						name="trueFalseRadios"
						onChange={() => onSelect(0)}
					/>
					<FormCheck
						type="radio"
						id={questionIdx.toString() + "-bool-false"}
						label="Falsch"
						name="trueFalseRadios"
						onChange={() => onSelect(1)}
					/>
				</fieldset>
			</div>
		</Form>
	);
}

export function getSolveButton(onClickFkt: () => void, isEnabled = true): ReactElement {
	return (
		<Button variant="success" disabled={!isEnabled} onClick={onClickFkt}>
			Lösen
		</Button>
	);
}
