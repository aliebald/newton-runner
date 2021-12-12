import React, { ReactElement, useState } from "react";
import FeedbackForm from "./FeedbackForm";

export default function Footer(): ReactElement {
	const [feedbackModal, setFeedbackModal] = useState(false);

	return (
		<>
			<FeedbackForm active={feedbackModal} close={() => setFeedbackModal(false)} />
			<div className="pt-4">
				<div className="footer">
					<div className="footerRight">
						<a href="mailto:physics.game.team@gmail.com" className="footerLink">
							Bug&nbsp;Melden
						</a>
						<a onClick={() => setFeedbackModal(true)} className="footerLink">
							Feedback
						</a>
						<a href="mailto:physics.game.team@gmail.com" className="footerLink">
							Kontakt
						</a>
						<a
							className="footerLink"
							href="https://aliebald.github.io/impressum/"
							target="_blank"
							rel="noopener noreferrer"
							title="Impressum gemäß § 5 TMG"
						>
							Impressum
						</a>
						<a
							target="_blank"
							rel="noreferrer noopener"
							className="ghLink px-3"
							href="https://github.com/aliebald/newton-runner"
							title="GitHub project repository"
						>
							<img src="other/landingPage/GitHub-Mark-32px.png" />
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
