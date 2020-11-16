import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./../css/styles.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function Navigation(): ReactElement {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand href="/">Physics Game</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="/">Landing Page</Nav.Link>
					<Nav.Link href="/Tutorial">Tutorial</Nav.Link>
					<NavDropdown title="Example level" id="basic-nav-dropdown">
						<NavDropdown.Item href="/ExampleQuest1">Example Quest 1</NavDropdown.Item>
						<NavDropdown.Item href="/ExampleQuest2">Example Quest 2</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
