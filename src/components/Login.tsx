import React, { ReactElement, useState } from "react";
import { Button } from "react-bootstrap";
import { createNewDevUser, login } from "../userdata";

export default function Login(): ReactElement {
	const [userId, setUserId] = useState("");

	// TODO: The "(Dev) Create new User and login" Button is only temporary (for testing)
	return (
		<div className="text-center pt-5">
			<Button onClick={() => createNewDevUser()}>(Dev) Create new User and login</Button>
			<form className="pt-4">
				<label>
					userId:&nbsp;
					<input
						type="text"
						name="userId"
						onChange={(event) => setUserId(event.target.value)}
					/>
				</label>
			</form>
			<Button onClick={checkLogin}>Login with UserID</Button>
		</div>
	);

	function checkLogin() {
		if (userId.length > 0) {
			login(userId);
		} else {
			console.log("Cant login with an empty userID");
		}
	}
}
