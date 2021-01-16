import React, { ReactElement } from "react";
import { Container, Card, Nav, Tab } from "react-bootstrap";
import { BadgeType, LevelOverviewBar, LevelOverviewCardConfig } from "./LevelOverviewElements";

const barConfigTutorial: Array<LevelOverviewCardConfig> = [
	{
		title: "Tutorial",
		badge: BadgeType.THEORIE,
		text: "Grundlegende Theorie",
		buttonLink: "/level1Theory1",
		buttonName: "Learn"
	}
];

const barConfigExample: Array<LevelOverviewCardConfig> = [
	{
		title: "Example Story",
		badge: BadgeType.STORY,
		text: "So wird die Story vermittelt",
		buttonLink: "/exampleStory1",
		buttonName: "Lesen"
	},
	{
		title: "Example 1",
		badge: BadgeType.SPIEL,
		text: "Eine Demo, wie das Spiel funktioniert.",
		buttonLink: "/ExampleQuest1",
		buttonName: "Play"
	},
	{
		title: "Example 2",
		badge: BadgeType.SPIEL,
		text: "Eine weitere Demo, wie das Spiel funktioniert.",
		buttonLink: "/ExampleQuest2",
		buttonName: "Play"
	}
];

const barConfig1: Array<LevelOverviewCardConfig> = [
	{
		title: "Die Geschichte beginnt ...",
		badge: BadgeType.STORY,
		text: "Ein Geheimnis wartet darauf entdeckt zu werden.",
		buttonLink: "/level1Story1",
		buttonName: "Lesen"
	},
	{
		title: "Gleichförmige Bewegung",
		badge: BadgeType.THEORIE,
		text: "Bewegung, das 1. Newtonsche Gesetz und Zeit-Geschwindigkeits-Diagramme",
		buttonLink: "/level1Theory1",
		buttonName: "Learn"
	},
	{
		title: "Erklärung Quiz",
		badge: BadgeType.ERKLÄRUNG,
		text: "Hier erklären wir dir alle Teile des Quiz",
		buttonLink: "/level1Quiz1Explanation1",
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
		title: "Erklärung der Spielsteuerung",
		badge: BadgeType.ERKLÄRUNG,
		text: "Wie du den Platformer mithilfe eines t-x Diagramms steuerst",
		buttonLink: "/level1GameMechanics1",
		buttonName: "Learn"
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
		text: "Eine etwas schwierigere Quest",
		buttonLink: "/level1Quest2",
		buttonName: "Play"
	},
	{
		title: "Quiz 2",
		badge: BadgeType.QUIZ,
		text: "Eine kleine Auffrischung der Theorie ist sicher hilfreich",
		buttonLink: "/level1Quiz2",
		buttonName: "Solve"
	},
	{
		title: "Quest 3 : Zeit-Geschwindigkeits-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Schaffst du diese Quest?",
		buttonLink: "/level1Quest3",
		buttonName: "Play"
	},
	{
		title: "Das Abenteuer geht weiter.",
		badge: BadgeType.STORY,
		text: "Was hast du bisher erreicht?",
		buttonLink: "/level1Story2",
		buttonName: "Lesen"
	}
];

const barConfig2: Array<LevelOverviewCardConfig> = [
	{
		title: "Neuer Ort, neues Glück.",
		badge: BadgeType.STORY,
		text: "Setze dein Abenteuer fort.",
		buttonLink: "/level2Story1",
		buttonName: "Lesen"
	},
	{
		title: "Beschleunigte Bewegung",
		badge: BadgeType.THEORIE,
		text: "Bewegung, das 1. Newtonsche Gesetz und Zeit-Geschwindigkeits-Diagramme",
		buttonLink: "/level2Theory1",
		buttonName: "Learn"
	},
	{
		title: "Quiz 1",
		badge: BadgeType.QUIZ,
		text: "Überprüfe ob du die Theorie verstanden hast",
		buttonLink: "/level2Quiz1",
		buttonName: "Solve"
	},
	{
		title: "Quest 1: Zeit-Geschwindigkeits-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Lerne die Steuerung anhand einer einfachen Quest",
		buttonLink: "/level2Quest1",
		buttonName: "Play"
	},
	{
		title: "Quest 2: TODO",
		badge: BadgeType.SPIEL,
		text: "TODO",
		buttonLink: "/level2Quest2",
		buttonName: "Play"
	},
	{
		title: "Quiz 2",
		badge: BadgeType.QUIZ,
		text: "Überprüfe ob du die Theorie verstanden hast",
		buttonLink: "/level2Quiz2",
		buttonName: "Solve"
	},
	{
		title: "Quest 3: TODO",
		badge: BadgeType.SPIEL,
		text: "TODO",
		buttonLink: "/level2Quest3",
		buttonName: "Play"
	}
];

export default function LevelOverview(): ReactElement {
	return (
		<Container fluid className="overview">
			<Tab.Container defaultActiveKey="tutorial">
				<Nav justify className="overviewTab" variant="tabs">
					<Nav.Link eventKey="tutorial" className="overviewNavLink">
						Tutorial
					</Nav.Link>
					<Nav.Link eventKey="exampleLevel" className="overviewNavLink">
						Beispiel Level
					</Nav.Link>
					<Nav.Link eventKey="level1" className="overviewNavLink">
						Level 1
					</Nav.Link>
					<Nav.Link eventKey="level2" className="overviewNavLink">
						Level 2
					</Nav.Link>
					<Nav.Link eventKey="disabled" className="overviewNavLink" disabled>
						Level 3
					</Nav.Link>
				</Nav>
				<Tab.Content>
					<Tab.Pane eventKey="tutorial">
						<Card className="overviewTabCard">
							<Card.Body className="justify-content-center">
								<h1 className="text-center">Tutorial</h1>
								<p className="text-center">Hier lernst du die Grundlagen kennen.</p>
								<LevelOverviewBar config={barConfigTutorial}></LevelOverviewBar>
							</Card.Body>
						</Card>
					</Tab.Pane>
					<Tab.Pane eventKey="exampleLevel">
						<Card className="overviewTabCard">
							<Card.Body className="justify-content-center">
								<h1 className="text-center">Beispiel Level</h1>
								<p className="text-center">Ein paar Beispiele für Quests</p>
								<LevelOverviewBar config={barConfigExample}></LevelOverviewBar>
							</Card.Body>
						</Card>
					</Tab.Pane>
					<Tab.Pane eventKey="level1">
						<Card className="overviewTabCard">
							<Card.Body>
								<h1 className="text-center">tv-Diagramm</h1>
								<p className="text-center">
									Hier lernst du das Zeit-Geschwindigkeitsdiagramm näher kennen
								</p>
								<LevelOverviewBar config={barConfig1}></LevelOverviewBar>
							</Card.Body>
						</Card>
					</Tab.Pane>
					<Tab.Pane eventKey="level2">
						<Card className="overviewTabCard">
							<Card.Body>
								<h1 className="text-center">St&auml;dtereise</h1>
								<p className="text-center">
									In Level 2 wird der Spieler sich auf eine St&auml;dtereise
									begeben. Schau dir das Setting jetzt schon an!
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
