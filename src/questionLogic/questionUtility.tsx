import React from "react";
import { ReactElement } from "react";
import { Badge, Card, Image } from "react-bootstrap";
import { QuestionStatus } from "../components/Question";

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

export function getQuestionStatusElement(status: QuestionStatus): ReactElement {
	switch (status) {
		case "Correct":
			return (
				<h4>
					<Badge variant="success">Korrekt</Badge>
				</h4>
			);
		case "Wrong":
			return (
				<h4>
					<Badge variant="danger">Falsch</Badge>
				</h4>
			);
		default:
			return (
				<h4>
					<Badge variant="info">Ungelöst</Badge>
				</h4>
			);
	}
}

export function getOptionalImageElement(path: string | undefined): ReactElement {
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
