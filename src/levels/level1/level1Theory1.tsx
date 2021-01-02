import React from "react";
import { TheoryConfig } from "../../components/Theory";
import { Image } from "react-bootstrap";
import MathJax from "react-mathjax";

const config: TheoryConfig = {
	slides: [
		<React.Fragment key={0}>
			<h1 className="centerBox">Level 1 - Theorie 1</h1>
			<br />
			<p className="centerBox">
				Bewegung, das 1. Newtonsche Gesetz und Zeit-Geschwindigkeits-Diagramme
			</p>
		</React.Fragment>,
		<React.Fragment key={1}>
			<h3 className="centerBox">Bewegung</h3>
			<br />
			<p>
				Gleichförmige Bewegung: ein Körper bewegt sich mit konstanter Geschwindigkeit
				vorwärts, er ist immer gleich schnell
			</p>
			<p>
				Beschleunigte Bewegung (nicht gleichförmig): Körper ändert seine Geschwindigkeit, er
				wird schneller oder langsamer
			</p>
		</React.Fragment>,
		<React.Fragment key={2}>
			<h3 className="centerBox">1. Newtonsche Gesetz</h3>
			<br />
			<p>
				Was ist die Ursache einer Bewegung? (Dynamik) Die Ursache einer Bewegung ist immer
				eine Kraft.
			</p>
			<p>
				Massepunkt: Die Geometrie des Körpers wird vernachlässigt. Er wird durch einen
				Massepunkt mit der Masse m des Körpers modelliert. Die Masse ist das einzige
				unveränderliche Attribut eines Körpers.
			</p>
			<p>
				<b>1. Newtonsches Gesetz:</b> In einem Inertialsystem bleibt jeder Körper in Ruhe
				oder im Zustand gleichförmiger Bewegung, auf den keine Kraft wirkt.
			</p>
			<p>(Inertialsystem: Bezugssystem, in dem das 1. Newtonsche Gesetz gilt)</p>
		</React.Fragment>,
		<React.Fragment key={3}>
			<p>
				Wir schauen uns vereinfacht nur eindimensionale Bewegungen an. <br /> Das Objekt
				(dessen Massepunkt) bewegt sich entlang einer Geraden.
			</p>
		</React.Fragment>,
		<React.Fragment key={4}>
			<h3 className="centerBox">Diagramme</h3>
			<br />
			<p>
				In einem Zeit-Geschwindigkeits-Diagramm kann man Geschwindigkeiten anschaulich
				darstellen. Hierbei ist die Zeit auf der Rechtswertachse und die Geschwindigkeit auf
				der Hochwertsachse dargestellt.
			</p>
			<p>
				<u>Hinweis:</u> Bei den Namen eines Diagramms ist die zuerst genannte Achse immer
				die Rechtswertachse (horizontal) und die zweite Achse die Hochwertsache (vertikal).
				(t-v-Diagramm)
			</p>
		</React.Fragment>,
		<Image
			src={"levels/level1/diagramme_2_slide.png"}
			key={5}
			fluid
			rounded
			className="d-block"
		/>
	]
};

export default config;
