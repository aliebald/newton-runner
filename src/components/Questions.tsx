import React, { ReactElement } from "react";
import { Button, Card, Form, FormCheck, Image } from "react-bootstrap";

export type QuestionConfig =
	| SingleChoiceConfig
	| MultipleChoiceConfig
	| TextInputConfig
	| StatementConfig;

export interface TextInputConfig {
	kind: "TextInput";
	text: string;
	correctInputValues: Array<string>;
	imgPath?: string;
}

export interface SingleChoiceConfig {
	kind: "SingleChoice";
	text: string;
	statements: Array<StatementConfig>;
	shuffleStatements?: boolean;
	imgPath?: string;
}

export interface MultipleChoiceConfig {
	kind: "MultipleChoice";
	text: string;
	statements: Array<StatementConfig>;
	shuffleStatements?: boolean;
	imgPath?: string;
}

export interface StatementConfig {
	kind: "Statement";
	text: string;
	isTrue: boolean;
	imgPath?: string;
}

export function TextInput(props: { config: TextInputConfig; idx: number }): ReactElement {
	return <></>;
}

export function SingleChoice(props: { config: SingleChoiceConfig; idx: number }): ReactElement {
	function getRadioButtons(): ReactElement {
		return (
			<Form>
				<div key="default-radio" className="mb-3">
					<fieldset>
						{props.config.statements.map((e, idx) => mapStatementToButton(e, idx))}
					</fieldset>
				</div>
			</Form>
		);
	}

	function getOptionalImage(): ReactElement {
		if (props.config.imgPath === undefined) {
			return <></>;
		} else {
			return (
				<Card.Header>
					<Image src={props.config.imgPath} fluid rounded />
				</Card.Header>
			);
		}
	}

	function mapStatementToButton(elementConfig: StatementConfig, idx: number): ReactElement {
		return (
			<FormCheck
				type="radio"
				id={idx.toString()}
				label={elementConfig.text}
				name="scRadioButton"
			/>
		);
	}

	return (
		<Card style={{ width: "40rem" }} key={props.idx.toString()}>
			{getOptionalImage()}
			<Card.Body>
				<Card.Text className="text-left">{props.config.text}</Card.Text>
				<br />
				<Card.Subtitle className="mb-2 text-muted">
					Es ist genau eine Antwort richtig.
				</Card.Subtitle>
				<fieldset>{getRadioButtons()}</fieldset>
			</Card.Body>
			<Card.Footer>
				<Button variant="success">Lösen</Button>
			</Card.Footer>
		</Card>
	);
}

export function MultipleChoice(props: { config: MultipleChoiceConfig; idx: number }): ReactElement {
	function getCheckboxes(): ReactElement {
		return (
			<Form>
				<div key="default-radio" className="mb-3">
					{props.config.statements.map((e, idx) => mapStatementToButton(e, idx))}
				</div>
			</Form>
		);
	}

	function getOptionalImage(): ReactElement {
		if (props.config.imgPath === undefined) {
			return <></>;
		} else {
			return (
				<Card.Header>
					<Image src={props.config.imgPath} fluid rounded />
				</Card.Header>
			);
		}
	}

	function mapStatementToButton(elementConfig: StatementConfig, idx: number): ReactElement {
		return (
			<FormCheck
				type="checkbox"
				id={idx.toString()}
				label={elementConfig.text}
				name="mcCheckbox"
			/>
		);
	}

	return (
		<Card style={{ width: "40rem" }} key={props.idx.toString()}>
			{getOptionalImage()}
			<Card.Body>
				<Card.Text className="text-left">{props.config.text}</Card.Text>
				<br />
				<Card.Subtitle className="mb-2 text-muted">
					Es können beliebig viele Antworten richtig sein.
				</Card.Subtitle>
				<fieldset>{getCheckboxes()}</fieldset>
			</Card.Body>
			<Card.Footer>
				<Button variant="success">Lösen</Button>
			</Card.Footer>
		</Card>
	);
}

export function TrueFalse(props: { config: StatementConfig; idx: number }): ReactElement {
	function getOptionalImage(): ReactElement {
		if (props.config.imgPath === undefined) {
			return <></>;
		} else {
			return (
				<Card.Header>
					<Image src={props.config.imgPath} fluid rounded />
				</Card.Header>
			);
		}
	}

	return (
		<Card style={{ width: "40rem" }} key={props.idx.toString()}>
			{getOptionalImage()}
			<Card.Body>
				<Card.Text className="text-left">{props.config.text}</Card.Text>
				<Form>
					<div key="default-radio" className="mb-3">
						<fieldset>
							<FormCheck type="radio" id="true" label="Wahr" name="trueFalseRadios" />
							<FormCheck
								type="radio"
								id="false"
								label="Falsch"
								name="trueFalseRadios"
							/>
						</fieldset>
					</div>
				</Form>
			</Card.Body>
			<Card.Footer>
				<Button variant="success">Lösen</Button>
			</Card.Footer>
		</Card>
	);
}

export function Question(props: { config: QuestionConfig; idx: number }): ReactElement {
	function getQuestionCode(): ReactElement {
		switch (props.config.kind) {
			case "TextInput":
				return TextInput({ config: props.config as TextInputConfig, idx: props.idx });
			case "SingleChoice":
				return SingleChoice({ config: props.config as SingleChoiceConfig, idx: props.idx });
			case "MultipleChoice":
				return MultipleChoice({
					config: props.config as MultipleChoiceConfig,
					idx: props.idx
				});
			case "Statement":
				return TrueFalse({ config: props.config as StatementConfig, idx: props.idx });
			default:
				return <></>;
		}
	}

	return <>{getQuestionCode()}</>;
}
