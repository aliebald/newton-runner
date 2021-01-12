import React, { ReactElement } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Page for 404 error
export default function UnknownPageError(): ReactElement {
	return (
		<div className="text-center mt-3">
			<div className="unknownPageCode">404</div>
			<div className="unknownPageText">Die Seite die du suchst wurde nicht gefunden.</div>
			<Link to="/">
				<Button variant="primary" className="mt-3">
					Zur&uuml;ck zur Startseite
				</Button>
			</Link>
		</div>
	);
}
