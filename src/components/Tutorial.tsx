import React, { ReactElement } from "react";
import { Carousel } from "react-bootstrap";

export default function Tutorial(): ReactElement {
	return (
		<Carousel>
			<Carousel.Item color="black">
				<img className="d-block w-100" src="pergament.jpg" alt="First slide" />
				<Carousel.Caption style={{ top: "40px" }}>
					<h1>Kinematik und Dynamik geradliniger Bewegung</h1>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="d-block w-100" src="pergament.jpg" alt="Second slide" />
				<Carousel.Caption style={{ top: "40px" }}>
					<p>
						Geschwindigkeit: v = zurückgelegter Weg/ dafür benötigte Zeit = delta x/
						delta t
					</p>
					<p>Einheit: [v] = 1m/s = 3,6 km/h</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="d-block w-100" src="pergament.jpg" alt="Third slide" />
				<Carousel.Caption style={{ top: "40px" }}>
					<p>
						Beschleunigung: a = Geschwindigkeitsänderung/ dafür benötigte Zeit = delta
						v/ delta t
					</p>
					<p>Einheit: [a] = 1m/s^2</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}
