import React, { ReactElement, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { log, warn } from "../logger";
import { getNameLocal, isLoggedIn, login, logout, setName } from "../userdata";

export default function Login(props: {
	loggedIn: boolean;
	setLoggedIn: (loggedIn: boolean) => void;
}): ReactElement {
	const [userId, setUserId] = useState("");
	const [stayLoggedIn, setStayLoggedIn] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const history = useHistory();
	let title, subtitle;
	if (props.loggedIn) {
		title = "Erfolgreich Angemeldet";
		subtitle = "Du bist jetzt angemeldet. Möchtest du dich wieder abmelden?";
	} else {
		title = "Willkommen zurück";
		subtitle = "Melde dich jetzt an um alle Funktionen zu benutzen";
	}

	autoLogin();

	const loginForm = (
		<Form>
			<Form.Group controlId="loginForm">
				<Form.Label>Benutzer&nbsp;ID</Form.Label>
				<Form.Control
					type="text"
					onChange={(event) => setUserId(event.target.value)}
					maxLength={40}
				/>
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

	const oldName = getNameLocal();
	const changeNameForm = (
		<Form onSubmit={changeName}>
			<Form.Group controlId="changeNameForm">
				<Form.Label>Name</Form.Label>
				<div className="d-flex">
					<Form.Control
						type="text"
						name="newName"
						maxLength={20}
						className="mr-1"
						placeholder="Anonym"
						defaultValue={oldName}
					/>
					<Button type="submit" variant="primary">
						Speichern
					</Button>
				</div>
				<Form.Text className="text-muted pb-3">
					Hier kannst du deinen Namen &auml;ndern. Der Name wird nur für das Leaderboard
					verwendet.
				</Form.Text>
			</Form.Group>
		</Form>
	);

	const buttons = (
		<div className="d-flex justify-content-center">
			{props.loggedIn ? (
				<Button
					size="lg"
					onClick={() => history.push("/level1Story1")}
					variant="primary"
					className="mr-1"
				>
					Jetzt Starten
				</Button>
			) : (
				<></>
			)}
			<Button
				size="lg"
				onClick={handleMainButton}
				variant={props.loggedIn ? "outline-primary" : "primary"}
			>
				{props.loggedIn ? "Abmelden" : "Anmelden"}
			</Button>
		</div>
	);

	return (
		<Container fluid="lg" className="d-flex justify-content-center">
			<Row className="boxWrapper loginScreen mt-3 px-2">
				<Col>
					<h2 className="text-center">{title}</h2>
					<p className="text-muted text-center">{subtitle}</p>
					<div className="text-center error">{errorMessage}</div>
					<div className="text-center success">{successMessage}</div>
					{props.loggedIn ? changeNameForm : loginForm}
					{buttons}
				</Col>
			</Row>
		</Container>
	);

	function autoLogin() {
		const urlParams = new URLSearchParams(location.search);
		const autologinId = urlParams.get("userId");
		if (autologinId !== null) {
			checkLogin(autologinId, true);
			window.history.pushState({}, document.title, "/" + location.hash);
		}
	}

	function handleMainButton() {
		if (props.loggedIn) {
			logout();
			props.setLoggedIn(false);
			// location.reload();
		} else {
			checkLogin(userId, stayLoggedIn);
		}
	}

	function checkLogin(userId: string, stayLoggedIn: boolean) {
		if (props.loggedIn) {
			return;
		}

		if (userId.length > 0) {
			login(userId, stayLoggedIn).then((success) => {
				if (success === "success") {
					log("successfully logged in");
					props.setLoggedIn(true);
					// location.reload();
				} else if (success === "invalidId") {
					warn("failed to log in: invalid id");
					setErrorMessage("Die angegeben Benutzer ID kann nicht gefunden werden.");
				} else {
					warn("failed to log in");
					setErrorMessage(
						"Beim login ist ein fehler aufgetreten. Bitte versuche es später nochmal."
					);
				}
			});
		} else {
			setErrorMessage("Bitte gib deine Benutzer ID in dem Feld an.");
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function changeName(event: any) {
		event.preventDefault();
		if (!isLoggedIn()) {
			return;
		}
		const form = event.target;
		if (!form.checkValidity()) {
			event.stopPropagation();
			return;
		}

		const newName = form.elements.newName.value;
		if (!newName || newName === oldName) {
			setErrorMessage("Neuer Name stimmt mit deinem alten Namen überein.");
			return;
		}

		if (newName.length > 20 || !setName(newName)) {
			setErrorMessage("Fehler bei der Namensänderung zu: " + newName);
		} else {
			setSuccessMessage("Name erfolgreich angepasst.");
			setTimeout(() => setSuccessMessage(""), 3000);
		}
	}
}
