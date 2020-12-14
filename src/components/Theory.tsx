import React, { ReactElement, useState } from "react";
import { Button, Card, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

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
				<p>{text}</p>
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
				<Image src={path} fluid rounded className="d-block" />
			</div>
		);
	}
}

export interface TheoryConfig {
	slides: Array<SlideConfig>;
}

export function Theory(props: { config: TheoryConfig; nextPage: string }): ReactElement {
	const { push } = useHistory();
	return (
		<Container>
			<Col>
				<Row>
					<Carousel interval={null}>
						{props.config.slides.map((c, idx) => Slide({ config: c, idx: idx }))}
					</Carousel>
				</Row>
				<Row className="nextPageButtonRowTheory">
					<Button onClick={() => push(props.nextPage)}>N&auml;chste Aufgabe</Button>
				</Row>
			</Col>
		</Container>
	);
}
