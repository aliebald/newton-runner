import React from "react";
import { TheoryConfig } from "../../components/Theory";
import { Image } from "react-bootstrap";

const config: TheoryConfig = {
	slides: [
		<React.Fragment key={0}>
			<h1 className="centerBox">Level 1 - Erklärung Spielmechanik</h1>
			<div className="centerBox slideSubText">
				Hier erklären wir dir wie die Steuerung des Spiels funktioniert
			</div>
		</React.Fragment>,
		<>
			<Image src={"levels/level1/example_start_boxes.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Die Spieloberfläche ist in 2 Teile Unterteilt. Den Steuerungsgraphen links und die
				Spielszene rechts.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_graph_text.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Hier stehen Informationen zum Level. Lies sie dir gut durch, sie helfen dir sicher
				weiter!
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_graph_versuch.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Oben Rechts wird angezeigt wie oft du das Level bereits versucht hast.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_graph_bewertung.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Um mehr darüber zu erfahren, wie viele Punkte du hier bekommen kannst, hovere über
				das Feld oben rechts. Es gibt bewertete und unbewertete Aufgaben.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_graph_drag_drop.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Um einen Punkt auf der y-Achse zu verschieben (also nach oben oder unten), klicke
				auf den Punkt ziehe ihn mit gedrückter Maustaste dorthin, wo du ihn hinhaben willst.
				Möglicherweise passen sich dabei auch andere Punkte an.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_progress_graph.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Nachdem du das Spiel gestartet hast, wird sich der Graph rot einfärben damit du die
				Bewegung der Figur nachvollziehen kannst.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_coin.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Sammle die Münzen ein um mehr Punkte zu erhalten. Doch Vorsicht, mit der Zeit warten
				auch gefährliche Gegenstände auf dich.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_key.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Du schaffst das Level wenn du unbeschadet den Schlüssel einsammelst.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_meter.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Die Distanzen in der Spielwelt kannst du an diesem Maßstab hier erkennen.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_controls.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Einige Level sind länger als dieses hier und du siehst möglicherweise nicht alles
				von deiner Position aus. Um zu sehen was außerhalb der Sichtweite deiner Figur
				wartet kannst du diese Kontrollelemente nutzen.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_start.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Hast du alle Einstellungen vorgenommen setzt du mit dem Start-Knopf deine Figur in
				Bewegung.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_progress_game_nochmal.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Merkst du dass du dich etwas verkalkuliert hast, so kannst du die Aufgabe frühzeitig
				neu starten.
			</div>
		</>
	]
};

export default config;
