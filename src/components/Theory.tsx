import React, { ReactElement } from "react";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MathJax from "react-mathjax";

export function Slide(props: { element: JSX.Element; idx: number }): ReactElement {
	return (
		<Carousel.Item className="carouselSlide" key={props.idx.toString()}>
			<MathJax.Provider>
				<div className="carouselSlideBox">
					<p>{props.element}</p>
				</div>
			</MathJax.Provider>
		</Carousel.Item>
	);
}

export interface TheoryConfig {
	slides: Array<JSX.Element>;
}

export function Theory(props: { config: TheoryConfig; nextPage: string }): ReactElement {
	const { push } = useHistory();
	return (
		<Container>
			<Carousel interval={null} wrap={false}>
				{props.config.slides.map((c, idx) => Slide({ element: c, idx: idx }))}
				{Slide({
					element: (
						<>
							<Row className="justify-content-center">
								<p className="text-center">
									Alles verstanden? <br /> Dann teste dein neu erworbenes Wissen
									doch gleich in einem Quiz <br />
									oder nimm dir nochmal Zeit und lies in Ruhe alles durch.
								</p>
							</Row>
							<Row className="justify-content-center">
								<Button
									className="mr-1"
									variant="primary"
									onClick={() => push(props.nextPage)}
								>
									Zum Quiz
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
