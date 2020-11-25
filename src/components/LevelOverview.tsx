import React, { ReactElement } from "react";
import { Button, ButtonGroup, ButtonToolbar, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import GraphInput from "./GraphInput";
import { GraphInputConfig } from "./GraphInput";

const ccfg: GraphInputConfig = {
	title: "Test",
	minY: 0,
	maxY: 100,
	amountXVal: 7
};

export default function LevelOverview(): ReactElement {
	return (
		<Container fluid>
			<Row className="justify-content-center row-card-overview">
				<Card>
					<Card.Body>
						<Card.Title>Tutorial</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">
							Einführung in das Thema
						</Card.Subtitle>
						<ButtonToolbar aria-label="Toolbar with button groups">
							<ButtonGroup className="mr-2" aria-label="First group">
								<Link to="/Tutorial">
									<Button>0.1</Button>
								</Link>
							</ButtonGroup>
							<ButtonGroup className="mr-2" aria-label="Second group">
								<Link to="/Tutorial">
									<Button>0.2</Button>
								</Link>
							</ButtonGroup>
							<ButtonGroup aria-label="Third group">
								<Link to="/Tutorial">
									<Button>0.3</Button>
								</Link>
							</ButtonGroup>
						</ButtonToolbar>
					</Card.Body>
				</Card>
			</Row>
			<Row className="justify-content-center row-card-overview">
				<Card>
					<Card.Body>
						<Card.Title>Kapitel 1</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">t-v Diagramme</Card.Subtitle>
						<ButtonToolbar aria-label="Toolbar with button groups">
							<ButtonGroup className="mr-2" aria-label="First group">
								<Link to="/ExampleQuest1">
									<Button>1.1</Button>
								</Link>
							</ButtonGroup>
							<ButtonGroup className="mr-2" aria-label="Second group">
								<Link to="/ExampleQuest2">
									<Button>1.2</Button>
								</Link>
							</ButtonGroup>
							<ButtonGroup aria-label="Third group">
								<Link to="/ExampleQuest2">
									<Button>1.3</Button>
								</Link>
							</ButtonGroup>
						</ButtonToolbar>
					</Card.Body>
				</Card>
			</Row>
			<GraphInput cfg={ccfg}></GraphInput>
		</Container>
	);
}
