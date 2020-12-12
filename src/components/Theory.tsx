import React, { ReactElement, useState } from "react";
import { Card, Carousel, Col, Container, Image } from "react-bootstrap";

export interface SlideConfig {
	imgPath?: string;
	text?: string;
}

export function Slide(props: { config: SlideConfig; idx: number }): ReactElement {
	const [optionalCaptionBody] = useState(getOptionalCaption(props.config.text));
	const [optionalImage] = useState(getOptionalImage(props.config.imgPath));

	return (
		<Carousel.Item className="carouselSlide" key={props.idx.toString()}>
			{optionalImage}
			{optionalCaptionBody}
		</Carousel.Item>
	);
}

function getOptionalCaption(text: string | undefined): ReactElement {
	if (text === undefined) {
		return <></>;
	} else {
		return (
			<div className="carouselSlideTextBox">
				<p className="p-2">{text}</p>
			</div>
		);
	}
}

function getOptionalImage(path: string | undefined): ReactElement {
	if (path === undefined) {
		return <></>;
	} else {
		return (
			<div className="carouselSlideImageBox">
				<Image src={path} fluid rounded className="d-block w-100" />
			</div>
		);
	}
}

export interface TheoryConfig {
	slides: Array<SlideConfig>;
}

export function Theory(props: { config: TheoryConfig }): ReactElement {
	return (
		<Container className="theoryContainer">
			<Col>
				<Carousel interval={null}>
					{props.config.slides.map((c, idx) => Slide({ config: c, idx: idx }))}
				</Carousel>
			</Col>
		</Container>
	);
}
