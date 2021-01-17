import React from "react";
import { TheoryConfig } from "../../components/Theory";
import { Image } from "react-bootstrap";
import MathJax from "react-mathjax";

const config: TheoryConfig = {
	slides: [
		<>
			<h1 className="centerBox">Level 1 - Theorie 1</h1>
			<br />
			<p className="centerBox">Bewegung und Zeit-Orts-Diagramme</p>
		</>,
		<>
			<h3 className="centerBox">Bewegung</h3>
			<br />
			<p>
				Es gibt zwei Arten von Bewegung. Die gleichf&ouml;rmige Bewegung und die
				beschleunigte Bewegung. F&uuml;r beide gibt es jeweils ein Diagramm, um sie zu
				veranschaulichen. Hier in Level 1 wirst du das Zeit-Orts-Diagramm kennenlernen.
				Sp&auml;ter in Level 2 geht es um das Zeit-Geschwindigkeits- Diagramm.
			</p>
		</>,
		<>
			<h3 className="centerBox">Bewegung</h3>
			<br />
			<p>
				Gleichf&ouml;rmige Bewegung: Ein K&ouml;rper bewegt sich mit konstanter
				Geschwindigkeit vorw&auml;rts, er ist immer gleich schnell. F&uuml;r eine
				gleichf&ouml;rmige Bewegung gelten die folgenden Bewegungsgesetze:
			</p>
			<p>
				Zeit-Ort-Gesetz: <MathJax.Node inline formula={"x(t) = v*t + x_0"} />
			</p>
			<p>
				Zeit-Beschleunigung-Gesetz: <MathJax.Node inline formula={"a(t) = 0"} />
			</p>
			<p>
				Zeit-Geschwindigkeit-Gesetz: <MathJax.Node inline formula={"v(t) = v"} />
			</p>
			<p>
				Beschleunigte Bewegung (nicht gleichf&ouml;rmig): Ein K&ouml;rper &auml;ndert seine
				Geschwindigkeit, er wird schneller oder langsamer.
			</p>
		</>,
		<>
			<p>
				Wir schauen uns vereinfacht nur eindimensionale Bewegungen an. Ein Gegenstand (z.B.
				ein Auto) bewegt sich entlang einer Geraden. Zur Vereinfachung betrachten wir den
				Gegenstand als Punkt.
			</p>
		</>,
		<>
			<h3 className="centerBox">Diagramme</h3>
			<br />
			<p>
				In einem Zeit-Orts-Diagramm kann man eine Bewegung anschaulich darstellen. Hierbei
				ist die Zeit auf der Rechtswertachse und der Ort auf der Hochwertsachse dargestellt.
				Die Zeit (engl. Time) wird mit t abgek&uuml;rzt und der Ort wird durch ein x
				dargestellt.
			</p>
			<p>
				<u>Hinweis:</u> Bei dem Namen eines Diagramms ist die zuerst genannte Achse immer
				die Rechtswertachse (horizontal) und die zweite Achse die Hochwertsache (vertikal).
				(t-x-Diagramm)
			</p>
			<p>
				<u>Hinweis:</u> „Knicke“ in einem Zeit-Orts-Diagramm sind in der Realit&auml;t nicht
				logisch, da diese eine ruckartige Bewegung (ein abruptes Stehenbleiben aus voller
				Fahrt) bedeuten w&uuml;rden.
			</p>
		</>,
		<>
			<p>
				<u>Beispiel:</u> Ein Ball rollt mit konstanter Geschwindigkeit in 2s 8m weit. Dort
				bleibt er 1s liegen und rollt dann mit doppelter Geschwindigkeit wieder zur&uuml;ck.
			</p>
			<Image src={"levels/level1/zeit-ort1.png"} fluid rounded />
		</>
	]
};

export default config;
