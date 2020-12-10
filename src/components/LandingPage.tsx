import src from "*.avif";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function LandingPage(): ReactElement {
	return (
		<div>
			<h1>Lerne spielerisch und schnell </h1>
			<h2>die Grundlagen der Physikalischen Motorik</h2>
			<Link to="/Tutorial">
				<button>Spielerne jetzt</button>
			</Link>
			<hr />
			<h4>Du kannst die Grundlagen und willst nur das Spiel ausprobieren</h4>
			<h4>dann überspring doch das Tutorial</h4>
			<Link to="/level1Quest1">
				<button>Spiel drauf los</button>
			</Link>
			<hr />
			<h4>Du möchtest erstmal schauen ob das Spiel etwas für dich ist</h4>
			<h4>schau dir einfach unsere Beispiellevel an</h4>
			<Link to="/ExampleQuest1">
				<button>Probier es aus</button>
			</Link>
		</div>
	);
}
