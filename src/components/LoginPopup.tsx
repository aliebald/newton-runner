import React, { ReactElement } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LoginPopup(props: { show: boolean; onClose: () => void }): ReactElement {
	const handleClose = () => props.onClose();

	return (
		<Modal show={props.show} onHide={handleClose} backdrop="static" keyboard={false}>
			<Modal.Header closeButton>
				<Modal.Title>Du bist nicht angemeldet</Modal.Title>
			</Modal.Header>
			<Modal.Body>Melde dich jetzt an um alle Features zu benutzen.</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-primary" onClick={handleClose}>
					Ohne Anmeldung Fortfahren
				</Button>
				<Link to="/login">
					<Button variant="primary" onClick={props.onClose}>
						Jetzt Anmelden
					</Button>
				</Link>
			</Modal.Footer>
		</Modal>
	);
}
