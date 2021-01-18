import React, { ReactElement } from "react";
import { Container, Card, Nav, Tab } from "react-bootstrap";
import { BadgeType, LevelOverviewBar, LevelOverviewCardConfig } from "./LevelOverviewElements";

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
		text: "Bewegung und Zeit-Orts-Diagramme",
		buttonLink: "/level1Theory1",
		buttonName: "Lesen"
	},
	{
		title: "Erklärung Quiz",
		badge: BadgeType.ERKLÄRUNG,
		text: "Hier erklären wir dir alle Teile des Quiz",
		buttonLink: "/level1Quiz1Explanation1",
		buttonName: "Lesen"
	},
	{
		title: "Quiz 1",
		badge: BadgeType.QUIZ,
		text: "Überprüfe ob du die Theorie verstanden hast",
		buttonLink: "/level1Quiz1",
		buttonName: "Lösen"
	},
	{
		title: "Erklärung der Spielsteuerung",
		badge: BadgeType.ERKLÄRUNG,
		text: "Wie du den Platformer mithilfe eines Zeit-Orts-Diagramms steuerst",
		buttonLink: "/level1GameMechanics1",
		buttonName: "Lesen"
	},
	{
		title: "Quest 1 : Zeit-Orts-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Lerne die Steuerung anhand einer einfachen Quest",
		buttonLink: "/level1Quest1",
		buttonName: "Spielen"
	},
	{
		title: "Quest 2 : Zeit-Orts-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Eine etwas schwierigere Quest",
		buttonLink: "/level1Quest2",
		buttonName: "Spielen"
	},
	{
		title: "Quiz 2",
		badge: BadgeType.QUIZ,
		text: "Eine kleine Auffrischung der Theorie ist sicher hilfreich",
		buttonLink: "/level1Quiz2",
		buttonName: "Lösen"
	},
	{
		title: "Quest 3 : Zeit-Orts-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Schaffst du diese Quest?",
		buttonLink: "/level1Quest3",
		buttonName: "Spielen"
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
		text: "Beschleunigte Bewegung und Zeit-Geschwindigkeits-Diagramme",
		buttonLink: "/level2Theory1",
		buttonName: "Lesen"
	},
	{
		title: "Quiz 1",
		badge: BadgeType.QUIZ,
		text: "Überprüfe ob du die Theorie verstanden hast",
		buttonLink: "/level2Quiz1",
		buttonName: "Lösen"
	},
	{
		title: "Quest 1: Zeit-Geschwindigkeits-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Lerne die Steuerung anhand einer einfachen Quest",
		buttonLink: "/level2Quest1",
		buttonName: "Spielen"
	},
	{
		title: "Quest 2: Zeit-Geschwindigkeits-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Eine etwas schwierigere Quest",
		buttonLink: "/level2Quest2",
		buttonName: "Spielen"
	},
	{
		title: "Quiz 2",
		badge: BadgeType.QUIZ,
		text: "Überprüfe ob du die Theorie verstanden hast",
		buttonLink: "/level2Quiz2",
		buttonName: "Lösen"
	},
	{
		title: "Quest 3: Zeit-Geschwindigkeits-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Eine echte Herausforderung!",
		buttonLink: "/level2Quest3",
		buttonName: "Spielen"
	},
	{
		title: "Das Ende",
		badge: BadgeType.STORY,
		text: "Wie geht die Geschichte wohl aus?",
		buttonLink: "/level2Story",
		buttonName: "Lesen"
	}
];

export default function LevelOverview(): ReactElement {
	return (
		<Container fluid className="overview">
			<Tab.Container defaultActiveKey="level1">
				<Nav className="overviewTab" variant="tabs">
					<Nav.Link eventKey="level1" className="overviewNavLink">
						Level 1
					</Nav.Link>
					<Nav.Link eventKey="level2" className="overviewNavLink">
						Level 2
					</Nav.Link>
				</Nav>
				<Tab.Content>
					<Tab.Pane eventKey="level1">
						<Card className="overviewTabCard">
							<Card.Body>
								<h1 className="text-center">Heimat</h1>
								<p className="text-center">
									Zu Beginn deiner Reise lernst du das Zeit-Orts-Diagrammm
									n&auml;her kennen.
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
									In Level 2 begibt sich der Spieler auf eine St&auml;dtereise und
									erf&auml;hrt dort alles &uuml;ber das
									Zeit-Geschwindigkeits-Diagramm.
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
