import React from "react";
import { TheoryConfig } from "../../components/Theory";
import { Image } from "react-bootstrap";
import MathJax from "react-mathjax";

const config: TheoryConfig = {
	id: "level2Theory1",
	slides: [
		<>
			<h1 className="centerBox">Level 2 - Theorie 1</h1>
			<br />
			<p className="centerBox">Beschleunigte Bewegung anhand von Diagrammen</p>
		</>,
		<>
			<h3 className="centerBox">Zeit-Orts-Diagramm</h3>
			<p>
				In einem Zeit-Orts-Diagramm kann auch eine Beschleunigung anschaulich dargestellt
				werden. Der Graph ist dann gekr&uuml;mmt. Bei gleichf &ouml;rmiger Beschleunigung
				ist der Graph eine Parabel. Je gr&ouml;&szlig;er die Beschleunigung, desto steiler
				die Parabel. Bei ungleichmä&szlig;iger Beschleunigung ist der Graph weder eine
				Parabel noch eine Gerade.
			</p>
			<Image src={"levels/level2/zeit-ort2.png"} fluid rounded />
		</>,
		<>
			<p>
				In diesem Level wird nicht weiter auf dieses Thema eingegangen, da Geschwindigkeit
				und Beschleunigung anschaulich in einem Zeit-Geschwindigkeits-Diagramm dargestellt
				werden k&ouml;nnen.
			</p>
		</>,
		<>
			<h3 className="centerBox">Diagramme</h3>
			<br />
			<p>
				In einem Zeit-Geschwindigkeits-Diagramm kann man Geschwindigkeiten anschaulich
				darstellen. Hierbei ist die Zeit auf der Rechtswertachse und die Geschwindigkeit auf
				der Hochwertsachse dargestellt. Die Zeit wird wieder mit t abgek&uuml;rzt und die
				Geschwindigkeit (engl. velocity) durch v.
			</p>
			<p>
				<u>Hinweis:</u> Bei dem Namen eines Diagramms ist die zuerst genannte Achse immer
				die Rechtswertachse (horizontal) und die zweite Achse die Hochwertsache (vertikal).
				(t-v-Diagramm)
			</p>
		</>,
		<>
			<p>
				Ein Gegenstand bewegt sich zuerst mit der konstanten Geschwindigkeit{" "}
				<span className="blue">
					<MathJax.Node inline formula={"v_1 = 4 \\frac{m}{s}"} />{" "}
				</span>{" "}
				vorw&auml;rts. Anschlie&szlig;end bleibt er stehen mit der Geschwindigkeit{" "}
				<span className="orange">
					<MathJax.Node inline formula={"v_2 = 0 \\frac{m}{s}"} />
				</span>
				. Danach bewegt er sich mit konstanter Geschwindigkeit von{" "}
				<span className="green">
					<MathJax.Node inline formula={"v_3 = -6 \\frac{m}{s}"} />
				</span>{" "}
				r&uuml;ckw&auml;rts.
			</p>
			<Image src={"levels/level2/zeit-geschwindigkeit1.png"} fluid rounded />
		</>,
		<>
			<p>Das zugeh&ouml;rige Zeit-Orts-Diagramm sieht folgenderma&szlig;en aus:</p>
			<Image src={"levels/level2/zeit-ort3.png"} fluid rounded />
		</>,
		<>
			<p>
				Hier sieht man die &Auml;nderung zwischen den Geschwindigkeiten. Die steigende blaue
				Strecke bedeutet eine Beschleunigung von{" "}
				<MathJax.Node inline formula={"0 \\frac{m}{s}"} /> auf{" "}
				<MathJax.Node inline formula={"4 \\frac{m}{s}"} />. Die fallende rote Strecke
				bedeutet, dass sich die Geschwindigkeit von{" "}
				<MathJax.Node inline formula={"4 \\frac{m}{s}"} /> auf{" "}
				<MathJax.Node inline formula={"0 \\frac{m}{s}"} /> reduziert. Es wird bis zum
				Stillstand abgebremst. Die fallende gr&uuml;ne Strecke zeigt, dass sich die
				Geschwindigkeit von <MathJax.Node inline formula={"0 \\frac{m}{s}"} /> auf{" "}
				<MathJax.Node inline formula={"-6 \\frac{m}{s}"} />
				verringert. Es wird in negativer Richtung, also in einer
				R&uuml;ckw&auml;rtsbewegung, beschleunigt. Die steigende gelbe Strecke zeigt ein
				Abbremsen der R&uuml;ckw&auml;rtsbewegung bis zum Stillstand.
			</p>
			<Image src={"levels/level2/zeit-geschwindigkeit3.png"} fluid rounded />
		</>
	]
};

export default config;
