import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./../css/styles.css";

export default function Navigation(): ReactElement {
	return (
		<nav>
			<h1>Welcome</h1>
			<ul className="navLink my-auto">
				<Link to="/">
					<li>Landing Page</li>
				</Link>
				<Link to="/ExampleQuest1">
					<li>Example Quest 1</li>
				</Link>
				<Link to="/ExampleQuest2">
					<li>Example Quest 2</li>
				</Link>
			</ul>
		</nav>
	);
}
