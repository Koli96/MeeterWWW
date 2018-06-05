import React from "react";

import heroImg from "../assets/img/interview.png";

class Home extends React.Component {
	render() {
		return (
			<main className="main-section">
				<div className="container">
					<div className="row">
						<h1 className="col-10 mx-auto page-title">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit
						</h1>
						<img className="hero-img" src={heroImg} alt="Interview" />{" "}
						{/*<p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, aspernatur, natus! Aspernatur cum est expedita minima placeat provident reiciendis.</p>*/}
					</div>
				</div>
			</main>
		);
	}
}

export default Home;
