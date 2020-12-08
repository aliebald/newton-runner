import React, { ReactElement } from "react";
import { Button, Card, Form, FormCheck, Image } from "react-bootstrap";

export interface StatementConfig {
	kind: "Statement";
	text: string;
	isTrue: boolean;
	imgPath?: string;
}

export function BooleanQuestion(props: { config: StatementConfig; idx: number }): ReactElement {
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
