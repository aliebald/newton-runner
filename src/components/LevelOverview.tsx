import React, { ReactElement } from "react";
import { Container, Jumbotron } from "react-bootstrap";
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
			<Jumbotron fluid>
				<h1>Tutorial</h1>
				<p>Hier gibt es spannenden stuff zu lernen</p>
				<LevelOverviewBar config={barConfig1}></LevelOverviewBar>
			</Jumbotron>
			<Jumbotron fluid>
				<h1>tv-Diagramm</h1>
				<p>Nein, tv soll hier nicht television heißen.</p>
				<LevelOverviewBar config={barConfig2}></LevelOverviewBar>
			</Jumbotron>
		</Container>
	);
}
