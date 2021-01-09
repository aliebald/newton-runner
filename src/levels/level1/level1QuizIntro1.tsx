import React from "react";
import { TheoryConfig } from "../../components/Theory";
import { Image } from "react-bootstrap";

const config: TheoryConfig = {
	slides: [
		<React.Fragment key={0}>
			<h1 className="centerBox">Level 1 - Erklärung Quiz</h1>
			<br />
			<p className="centerBox">Eine kleine Einführung in die Quizkomponente</p>
		</React.Fragment>,
		<>
			<Image src={"levels/level1/quiz_versuche.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Hier siehst du wie viele Versuche du hast. In einem bewerteten Quiz hast du nur
				einen, sonst kannst du es unbegrenzt versuchen.
			</p>
		</>,
		<>
			<Image src={"levels/level1/quiz_status.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Rechts wird dir angezeigt ob du diese Frage schon gelöst hast und wenn ja ob deine
				Antwort richtig oder falsch war.
			</p>
		</>,
		<>
			<Image src={"levels/level1/quiz_hint.png"} fluid rounded className="d-flex" />
			<br />
			<p className="centerBox">
				Beachte die Hinweise wie viele Antworten richtig sein können!
			</p>
		</>,
		<>
			<Image src={"levels/level1/quiz_repeat.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Du bist doch noch nicht so sicher ob du alles verstanden hast? Kein Problem, geh
				kurz zur Theorie und lies sie dir nochmal durch.
			</p>
		</>,
		<>
			<Image src={"levels/level1/quiz_weiter.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Wenn du auf &quot;Weiter&quot; klickst kommst du zur nächsten Aufgabe. Das geht
				allerdings erst nachdem du alle Fragen beantwortet hast!
			</p>
		</>
	]
};

export default config;
