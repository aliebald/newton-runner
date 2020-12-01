import React, { ReactElement } from "react";
import { Button, ButtonGroup, ButtonToolbar, Container, Row, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BadgeType, LevelOverviewBar, LevelOverviewCardConfig } from "./LevelOverviewElements";

const barConfig1: Array<LevelOverviewCardConfig> = [
	{
		title: "Newtons Laws",
		badge: BadgeType.THEORIE,
		text: "interessantes Zeug und so",
		buttonLink: "/ExampleQuest1",
		buttonName: "Quest 0.1"
	},
	{
		title: "Bewegung",
		badge: BadgeType.THEORIE,
		text: "mach mehr Sport.",
		buttonLink: "/ExampleQuest1",
		buttonName: "Quest 0.2"
	},
	{
		title: "Beschleunigung",
		badge: BadgeType.THEORIE,
		text: "mach mehr Sport.",
		buttonLink: "/ExampleQuest1",
		buttonName: "Quest 0.3"
	},
	{
		title: "Quiz Newton",
		badge: BadgeType.QUIZ,
		text: "Hefte weg, wir schreiben einen Test!",
		buttonLink: "/ExampleQuest1",
		buttonName: "Quest 0.4"
	}
];

const barConfig2: Array<LevelOverviewCardConfig> = [
	{
		title: "tv-Diagramm",
		badge: BadgeType.THEORIE,
		text: "interessantes Zeug und so",
		buttonLink: "/ExampleQuest1",
		buttonName: "Quest 1.1"
	},
	{
		title: "Bewegung",
		badge: BadgeType.SPIEL,
		text: "mach mehr Sport.",
		buttonLink: "/ExampleQuest1",
		buttonName: "Quest 1.2"
	},
	{
		title: "Beschleunigung",
		badge: BadgeType.SPIEL,
		text: "mach mehr Sport.",
		buttonLink: "/ExampleQuest1",
		buttonName: "Quest 1.3"
	},
	{
		title: "Quiz Newton",
		badge: BadgeType.QUIZ,
		text: "Hefte weg, wir schreiben einen Test!",
		buttonLink: "/ExampleQuest1",
		buttonName: "Quest 1.4"
	}
];

export default function LevelOverview(): ReactElement {
	return (
		<Container fluid>
			<LevelOverviewBar config={barConfig1}></LevelOverviewBar>
			<LevelOverviewBar config={barConfig2}></LevelOverviewBar>
		</Container>
	);
}
