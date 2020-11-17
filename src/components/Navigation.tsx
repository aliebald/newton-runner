import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function Navigation(): ReactElement {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Link to="/" className="navbar-brand">
				Physics Game
			</Link>
			<Navbar.Toggle aria-controls="navbar-nav" />
			<Navbar.Collapse id="navbar-nav">
				<Nav className="mr-auto navLink">
					<Link to="/" className="navElem">
						Landing Page
					</Link>
					<Link to="/LevelOverview" className="navElem">
						LevelOverview
					</Link>
					<Link to="/Tutorial" className="navElem">
						Tutorial
					</Link>

					<NavDropdown title="Example level" id="nav-dropdown">
						<Link to="/ExampleQuest1" className="dropdown-item">
							Example Quest 1
						</Link>
						<Link to="/ExampleQuest2" className="dropdown-item">
							Example Quest 2
						</Link>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
