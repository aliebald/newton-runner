import React from "react";
import { TheoryConfig } from "../../components/Theory";
import { Image } from "react-bootstrap";

const config: TheoryConfig = {
	slides: [
		<React.Fragment key={0}>
			<h1 className="centerBox">Level 1 - Erklärung Spielmechanik</h1>
			<br />
			<p className="centerBox">
				Hier erklären wir dir wie die Steuerung des Spiels funktioniert
			</p>
		</React.Fragment>,
		<>
			<Image src={"levels/level1/example_start_boxes.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Die Spieloberfläche ist in 2 Teile Unterteilt. Den Steuerungsgraphen links und die
				Spielszene rechts.
			</p>
		</>,
		<>
			<Image src={"levels/level1/example_start_graph_text.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Hier stehen Informationen zum Level. Lies sie dir gut durch, sie helfen dir sicher
				weiter!
			</p>
		</>,
		<>
			<Image
				src={"levels/level1/example_start_graph_versuch.png"}
				fluid
				rounded
				className="d-flex"
			/>
			<br />
			<p className="centerBox">
				Oben Rechts wird angezeigt wie oft du das Level bereits versucht hast.
			</p>
		</>,
		<>
			<Image src={"levels/level1/example_start_graph_bewertung.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Um mehr darüber zu erfahren, wie viele Punkte du hier bekommen kannst, hovere über
				das Feld oben rechts. Es gibt bewertete und unbewertete Aufgaben.
			</p>
		</>,
		<>
			<Image src={"levels/level1/example_start_graph_drag_drop.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Um einen Punkt auf der y-Achse zu verschieben (also nach oben oder unten), klicke
				auf den Punkt ziehe ihn mit gedrückter Maustaste dorthin, wo du ihn hinhaben willst.
				Möglicherweise passen sich dabei auch andere Punkte an.
			</p>
		</>,
		<>
			<Image src={"levels/level1/example_progress_graph.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Nachdem du das Spiel gestartet hast, wird sich der Graph rot einfärben damit du die
				Bewegung der Figur nachvollziehen kannst.
			</p>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_player.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Dies ist die Spielfigur welche du über den Graphen bewegst nachdem du auf
				&quot;Start&quot; klickst.
			</p>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_coin.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Sammle die Münzen ein um mehr Punkte zu erhalten. Doch Vorsicht, mit der Zeit warten
				auch gefährliche Gegenstände auf dich.
			</p>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_key.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Du schaffst das Level wenn du unbeschadet den Schlüssel einsammelst.
			</p>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_meter.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Als kleine Hilfestellung für die Steuerung siehst du hier wie lang etwa ein Meter in
				der Spielwelt ist.
			</p>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_controls.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Einige Level sind länger als dieses hier und du siehst möglicherweise nicht alles
				von deiner Position aus. Um zu sehen was außerhalb der Sichtweite deiner Figur
				wartet kannst du diese Kontrollelemente nutzen.
			</p>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_start.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Hast du alle Einstellungen vorgenommen setzt du mit dem Start-Knopf deine Figur in
				Bewegung.
			</p>
		</>,
		<>
			<Image src={"levels/level1/example_start_game_nochmal.png"} fluid rounded />
			<br />
			<p className="centerBox">
				Merkst du frühzeitig dass du dich etwas verkalkuliert hast, so kannst du die Aufgabe
				frühzeitig neu starten.
			</p>
		</>
	]
};

export default config;
