import React from "react";
import { TheoryConfig } from "../../components/Theory";
import { Image } from "react-bootstrap";

const config: TheoryConfig = {
	slides: [
		<React.Fragment key={0}>
			<h1 className="centerBox">Level 1 - Erklärung Quiz</h1>
			<br />
			<p className="centerBox">
				Bevor wir weitermachen erklären wir dir kurz wie die Quizzes aufgebaut sind.
			</p>
		</React.Fragment>,
		<>
			<Image src={"levels/level1/quiz_versuche.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Hier siehst du wie viele Versuche du hast. In einem bewerteten Quiz hast du nur
				einen. Anderenfalls kannst du die Frage gerne nochmals beantworten bevor du dir die
				Lösung anzeigen lässt.
			</div>
		</>,
		<>
			<Image src={"levels/level1/quiz_status.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Rechts wird dir angezeigt ob du diese Frage schon gelöst hast und wenn ja ob deine
				Antwort richtig oder falsch war.
			</div>
		</>,
		<>
			<Image src={"levels/level1/quiz_hint.png"} fluid rounded className="d-flex" />
			<div className="centerBox slideSubText">
				Beachte die Hinweise wie viele Antworten richtig sein können!
			</div>
		</>,
		<>
			<Image src={"levels/level1/quiz_repeat.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Du bist doch noch nicht so sicher ob du alles verstanden hast? Kein Problem, geh
				kurz zur Theorie und lies sie dir nochmal durch.
			</div>
		</>,
		<>
			<Image src={"levels/level1/quiz_weiter.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Wenn du auf &quot;Weiter&quot; klickst kommst du zur nächsten Aufgabe. Das geht
				allerdings erst nachdem du alle Fragen beantwortet hast!
			</div>
		</>
	]
};

export default config;
