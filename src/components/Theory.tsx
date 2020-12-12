import React, { ReactElement, useState } from "react";
import { Card, Carousel, Container, Image } from "react-bootstrap";

export interface SlideConfig {
	imgPath?: string;
	text?: string;
}

export function Slide(props: { config: SlideConfig; idx: number }): ReactElement {
	const [optionalCaptionBody] = useState(getOptionalCaption(props.config.text));
	const [optionalImage] = useState(getOptionalImage(props.config.imgPath));

	return (
		<Carousel.Item key={props.idx.toString()}>
			<Card className="carouselSlideCard justify-content-center">
				<Card.Body className="d-flex align-items-center justify-content-center">
					<div className="carouselSlideTextBox">
						{optionalImage}
						{optionalCaptionBody}
					</div>
				</Card.Body>
			</Card>
		</Carousel.Item>
	);
}

function getOptionalCaption(text: string | undefined): ReactElement {
	if (text === undefined) {
		return <></>;
	} else {
		return <p className="p-2">{text}</p>;
	}
}

function getOptionalImage(path: string | undefined): ReactElement {
	if (path === undefined) {
		return <></>;
	} else {
		return <Image src={path} fluid rounded />;
	}
}

export interface TheoryConfig {
	slides: Array<SlideConfig>;
}

export function Theory(props: { config: TheoryConfig }): ReactElement {
	return (
		<Container>
			<Carousel>
				{props.config.slides.map((c, idx) => Slide({ config: c, idx: idx }))}
			</Carousel>
		</Container>
	);
}
