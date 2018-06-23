import React from "react";
import "../styles/css/main.css";
import {Grid, Row, Col} from "react-bootstrap";
import heroImg from "../assets/img/interview.png";

class Home extends React.Component {
	render() {
		return (
			<main className="main-section">
				<Grid>
					<Row>
						<Col xs={8} xsOffset={2}>
							<h1 className="page-title">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit
							</h1>
						</Col>
						<Col xs={12}>
							<img className="hero-img" src={heroImg} alt="Interview" />{" "}
						</Col>
					</Row>
				</Grid>
			</main>
		);
	}
}

export default Home;
