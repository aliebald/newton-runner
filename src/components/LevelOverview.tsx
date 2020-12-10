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
		title: "tv-Diagramm",
		badge: BadgeType.THEORIE,
		text: "interessantes Zeug und so",
		buttonLink: "/Tutorial",
		buttonName: "Learn"
	},
	{
		title: "Quest 1 : Bewegung",
		badge: BadgeType.SPIEL,
		text: "hier steht text",
		buttonLink: "/level1Quest1",
		buttonName: "Play"
	},
	{
		title: "Quest 2 : Beschleunigung",
		badge: BadgeType.SPIEL,
		text: "hier steht text",
		buttonLink: "/level1Quest2",
		buttonName: "Play"
	}
];

export default function LevelOverview(): ReactElement {
	return (
		<Container fluid>
			<Tab.Container defaultActiveKey="tutorial">
				<Nav justify className="overviewTab" variant="pills">
					<Nav.Link eventKey="tutorial" className="justify-content-center">
						<Nav.Item className="col-8">Tutorial</Nav.Item>
					</Nav.Link>
					<Nav.Link eventKey="exampleLevel" className="justify-content-center">
						<Nav.Item className="col-8">Example Level</Nav.Item>
					</Nav.Link>
					<Nav.Link eventKey="level1" className="justify-content-center">
						<Nav.Item className="col-8">Level 1</Nav.Item>
					</Nav.Link>
					<Nav.Link eventKey="disabled" disabled className="justify-content-center">
						<Nav.Item className="col-8">Disabled</Nav.Item>
					</Nav.Link>
					<Nav.Link eventKey="disabled" disabled className="justify-content-center">
						<Nav.Item className="col-8">Disabled</Nav.Item>
					</Nav.Link>
				</Nav>
				<Tab.Content>
					<Tab.Pane eventKey="tutorial">
						<Card>
							<Card.Body className="justify-content-center">
								<h1>Tutorial</h1>
								<p>Hier gibt es spannenden stuff zu lernen</p>
								<LevelOverviewBar config={barConfigTutorial}></LevelOverviewBar>
							</Card.Body>
						</Card>
					</Tab.Pane>
					<Tab.Pane eventKey="exampleLevel">
						<Card>
							<Card.Body className="justify-content-center">
								<h1>Example Level</h1>
								<p>Ein paar Beispiele für Level</p>
								<LevelOverviewBar config={barConfigExample}></LevelOverviewBar>
							</Card.Body>
						</Card>
					</Tab.Pane>
					<Tab.Pane eventKey="level1">
						<Card>
							<Card.Body>
								<h1>tv-Diagramm</h1>
								<p>Nein, tv soll hier nicht television heißen.</p>
								<LevelOverviewBar config={barConfig1}></LevelOverviewBar>
							</Card.Body>
						</Card>
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</Container>
	);
}
