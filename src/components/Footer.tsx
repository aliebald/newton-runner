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
					</div>
				</div>
			</div>
		</>
	);
}
