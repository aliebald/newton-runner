import React, { ReactElement } from "react";
import { Button, Card, Badge, CardDeck } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isCompleted } from "../userdata";

export function LevelOverviewBar(props: { config: LevelOverviewCardConfig[] }): ReactElement {
	return (
		<CardDeck className="justify-content-center">
			{props.config.map((e, idx) => LevelOverviewCard({ config: e, idx: idx }))}
		</CardDeck>
	);
}

export interface LevelOverviewCardConfig {
	/** id of the Quest / Quiz / Theory this points to. The button will also point to `"/" + id` */
	id: string;
	title: string;
	badge: BadgeType;
	text: string;
	buttonName: string;
}

export enum BadgeType {
	THEORIE,
	SPIEL,
	QUIZ,
	ERKLÄRUNG,
	STORY
}

function getCode(type: BadgeType): ReactElement {
	if (type === BadgeType.THEORIE) {
		return <Badge className="badgeTheory">&#128161; Theorie</Badge>;
	} else if (type === BadgeType.SPIEL) {
		return <Badge className="badgeGame">&#x1F3AE; Spiel</Badge>;
	} else if (type === BadgeType.QUIZ) {
		return <Badge className="badgeQuiz">&#x1F914; Quiz</Badge>;
	} else if (type === BadgeType.STORY) {
		return <Badge className="badgeStory">&#x1F4DC; Story</Badge>;
	} else if (type === BadgeType.ERKLÄRUNG) {
		return <Badge className="badgeExplanation">&#129327; Erklärung</Badge>;
	}
	return <></>;
}

export function LevelOverviewCard(props: {
	config: LevelOverviewCardConfig;
	idx: number;
}): ReactElement {
	const completed = isCompleted(props.config.id);
	const border = completed ? " completed" : "";

	return (
		<Card className={"overviewCard" + border} key={props.idx.toString()}>
			<Card.Body>
				<Card.Title>{props.config.title}</Card.Title>
				<Card.Subtitle>{getCode(props.config.badge)}</Card.Subtitle>
				<br />
				<Card.Text>{props.config.text}</Card.Text>
			</Card.Body>
			<Card.Footer className={border}>
				<Link to={"/" + props.config.id}>
					<Button>
						{completed ? "Nochmal " + props.config.buttonName : props.config.buttonName}
					</Button>
				</Link>
			</Card.Footer>
		</Card>
	);
}
