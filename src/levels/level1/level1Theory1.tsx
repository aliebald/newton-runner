import React from "react";
import { TheoryConfig } from "../../components/Theory";
import { Image } from "react-bootstrap";
import MathJax from "react-mathjax";

const config: TheoryConfig = {
	slides: [
		<Image src={"levels/level1/intro_slide_1.jpg"} key={0} fluid rounded className="d-block" />,
		<Image
			src={"levels/level1/bewegung_slide.jpg"}
			key={2}
			fluid
			rounded
			className="d-block"
		/>,
		<Image
			src={"levels/level1/newton_1_slide.jpg"}
			key={3}
			fluid
			rounded
			className="d-block"
		/>,
		<Image
			src={"levels/level1/diagramme_1_slide.jpg"}
			key={4}
			fluid
			rounded
			className="d-block"
		/>,
		<Image
			src={"levels/level1/diagramme_2_slide.png"}
			key={5}
			fluid
			rounded
			className="d-block"
		/>
	]
};

export default config;
