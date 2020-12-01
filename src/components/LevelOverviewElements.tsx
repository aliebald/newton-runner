import React, { ReactElement } from "react";
import { Button, Container, Row, Card, Badge, CardGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export function LevelOverviewBar(props: { config: LevelOverviewCardConfig[] }): ReactElement {
	return (
		<Row className="justify-content-center row-card-overview">
			<CardGroup> {props.config.map((e) => LevelOverviewCard({ config: e }))}</CardGroup>
		</Row>
	);
}

export interface LevelOverviewCardConfig {
	title: string;
	badge: BadgeType;
	text: string;
	buttonLink: string;
	buttonName: string;
}

export enum BadgeType {
	THEORIE,
	SPIEL,
	QUIZ,
	ERKLÄRUNG
}

function getCode(type: BadgeType): ReactElement {
	if (type === BadgeType.THEORIE) {
		return <Badge className="badge-theory">&#128161; Theorie</Badge>;
	} else if (type == BadgeType.SPIEL) {
		return <Badge className="badge-game">&#x1F3AE; Spiel</Badge>;
	} else if (type == BadgeType.QUIZ) {
		return <Badge className="badge-quiz">&#x1F914; Quiz</Badge>;
	} else return <></>;
}

export function LevelOverviewCard(props: { config: LevelOverviewCardConfig }): ReactElement {
	return (
		<Card>
			<Card.Body>
				<Card.Title>{props.config.title}</Card.Title>
				<Card.Subtitle>{getCode(props.config.badge)}</Card.Subtitle>
				<Card.Text>{props.config.text}</Card.Text>
			</Card.Body>
			<Card.Footer>
				<Link to={props.config.buttonLink}>
					<Button>{props.config.buttonName}</Button>
				</Link>
			</Card.Footer>
		</Card>
	);
}
