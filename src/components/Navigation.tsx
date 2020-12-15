import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function Navigation(): ReactElement {
	return (
		<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
			<Navbar.Brand as={Link} to="/" className="navbarTitle">
				Physics Game
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav>
					<Nav.Link as={Link} to="/" className="navElem">
						Home
					</Nav.Link>
					<Nav.Link as={Link} to="/LevelOverview" className="navElem">
						&Uuml;bersicht
					</Nav.Link>
					<NavDropdown title="Aufgaben" id="collasible-nav-dropdown" className="navElem">
						<NavDropdown.Item as={Link} to="/ExampleQuest1" className="navElem">
							Beispiel Aufgabe 1
						</NavDropdown.Item>
						<NavDropdown.Item as={Link} to="/ExampleQuest2" className="navElem">
							Beispiel Aufgabe 2
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item as={Link} to="/level1Theory1" className="navElem">
							Level 1 Theorie 1
						</NavDropdown.Item>
						<NavDropdown.Item as={Link} to="/level1Quiz1" className="navElem">
							Level 1 Quiz 1
						</NavDropdown.Item>
						<NavDropdown.Item as={Link} to="/level1Quest1" className="navElem">
							Level 1 Aufgabe 1
						</NavDropdown.Item>
						<NavDropdown.Item as={Link} to="/level1Quest2" className="navElem">
							Level 1 Aufgabe 2
						</NavDropdown.Item>
						<NavDropdown.Item as={Link} to="/level1Quiz2" className="navElem">
							Level 1 Quiz 2
						</NavDropdown.Item>
						<NavDropdown.Item as={Link} to="/level1Quest3" className="navElem">
							Level 1 Aufgabe 3
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item as={Link} to="/level2Quest1" className="navElem">
							Level 2 Aufgabe 1
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Nav className="ml-auto">
					<Nav.Link as={Link} to="/" className="navElem">
						Anmelden
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
