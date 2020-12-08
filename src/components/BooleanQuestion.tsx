import React, { ReactElement } from "react";
import { Button, Card, Form, FormCheck } from "react-bootstrap";
import { getOptionalImageElement } from "../questionLogic/questionUtility";

export interface StatementConfig {
	kind: "Statement";
	text: string;
	isTrue: boolean;
	imgPath?: string;
}

export function BooleanQuestion(props: { config: StatementConfig; idx: number }): ReactElement {
	return (
		<Card style={{ width: "40rem" }} key={props.idx.toString()}>
			{getOptionalImageElement(props.config.imgPath)}
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
