import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function Footer(): ReactElement {
	return (
		<div className="footer">
			<div className="footerLeft">
				<p className="footerText">&copy; copyright 2020</p>
			</div>
			<div className="footerRight">
				<Link to="/" className="footerLink">
					Bug&nbsp;Melden
				</Link>
				<Link to="/" className="footerLink">
					Feedback
				</Link>
				<Link to="/" className="footerLink">
					Impressum
				</Link>
				<Link to="/" className="footerLink">
					Kontakt
				</Link>
			</div>
		</div>
	);
}
