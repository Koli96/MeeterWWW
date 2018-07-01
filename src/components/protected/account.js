import React from "react";
import {
	Link
} from 'react-router-dom';
import {
	Col,
	Row
} from "react-bootstrap";
import "../../styles/css/main.css"
import heroImg from "../../assets/img/interview.png"

export default class Account extends React.Component {
	render() {
		return (
			<div>
				<Row >
					<Col sm={6}>
						<img
							className="hero-img animateImg"
							src={heroImg}
							alt="Interview"
						/>
					</Col>
					<Col sm={6}>
						< h3 className="headerText" > Witaj {this.props.userName}</h3 >
						<h4 className="mainText">Wybierz co chcesz zrobić : </h4>
						<Link className="nav-link accountLink" to="/events/add">
							Dodaj wydarzenie
										</Link>
						<Link className="nav-link accountLink" to="/events/list">
							Przeglądaj wydarzenia
										</Link>
					</Col>
				</Row>
			</div>
		);
	}
}
