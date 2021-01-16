import React from "react";
import { TheoryConfig } from "../../components/Theory";
import { Image } from "react-bootstrap";
import MathJax from "react-mathjax";

const config: TheoryConfig = {
	slides: [
		<>
			<h1 className="centerBox">Level 1 - Theorie 1</h1>
			<br />
			<p className="centerBox">
				Bewegung, das 1. Newtonsche Gesetz und Zeit-Geschwindigkeits-Diagramme
			</p>
		</>,
		<>
			<h3 className="centerBox">Bewegung</h3>
			<br />
			<p>
				Gleichf&ouml;rmige Bewegung: ein K&ouml;rper bewegt sich mit konstanter
				Geschwindigkeit vorw&auml;rts, er ist immer gleich schnell
			</p>
			<p>
				Beschleunigte Bewegung (nicht gleichf&ouml;rmig): K&ouml;rper &auml;ndert seine
				Geschwindigkeit, er wird schneller oder langsamer
			</p>
		</>,
		<>
			<h3 className="centerBox">1. Newtonsche Gesetz</h3>
			<br />
			<p>
				Was ist die Ursache einer Bewegung? (Dynamik) Die Ursache einer Bewegung ist immer
				eine Kraft.
			</p>
			<p>
				Massepunkt: Die Geometrie des K&ouml;rpers wird vernachl&auml;ssigt. Er wird durch
				einen Massepunkt mit der Masse m des K&ouml;rpers modelliert. Die Masse ist das
				einzige unver&auml;nderliche Attribut eines K&ouml;rpers.
			</p>
			<p>
				<b>1. Newtonsches Gesetz:</b> In einem Inertialsystem bleibt jeder K&ouml;rper in
				Ruhe oder im Zustand gleichf&ouml;rmiger Bewegung, auf den keine Kraft wirkt.
			</p>
			<p>(Inertialsystem: Bezugssystem, in dem das 1. Newtonsche Gesetz gilt)</p>
		</>,
		<>
			<p>
				Wir schauen uns vereinfacht nur eindimensionale Bewegungen an. <br /> Das Objekt
				(dessen Massepunkt) bewegt sich entlang einer Geraden.
			</p>
		</>,
		<>
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
		</>,
		<>
			<Image src={"levels/level1/diagramme_2_slide.png"} key={5} fluid rounded />
		</>
	]
};

export default config;
