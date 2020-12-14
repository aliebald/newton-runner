import React, { ReactElement } from "react";
import { Container, Card, Nav, Tab } from "react-bootstrap";
import { BadgeType, LevelOverviewBar, LevelOverviewCardConfig } from "./LevelOverviewElements";

const barConfigTutorial: Array<LevelOverviewCardConfig> = [
	{
		title: "Tutorial",
		badge: BadgeType.THEORIE,
		text: "hier lernst du worum es geht",
		buttonLink: "/Tutorial",
		buttonName: "Learn"
	}
];

const barConfigExample: Array<LevelOverviewCardConfig> = [
	{
		title: "Example Theory 1",
		badge: BadgeType.THEORIE,
		text: "hier kommt Input",
		buttonLink: "/ExampleTheory1",
		buttonName: "Read"
	},
	{
		title: "Example 1",
		badge: BadgeType.SPIEL,
		text: "mach mehr Sport.",
		buttonLink: "/ExampleQuest1",
		buttonName: "Play"
	},
	{
		title: "Example 2",
		badge: BadgeType.SPIEL,
		text: "mach mehr Sport.",
		buttonLink: "/ExampleQuest2",
		buttonName: "Play"
	},
	{
		title: "Example Quiz 1",
		badge: BadgeType.QUIZ,
		text: "strng dein Hirn an",
		buttonLink: "/ExampleQuiz1",
		buttonName: "Solve"
	}
];

const barConfig1: Array<LevelOverviewCardConfig> = [
	{
		title: "Grundlagen",
		badge: BadgeType.THEORIE,
		text: "Bewegung, das 1. Newtonsche Gesetz und Zeit-Geschwindigkeits-Diagramme",
		buttonLink: "/level1Theory1",
		buttonName: "Learn"
	},
	{
		title: "Quiz 1",
		badge: BadgeType.QUIZ,
		text: "Überprüfe ob du die Theorie verstanden hast",
		buttonLink: "/level1Quiz1",
		buttonName: "Solve"
	},
	{
		title: "Quest 1 : Zeit-Geschwindigkeits-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Lerne die Steuerung anhand einer einfachen Quest",
		buttonLink: "/level1Quest1",
		buttonName: "Play"
	},
	{
		title: "Quest 2 : Zeit-Geschwindigkeits-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Eine etwas schwierige Quest",
		buttonLink: "/level1Quest2",
		buttonName: "Play"
	}
];

const barConfig2: Array<LevelOverviewCardConfig> = [
	{
		title: "Vorschau",
		badge: BadgeType.SPIEL,
		text:
			"In Level 2 wird der Spieler sich auf eine Stattereise begeben. Schau dir das Setting jetzt schon an!",
		buttonLink: "/Level2Quest1",
		buttonName: "Play"
	}
];

export default function LevelOverview(): ReactElement {
	return (
		<Container fluid>
			<Tab.Container defaultActiveKey="tutorial">
				<Nav justify className="overviewTab" variant="tabs">
					<Nav.Link eventKey="tutorial" className="overviewNavLink">
						Tutorial
					</Nav.Link>
					<Nav.Link eventKey="exampleLevel" className="overviewNavLink">
						Example Level
					</Nav.Link>
					<Nav.Link eventKey="level1" className="overviewNavLink">
						Level 1
					</Nav.Link>
					<Nav.Link eventKey="level2" className="overviewNavLink">
						Level 2
					</Nav.Link>
					<Nav.Link eventKey="disabled" className="overviewNavLink" disabled>
						Disabled
					</Nav.Link>
				</Nav>
				<Tab.Content>
					<Tab.Pane eventKey="tutorial">
						<Card className="overviewTabCard">
							<Card.Body className="justify-content-center">
								<h1 className="text-center">Tutorial</h1>
								<p className="text-center">
									Hier gibt es spannenden stuff zu lernen
								</p>
								<LevelOverviewBar config={barConfigTutorial}></LevelOverviewBar>
							</Card.Body>
						</Card>
					</Tab.Pane>
					<Tab.Pane eventKey="exampleLevel">
						<Card className="overviewTabCard">
							<Card.Body className="justify-content-center">
								<h1 className="text-center">Example Level</h1>
								<p className="text-center">Ein paar Beispiele für Level</p>
								<LevelOverviewBar config={barConfigExample}></LevelOverviewBar>
							</Card.Body>
						</Card>
					</Tab.Pane>
					<Tab.Pane eventKey="level1">
						<Card className="overviewTabCard">
							<Card.Body>
								<h1 className="text-center">tv-Diagramm</h1>
								<p className="text-center">
									Nein, tv soll hier nicht television heißen.
								</p>
								<LevelOverviewBar config={barConfig1}></LevelOverviewBar>
							</Card.Body>
						</Card>
					</Tab.Pane>
					<Tab.Pane eventKey="level2">
						<Card className="overviewTabCard">
							<Card.Body>
								<h1 className="text-center">Stattereise</h1>
								<p className="text-center">
									In Level 2 wird der Spieler sich auf eine Stattereise begeben.
									Schau dir das Setting jetzt schon an!
								</p>
								<LevelOverviewBar config={barConfig2}></LevelOverviewBar>
							</Card.Body>
						</Card>
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</Container>
	);
}
