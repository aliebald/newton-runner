import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { resetUserdata } from "../userdata";

export default function Footer(): ReactElement {
	return (
		<div className="footer">
			<div className="footerLeft">
				<p className="footerText">&copy; copyright 2020</p>
			</div>
			<div className="footerRight">
				<a onClick={resetUserdata} className="footerLink">
					Fortschritt zur&uuml;cksetzen
				</a>
				<a href="mailto:physics.game.team" className="footerLink">
					Bug&nbsp;Melden
				</a>
				<a href="mailto:physics.game.team" className="footerLink">
					Feedback
				</a>
				<Link to="/" className="footerLink">
					Team
				</Link>
				<a href="mailto:physics.game.team" className="footerLink">
					Kontakt
				</a>
			</div>
		</div>
	);
}
