import React, { ReactElement } from "react";
import { Container, Row, Col } from "react-bootstrap";

// TODO: Add Game component and Controller component
export default function Quest(props: { text: string }): ReactElement {
	return (
		<Container fluid>
			<Row>
				<Col sm="12" md="6">
					<p>Controller</p>
					<p>text parameter: {props.text}</p>
				</Col>
				<Col sm="12" md="6">
					<p>Game</p>
					<p>text parameter: {props.text}</p>
				</Col>
			</Row>
		</Container>
	);
}
