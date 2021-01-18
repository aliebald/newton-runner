import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function Navigation(props: { loggedIn: boolean }): ReactElement {
	return (
		<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
			<Navbar.Brand as={Link} to="/" className="navbarTitle">
				Newton&nbsp;Runner
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav>
					<Nav.Link as={Link} to="/" className="navElem">
						Startseite
					</Nav.Link>
					<Nav.Link as={Link} to="/LevelOverview" className="navElem">
						&Uuml;bersicht
					</Nav.Link>
					<Nav.Link as={Link} to="/Statistics" className="navElem">
						Statistik
					</Nav.Link>
				</Nav>
				<Nav className="ml-auto">
					<Nav.Link as={Link} to="/login" className="navElem">
						{props.loggedIn ? "Profil" : "Anmelden"}
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
