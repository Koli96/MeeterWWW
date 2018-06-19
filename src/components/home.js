import React from "react";
import '../styles/css/main.css'
import heroImg from "../assets/img/interview.png";

class Home extends React.Component {
	render() {
		return (
			<main className="main-section">
				<div className="container">
					<div className="row">
						<h1 className="headerText">
							Meeter
						</h1>
						<h2 className="mainText">Bliżej ludzi, bliżej Ciebie!</h2>
						
						<img className="hero-img animateImg" src={heroImg} alt="Interview" />{" "}
						{/*<p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, aspernatur, natus! Aspernatur cum est expedita minima placeat provident reiciendis.</p>*/}
					</div>
				</div>
			</main>
		);
	}
}

export default Home;
