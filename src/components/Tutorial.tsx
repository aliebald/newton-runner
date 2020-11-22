import { color } from "highcharts";
import React, { ReactElement } from "react";
import { Button, ButtonGroup, ButtonToolbar, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Tutorial(): ReactElement {
	return (
		<div>
			<h1 style={{ color: "blue" }}>Kinematik und Dynamik geradliniger Bewegung</h1>
			<p>Geschwindigkeit: v = zurückgelegter Weg/dafür benötigte Zeit = delta x/ delta y</p>
			<p>Einheit: [v] = 1 m/s = 3,6 km/h</p>
			<p>
				Beschleunigung: a = Geschwindigkeitsänderung/dafür benötigte Zeit = delta v/ delta t
			</p>
			<p>Einheit: [a] = 1 m/s^2</p>
			<Container fluid>
				<Row className="justify-content-center row-card-overview"></Row>
				<Card>
					<Card.Body>
						<Card.Title>Wie wird die Geschwindigkeit berechnet?</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">
							Wähle die richtige Antwort
						</Card.Subtitle>
						<ButtonToolbar aria-label="Toolbar with button groups">
							<ButtonGroup className="mr-2" aria-label="First group" color="blue">
								<Button>v = delta y/ delta x</Button>
							</ButtonGroup>
							<ButtonGroup className="mr-2" aria-label="Second group">
								<Button>v = delta x/ delta y</Button>
							</ButtonGroup>
							<ButtonGroup aria-label="Third group">
								<Button>v = delta z/delta x</Button>
							</ButtonGroup>
						</ButtonToolbar>
					</Card.Body>
				</Card>
			</Container>
		</div>
	);
}
