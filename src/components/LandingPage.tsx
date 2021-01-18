import React, { ReactElement } from "react";
import { Accordion, Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./../css/style.landingpage.css";

export default function LandingPage(props: { loggedIn: boolean }): ReactElement {
	const loginBtn = props.loggedIn ? (
		<></>
	) : (
		<Link to="/login">
			<Button variant="primary" size="lg" className="mr-2">
				Jetzt Anmelden
			</Button>
		</Link>
	);
	return (
		<div className="landingpage">
			<Container fluid="lg" className="px-3 py-3">
				<div className="boxWrapper px-3">
					<div className="text-center pt-3 pb-5">
						<h1 className="title">Beginne jetzt deine Reise</h1>
						<p>
							Begib dich auf die Suche nach einem Mysteri&ouml;sen Schatz und lerne
							nebenbei die Grundlagen der Bewegung.
						</p>
						{loginBtn}
						<Link to="/level1Story1">
							<Button
								variant={props.loggedIn ? "primary" : "outline-primary"}
								size="lg"
								className="my-1"
							>
								Jetzt&nbsp;Anfangen
							</Button>
						</Link>
					</div>
					<Row className="py-4">
						<Col sm="4" md="6" className="text-center">
							<img src="other/landingPage/hikerIdle.gif" className="" />
						</Col>
						<Col sm="8" md="6" className="text-center my-auto pl-2 pr-3">
							<h2 className="title">Spiele</h2>
							<p>
								Benutze deine Kenntnisse &uuml;ber gleichf&ouml;rmige Bewegung und
								Diagramme um durch eine vielzahl von Quests, vorbei an
								gef&auml;hrlichen Abgr&uuml;nden, spitzen Stacheln und
								gef&auml;hrlichen Bomben, zu kommen.
								<br />
								Sammle auf deiner Reise m&ouml;glichst viele Punkte und lass ja
								keinen Bonuspunkt aus, um am Ende ganz oben auf der Bestenliste zu
								stehen! Mit etwas geschick werden dort auch schicke abzeichen und
								Errungenschaften deinen Listenplatz schm&uuml;cken.
							</p>
						</Col>
					</Row>
					<Row className="py-4">
						<Col sm="8" md="6" className="text-center my-auto pl-3 pr-2">
							<h2 className="title">Lerne</h2>
							<p>
								Auf deiner Reise wirst du die Grundlagen von gleichf&ouml;rmiger und
								beschleunigter Bewegung kennenlernen. Dabei benutzt du zu beginn ein
								Zeit-Orts-Diagramm (t-x-Diagramm), und sp&auml;ter ein
								Zeit-Geschwindigkeits-Diagramm(t-v-Diagramm), um dich an
								Hindernissen vorbei durch hin zu deinem Ziel zu f&uuml;hren. Dabei
								wird dein Wissen auch regelm&auml;ßig in Quizzes gefordert.
							</p>
						</Col>
						<Col sm="4" md="6" className="text-center">
							<img src="other/landingPage/HikerWalk.gif" className="" height="230" />
						</Col>
					</Row>
					<Row className="pt-5 pb-2">
						<Col>
							<h2 className="title">Mehr Erfahren</h2>
							<Accordion>
								<Card>
									<Accordion.Toggle as={Card.Header} eventKey="project">
										Projektbeschreibung
									</Accordion.Toggle>
									<Accordion.Collapse eventKey="project">
										<Card.Body>
											<p>
												Im Rahmen des Bachelor Praktikums „IT basiertes
												Lernen“ an der Technischen Universit&auml;t
												M&uuml;nchen besch&auml;ftigt sich unsere Gruppe mit
												der Erstellung eines webbasierten Lernspiels
												f&uuml;r den Physikunterricht. Mit diesem soll das
												Thema der Bewegung, mit Fokus auf Zeit-Orts- und
												Zeit-Geschwindigkeits-Diagramme, auf eine
												spielerische Art eingef&uuml;hrt werden.
											</p>
											<p>
												Das Spiel besteht dabei aus mehreren Levels und drei
												zentralen Elementen: der Theorie, Quizzes und
												Quests. Dabei wird zu Beginn eines Levels zuerst die
												Theorie vermittelt und durch ein Quiz abgefragt.
												Danach kann das gelernte durch Quests (das
												eigentliche Spiel) und zus&auml;tzliche Quizze
												verinnerlicht werden. Die aktuell zwei level führen
												dabei den Spieler intuitiv in die Grundlagen der
												Bewegung und den Zusammenhang mit verschiedenen
												arten von Graphen ein.
											</p>
											<p>
												Gegen Ende des Praktikums wird das Projekt mit
												Sch&uuml;lern in mehreren Unterrichtsstunden
												durchgeführt. Danach wird anhand des so gesammelten
												Feedbacks und Daten eine Evaluation ausgearbeitet.
											</p>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
								<Card>
									<Accordion.Toggle as={Card.Header} eventKey="team">
										Team
									</Accordion.Toggle>
									<Accordion.Collapse eventKey="team">
										<Card.Body className="d-flex">
											<div className="pr-2">
												Alexander&nbsp;Liebald:&nbsp;
												<br />
												Niclas&nbsp;H&uuml;lsmann:&nbsp;
												<br />
												Sandra&nbsp;Graßnick:&nbsp;
												<br />
												Philipp&nbsp;Rappolder:&nbsp;
											</div>
											<div>
												<Badge className="managementBadge">
													&#x1F4C5; Project&nbsp;management
												</Badge>
												<Badge className="devBadge ml-1">
													&#128421; Developer
												</Badge>
												<a
													target="_blank"
													rel="noreferrer noopener"
													className="ghLink  ml-1"
													href="https://github.com/aliebald"
												>
													<img src="other/landingPage/GitHub-Mark-32px.png" />
												</a>
												<br />
												<Badge className="designBadge">
													&#x1F58C; Level&nbsp;Design
												</Badge>
												<Badge className="devBadge ml-1">
													&#128421; Developer
												</Badge>
												<a
													target="_blank"
													rel="noreferrer noopener"
													className="ghLink ml-1"
													href="https://github.com/nhuels"
												>
													<img src="other/landingPage/GitHub-Mark-32px.png" />
												</a>
												<br />
												<Badge className="storyBadge">
													&#128209; Content&nbsp;Creator
												</Badge>
												<br />
												<Badge className="designBadge">
													&#x1F58C; Level&nbsp;Design
												</Badge>
											</div>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
								<Card>
									<Accordion.Toggle as={Card.Header} eventKey="contact">
										Kontakt
									</Accordion.Toggle>
									<Accordion.Collapse eventKey="contact">
										<Card.Body>
											Schreib uns gerne eine mail an&nbsp;
											<a
												href="mailto:physics.game.team@gmail.com"
												className="footerLink"
											>
												physics.game.team@gmail.com
											</a>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
						</Col>
					</Row>
				</div>
			</Container>
			<div className="landingpageBg">
				<img src="other/landingPage/background.png" alt="" className="w-100 pt-5 mb-2" />
			</div>
		</div>
	);
}
