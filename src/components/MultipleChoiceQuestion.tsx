import React, { ReactElement } from "react";
import { Button, Card, Form, FormCheck, Image } from "react-bootstrap";
import { StatementConfig } from "./BooleanQuestion";

export interface MultipleChoiceConfig {
	kind: "MultipleChoice";
	text: string;
	statements: Array<StatementConfig>;
	imgPath?: string;
}

export function MultipleChoiceQuestion(props: {
	config: MultipleChoiceConfig;
	idx: number;
}): ReactElement {
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
