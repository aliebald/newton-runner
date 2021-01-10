import React, { ReactElement } from "react";
import { Toast as BsToast } from "react-bootstrap";

export default function Toast(props: {
	title: string;
	text: string;
	type: "success" | "error" | "";
	show: boolean;
	onClose: () => void;
}): ReactElement {
	return (
		<div className="customToast">
			<div className="d-flex justify-content-center">
				<BsToast
					onClose={props.onClose}
					show={props.show}
					delay={3000}
					autohide
					className={props.type}
				>
					<BsToast.Header>
						<strong className="mr-auto">{props.title}</strong>
					</BsToast.Header>
					<BsToast.Body>{props.text}</BsToast.Body>
				</BsToast>
			</div>
		</div>
	);
}
