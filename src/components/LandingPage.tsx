import React, { ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./../css/style.landingpage.css";

export default function LandingPage(): ReactElement {
	return (
		<div className="landingpage">
			<Container fluid>
				<Row>
					<Col sm className="mt-4 d-flex justify-content-center">
						<Link to="/level1Quiz1" className="mx-auto">
							<button type="submit" className="btnImage">
								<img src="assets/PlatformerAssetsBase/Items/cloud3.png" alt="" />
								<div className="btnImageText">Tutorial&nbsp;&uuml;berspringen</div>
							</button>
						</Link>
					</Col>
					<Col sm className="mt-4 d-flex justify-content-center">
						<Link to="/level1Theory1" className="mx-auto">
							<button type="submit" className="btnImage large">
								<img src="assets/PlatformerAssetsBase/Items/cloud1.png" alt="" />
								<div className="btnImageText large">Jetzt&nbsp;Anfangen</div>
							</button>
						</Link>
					</Col>
					<Col sm className="mt-4 d-flex justify-content-center">
						<Link to="/ExampleQuest1" className="mx-auto">
							<button type="submit" className="btnImage">
								<img src="assets/PlatformerAssetsBase/Items/cloud3.png" alt="" />
								<div className="btnImageText">Bonus&nbsp;level</div>
							</button>
						</Link>
					</Col>
				</Row>
			</Container>
			<div className="landingpageBg">
				<img src="landingPage.png" alt="" className="w-100 pt-5 mb-2" />
			</div>
		</div>
	);
}
