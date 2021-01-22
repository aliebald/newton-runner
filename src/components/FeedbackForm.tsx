import React, { ReactElement } from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { post } from "../backendCommunication";
import { error } from "../logger";
import { getUserId, isLoggedIn } from "../userdata";
import Toast from "./Toast";

export default function FeedbackForm(props: { active: boolean; close(): void }): ReactElement {
	const [success, setSuccess] = useState<"success" | "error" | "unattempted">("unattempted");

	let toast = <></>;
	if (success === "success") {
		toast = (
			<Toast
				title="Feedback gespeichert"
				text="Dein Feedback wurde erfolgreich gespeichert. Vielen Dank für dein Feedback!"
				type="success"
				show={success === "success"}
				onClose={() => setSuccess("unattempted")}
			/>
		);
	} else if (success === "error") {
		toast = (
			<Toast
				title="Fehler"
				text="Es gab einen Fehler beim senden deines Feedbacks. Bitte probiere es später nocheinmal"
				type="error"
				show={success === "error"}
				onClose={() => setSuccess("unattempted")}
			/>
		);
	}

	return (
		<div style={{ position: "absolute" }}>
			{toast}
			<Modal size="lg" show={props.active} onHide={props.close}>
				<Form onSubmit={handleSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>Schick uns dein Feedback</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email Adresse - Optional!</Form.Label>
							<Form.Control
								type="email"
								placeholder="DeineEmail@provider.de"
								maxLength={100}
							/>
							<Form.Text className="text-muted">
								Falls wir R&uuml;ckfragen zu deinem Feedback haben.
							</Form.Text>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Betreff</Form.Label>
							<Form.Control required type="text" name="subject" maxLength={100} />
						</Form.Group>
						<Form.Group controlId="exampleForm.ControlTextarea1">
							<Form.Label>Beschreibung</Form.Label>
							<Form.Control
								required
								as="textarea"
								name="feedback"
								rows={8}
								maxLength={2000}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="outline-primary" onClick={() => props.close()}>
							Abbrechen
						</Button>
						<Button type="submit" variant="primary">
							Feedback&nbsp;Senden
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</div>
	);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function handleSubmit(event: any) {
		event.preventDefault();
		const form = event.target;
		if (!form.checkValidity()) {
			event.stopPropagation();
			setSuccess("error");
			props.close();
			return;
		}

		const feedbackData = {
			email: form.elements.email ? form.elements.email.value : "",
			subject: form.elements.subject.value,
			feedback: form.elements.feedback.value,
			currentPath: window.location.pathname
		};
		let data;
		if (isLoggedIn()) {
			data = {
				userId: getUserId(),
				feedback: feedbackData
			};
		} else {
			data = {
				feedback: feedbackData
			};
		}

		post("/feedback", JSON.stringify(data))
			.then(() => {
				setSuccess("success");
				props.close();
			})
			.catch((errorMsg) => {
				error(errorMsg);
				setSuccess("error");
				props.close();
			});
	}
}
