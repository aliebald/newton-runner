import React, { ReactElement } from "react";
import { Container, Card, Nav, Tab } from "react-bootstrap";
import { BadgeType, LevelOverviewBar, LevelOverviewCardConfig } from "./LevelOverviewElements";

const barConfig1: Array<LevelOverviewCardConfig> = [
	{
		id: "level1Story1",
		title: "Die Geschichte beginnt ...",
		badge: BadgeType.STORY,
		text: "Ein Geheimnis wartet darauf entdeckt zu werden.",
		buttonName: "Lesen"
	},
	{
		id: "level1Theory1",
		title: "Gleichförmige Bewegung",
		badge: BadgeType.THEORIE,
		text: "Bewegung und Zeit-Orts-Diagramme",
		buttonName: "Lesen"
	},
	{
		id: "level1QuizIntro1",
		title: "Erklärung Quiz",
		badge: BadgeType.ERKLÄRUNG,
		text: "Hier erklären wir dir alle Teile des Quiz",
		buttonName: "Lesen"
	},
	{
		id: "level1Quiz1",
		title: "Quiz 1",
		badge: BadgeType.QUIZ,
		text: "Überprüfe ob du die Theorie verstanden hast",
		buttonName: "Lösen"
	},
	{
		id: "level1GameMechanics1",
		title: "Erklärung der Spielsteuerung",
		badge: BadgeType.ERKLÄRUNG,
		text: "Wie du den Platformer mithilfe eines Zeit-Orts-Diagramms steuerst",
		buttonName: "Lesen"
	},
	{
		id: "level1Quest1",
		title: "Quest 1 : Zeit-Orts-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Lerne die Steuerung anhand einer einfachen Quest",
		buttonName: "Spielen"
	},
	{
		id: "level1Quest2",
		title: "Quest 2 : Zeit-Orts-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Eine etwas schwierigere Quest",
		buttonName: "Spielen"
	},
	{
		id: "level1Quiz2",
		title: "Quiz 2",
		badge: BadgeType.QUIZ,
		text: "Eine kleine Auffrischung der Theorie ist sicher hilfreich",
		buttonName: "Lösen"
	},
	{
		id: "level1Quest3",
		title: "Quest 3 : Zeit-Orts-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Schaffst du diese Quest?",
		buttonName: "Spielen"
	},
	{
		id: "level1Story2",
		title: "Das Abenteuer geht weiter.",
		badge: BadgeType.STORY,
		text: "Was hast du bisher erreicht?",
		buttonName: "Lesen"
	}
];

const barConfig2: Array<LevelOverviewCardConfig> = [
	{
		id: "level2Story1",
		title: "Neuer Ort, neues Glück.",
		badge: BadgeType.STORY,
		text: "Setze dein Abenteuer fort.",
		buttonName: "Lesen"
	},
	{
		id: "level2Theory1",
		title: "Beschleunigte Bewegung",
		badge: BadgeType.THEORIE,
		text: "Beschleunigte Bewegung und Zeit-Geschwindigkeits-Diagramme",
		buttonName: "Lesen"
	},
	{
		id: "level2Quiz1",
		title: "Quiz 1",
		badge: BadgeType.QUIZ,
		text: "Überprüfe ob du die Theorie verstanden hast",
		buttonName: "Lösen"
	},
	{
		id: "level2Quest1",
		title: "Quest 1: Zeit-Geschwindigkeits-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Lerne die Steuerung anhand einer einfachen Quest",
		buttonName: "Spielen"
	},
	{
		id: "level2Quest2",
		title: "Quest 2: Zeit-Geschwindigkeits-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Eine etwas schwierigere Quest",
		buttonName: "Spielen"
	},
	{
		id: "level2Quiz2",
		title: "Quiz 2",
		badge: BadgeType.QUIZ,
		text: "Überprüfe ob du die Theorie verstanden hast",
		buttonName: "Lösen"
	},
	{
		id: "level2Quest3",
		title: "Quest 3: Zeit-Geschwindigkeits-Diagramm",
		badge: BadgeType.SPIEL,
		text: "Eine echte Herausforderung!",
		buttonName: "Spielen"
	},
	{
		id: "level2Story2",
		title: "Das Ende",
		badge: BadgeType.STORY,
		text: "Wie geht die Geschichte wohl aus?",
		buttonName: "Lesen"
	}
];

const barConfigBonus: Array<LevelOverviewCardConfig> = [
	{
		id: "bonusLevelTheory1",
		title: "1. Newtonsches Gesetz",
		badge: BadgeType.THEORIE,
		text: "Bonus für interessierte: das 1. Newtonsches Gesetz.",
		buttonName: "Lesen"
	},
	{
		id: "bonusLevelQuiz1",
		title: "Quiz",
		badge: BadgeType.QUIZ,
		text: "Überprüfe ob du das 1. Newtonsches Gesetz verstanden hast",
		buttonName: "Lösen"
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
					<Nav.Link eventKey="bonusLevel" className="overviewNavLink">
						Bonus: Newton
					</Nav.Link>
				</Nav>
				<Tab.Content>
					<Tab.Pane eventKey="level1">
						<Card className="overviewTabCard">
							<Card.Body>
								<h1 className="text-center">Heimat</h1>
								<p className="text-center">
									Zu Beginn deiner Reise lernst du das Zeit-Orts-Diagramm
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
					<Tab.Pane eventKey="bonusLevel">
						<Card className="overviewTabCard">
							<Card.Body>
								<h1 className="text-center">Bonus: 1. Newtonsche Gesetz</h1>
								<p className="text-center">
									Du bist schon fertig, w&uuml;rdest aber gerne noch mehr
									Erfahren?
									<br />
									Kein Problem, schau dir doch noch das 1. Newtonsche Gesetz an.
								</p>
								<LevelOverviewBar config={barConfigBonus}></LevelOverviewBar>
							</Card.Body>
						</Card>
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</Container>
	);
}
