import React, { ReactElement } from "react";
import { resetUserdata } from "../userdata";

export default function Footer(): ReactElement {
	return (
		<div className="pt-4">
			<div className="footer">
				<div className="footerLeft">
					<p className="footerText">&copy; copyright 2020</p>
				</div>
				<div className="footerRight">
					<a onClick={resetUserdata} className="footerLink">
						Fortschritt zur&uuml;cksetzen
					</a>
					<a href="mailto:physics.game.team@gmail.com" className="footerLink">
						Bug&nbsp;Melden
					</a>
					<a href="mailto:physics.game.team@gmail.com" className="footerLink">
						Feedback
					</a>
					<a href="mailto:physics.game.team@gmail.com" className="footerLink">
						Kontakt
					</a>
				</div>
			</div>
		</div>
	);
}
