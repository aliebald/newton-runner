import React from "react";
import { TheoryConfig } from "../../components/Theory";
import { Image } from "react-bootstrap";

const config: TheoryConfig = {
	id: "level1GameMechanics1",
	slides: [
		<React.Fragment key={0}>
			<h1 className="centerBox">Level 1 - Erkl&auml;rung Spielmechanik</h1>
			<div className="centerBox slideSubText">
				Hier erkl&auml;ren wir dir, wie die Steuerung des Spiels funktioniert
			</div>
		</React.Fragment>,
		<>
			<Image src={"levels/level1/example_start_boxes.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Die Spieloberfl&auml;che ist in 2 Teile Unterteilt. Den Steuerungsgraphen links und
				die Spielszene rechts.
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
				Oben Rechts wird angezeigt, wie oft du das Level bereits versucht hast.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_graph_bewertung.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Um mehr dar&uuml;ber zu erfahren, wie viele Punkte du hier bekommen kannst, hovere
				&uuml;ber das Feld oben rechts. Es gibt bewertete und unbewertete Aufgaben.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_graph_drag_drop.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Um einen Punkt auf der y-Achse zu verschieben (also nach oben oder unten), klicke
				auf den Punkt ziehe ihn mit gedr&uuml;ckter Maustaste dorthin, wo du ihn hinhaben
				willst. M&ouml;glicherweise passen sich dabei auch andere Punkte an.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_progress_graph.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Nachdem du das Spiel gestartet hast, wird sich der Graph rot einf&auml;rben, damit
				du die Bewegung der Figur nachvollziehen kannst.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_coin.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Sammle die M&uuml;nzen ein, um mehr Punkte zu erhalten. Doch Vorsicht, mit der Zeit
				warten auch gef&auml;hrliche Gegenst&auml;nde auf dich.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_key.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Du schaffst das Level, wenn du unbeschadet den Schl&uuml;ssel einsammelst.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_meter.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Die Distanzen in der Spielwelt kannst du an diesem Ma&szlig;stab hier erkennen.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_controls.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Einige Level sind l&auml;nger als dieses hier und du siehst m&ouml;glicherweise
				nicht alles von deiner Position aus. Um zu sehen was au&szlig;erhalb der Sichtweite
				deiner Figur wartet, kannst du diese Kontrollelemente nutzen.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_start.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Hast du alle Einstellungen vorgenommen, setzt du mit dem Start-Knopf deine Figur in
				Bewegung.
			</div>
		</>,
		<>
			<Image src={"levels/level1/example_progress_game_nochmal.png"} fluid rounded />
			<div className="centerBox slideSubText">
				Merkst du, dass du dich etwas verkalkuliert hast, so kannst du die Aufgabe
				fr&uuml;hzeitig neu starten.
			</div>
		</>
	]
};

export default config;
