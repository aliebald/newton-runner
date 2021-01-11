import React, { ReactElement, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { createNewDevUser, isLoggedIn, login, logout } from "../userdata";

export default function Login(): ReactElement {
	const [userId, setUserId] = useState("");
	const [stayLoggedIn, setStayLoggedIn] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const loggedIn = isLoggedIn();
	let title, subtitle;
	if (loggedIn) {
		title = "Erfolgreich Angemeldet";
		subtitle = "Du bist jetzt angemeldet. Möchtest du dich wieder abmelden?";
	} else {
		title = "Willkommen zurrück";
		subtitle = "Melde dich jetzt an um alle Funktionen zu benutzen";
	}

	const loginForm = (
		<Form>
			<Form.Group controlId="loginForm">
				<Form.Label>Benutzer&nbsp;ID</Form.Label>
				<Form.Control type="text" onChange={(event) => setUserId(event.target.value)} />
				<Form.Text className="text-muted">
					Solltest du keine eigene Benutzer ID haben, wende dich bitte an deinen Betreuer
					oder Lehrer.
				</Form.Text>
			</Form.Group>

			<Form.Group controlId="stayLoggedInCheckbox">
				<Form.Check
					label="Angemeldet bleiben"
					type="checkbox"
					onChange={() => setStayLoggedIn(!stayLoggedIn)}
				/>
			</Form.Group>
		</Form>
	);

	const [content, setContent] = useState(loggedIn ? <></> : loginForm);

	// TODO: The "(Debug) Create new User and login" Button is only temporary (for testing)
	return (
		<>
			<Container fluid="lg" className="d-flex justify-content-center">
				<Row className="boxWrapper loginScreen mt-3 px-2">
					<Col>
						<h2 className="text-center">{title}</h2>
						<p className="text-muted text-center">{subtitle}</p>
						<div className="text-center error">{errorMessage}</div>
						{content}
						<div className="d-flex justify-content-center">
							<Button size="lg" onClick={handleMainButton} variant="primary">
								{loggedIn ? "Abmelden" : "Anmelden"}
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
			<div className="d-flex justify-content-center pt-5">
				<Button size="sm" onClick={() => createNewDevUser()}>
					(Debug) Create new User and login
				</Button>
			</div>
		</>
	);

	function handleMainButton() {
		if (loggedIn) {
			logout();
			location.reload();
		} else {
			checkLogin();
		}
	}

	function checkLogin() {
		if (userId.length > 0) {
			login(userId, stayLoggedIn).then((success) => {
				if (success === "success") {
					console.log("successfully logged in");
					setContent(<></>);
				} else if (success === "invalidId") {
					console.warn("failed to log in: invalid id");
					setErrorMessage("Die angegeben Benutzer ID kann nicht gefunden werden.");
				} else {
					console.warn("failed to log in");
					setErrorMessage(
						"Beim login ist ein fehler aufgetreten. Bitte versuche es später nochmal."
					);
				}
			});
		} else {
			setErrorMessage("Bitte gib deine Benutzer ID in dem Feld an.");
		}
	}
}
