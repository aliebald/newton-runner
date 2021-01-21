import React from "react";
import { TheoryConfig } from "../../components/Theory";

const config: TheoryConfig = {
	slides: [
		<>
			<h1 className="centerBox">BonusLevel: 1. Newtonsches Gesetz</h1>
		</>,
		<>
			<h3 className="centerBox">1. Newtonsches Gesetz</h3>
			<br />
			<p>Die Ursache einer Bewegung ist eine Kraft.</p>
			<p>
				<u>Massepunkt:</u> Die Geometrie des Körpers wird vernachlässigt. Er wird durch
				einen Massepunkt mit der Masse m des Körpers modelliert. Die Masse ist das einzige
				unveränderliche Attribut eines Körpers.
			</p>
			<p>
				<strong>1. Newtonsches Gesetz:</strong> In einem Inertialsystem bleibt jeder Körper
				in Ruhe oder im Zustand gleichförmiger Bewegung, auf den keine Kraft wirkt.
			</p>
			<p>
				<u>Erklärung:</u> Um die Geschwindigkeit eines Körpers zu ändern, muss auf diesen
				eine Kraft wirken. Sonst hat dieser entweder keine oder eine konstante
				Geschwindigkeit.
			</p>
			<p>
				<u>Inertialsystem:</u> Koordinatensystem, in welchem sich ein Körper ohne
				Krafteinwirkung geradlinig und gleichförmig bewegt. Erst wenn eine Kraft auf diesen
				ausgeübt wird, ändert er seine Bewegung.
			</p>
		</>
	]
};

export default config;
