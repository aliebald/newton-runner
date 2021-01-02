import React, { ReactElement } from "react";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MathJax from "react-mathjax";

export function Slide(props: { element: JSX.Element; idx: number }): ReactElement {
	return (
		<Carousel.Item className="carouselSlide" key={props.idx.toString()}>
			<MathJax.Provider>
				<div className="carouselSlideBox">
					<div>{props.element}</div>
				</div>
			</MathJax.Provider>
		</Carousel.Item>
	);
}

export interface TheoryConfig {
	slides: Array<JSX.Element>;
}

export function Theory(props: {
	config: TheoryConfig;
	nextPage: string;
	isStory?: boolean;
}): ReactElement {
	const { push } = useHistory();
	const buttonText = props.isStory ? "Auf gehts!" : "Zum Quiz";
	const lastSlideText = props.isStory ? (
		<p className="text-center">
			Bis du schon gespannt was dich erwartet? <br /> Klicke den Button um zu entdecken wie es
			weiter geht.
		</p>
	) : (
		<p className="text-center">
			Alles verstanden? <br /> Dann teste dein neu erworbenes Wissen doch gleich in einem Quiz{" "}
			<br />
			oder nimm dir nochmal Zeit und lies in Ruhe alles durch.
		</p>
	);

	return (
		<Container>
			<Carousel interval={null} wrap={false}>
				{props.config.slides.map((c, idx) => Slide({ element: c, idx: idx }))}
				{Slide({
					element: (
						<>
							<Row className="justify-content-center">{lastSlideText}</Row>
							<Row className="justify-content-center">
								<Button
									className="mr-1"
									variant="primary"
									onClick={() => push(props.nextPage)}
								>
									{buttonText}
								</Button>
							</Row>
						</>
					),
					idx: props.config.slides.length
				})}
			</Carousel>
		</Container>
	);
}
