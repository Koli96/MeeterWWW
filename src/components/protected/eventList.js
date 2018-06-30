import React from "react";
import _ from "lodash";
import {
	Button,
	Modal,
	Form,
	FormGroup,
	Col,
	FormControl,
	ControlLabel
} from "react-bootstrap";
import {getEventsByCoords, getActivities} from "../../services/eventsService";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {checkIfGeolocationIsAvailable} from "../../common";
import axios from "axios";

class EventList extends React.Component {
	constructor() {
		super();

		this.onGetPositionFailure = this.onGetPositionFailure.bind(this);
		this.onGetPositionSuccess = this.onGetPositionSuccess.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getEvents = this.getEvents.bind(this);

		this.state = {
			events: null,
			activities: null,
			error: null,
			showPositionModal: false,
			lat: "",
			lon: ""
		};
	}

	async componentDidMount() {
		try {
			if (checkIfGeolocationIsAvailable()) {
				navigator.geolocation.getCurrentPosition(
					this.onGetPositionSuccess,
					this.onGetPositionFailure
				);
			} else {
				this.onGetPositionFailure();
			}
		} catch (error) {
			this.setState({error: error.message});
		}
	}

	onGetPositionSuccess(position) {
		if (position.coords.latitude && position.coords.longitude) {
			this.setState({
				lat: position.coords.latitude,
				lon: position.coords.longitude
			});
			this.getEvents();
		} else {
			this.onGetPositionFailure();
		}
	}

	getEvents() {
		try {
			axios
				.all([
					getEventsByCoords(this.state.lat, this.state.lon),
					getActivities()
				])
				.then(
					axios.spread((events, activities) => {
						this.setState({events: events.data, activities: activities.data});
					})
				);
		} catch (error) {
			this.setState({error: error.message});
		}
	}

	onGetPositionFailure() {
		this.setState({showPositionModal: true});
	}

	handleSubmit(e) {
		e && e.preventDefault();
		this.setState({showPositionModal: false});
		this.getEvents();
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	renderCards() {
		const toReturn = [];

		_.forEach(this.state.events, event => {
			try {
				const activity = _.find(this.state.activities, activity => {
					return parseInt(activity.id, 10) === parseInt(event.activityid, 10);
				});
				toReturn.push(
					<Link to={`/events/${event.id}`} key={event.id}>
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">{event.name}</h5>
								<p className="card-text">Kategoria: {activity.category}</p>
								<p className="card-text">Typ: {activity.name}</p>
								<p className="card-text">Opis: {event.description}</p>
							</div>
						</div>
					</Link>
				);
			} catch (e) {
				console.log(e);
			}
		});

		return toReturn;
	}

	renderPositionModal() {
		return (
			<Modal show={this.state.showPositionModal} backdrop="static">
				<Modal.Header>
					<Modal.Title>Lokalizacja</Modal.Title>
				</Modal.Header>
				<Form horizontal onSubmit={this.handleSubmit}>
					<Modal.Body>
						<p>
							Twoje urządzenie odmówiło dostępu do lokalizacji, bądź jej nie
							wspiera. Proszę wpisz współrzędne.
						</p>

						{/* !!!TUTAJ TEŻ LEPIEJ GOOGLE MAPS!!! */}

						<FormGroup controlId="formName">
							<Col sm={4} componentClass={ControlLabel}>
								Szerokość:
							</Col>
							<Col md={3} sm={5}>
								<FormControl
									type="text"
									required
									placeholder="52.22499"
									maxLength="8"
									value={this.state.lat}
									name="lat"
									onChange={this.handleChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup controlId="formName">
							<Col sm={4} componentClass={ControlLabel}>
								Długość:
							</Col>
							<Col md={3} sm={5}>
								<FormControl
									type="text"
									required
									placeholder="21.00786"
									maxLength="8"
									value={this.state.lon}
									name="lon"
									onChange={this.handleChange}
								/>
							</Col>
						</FormGroup>
					</Modal.Body>
					<Modal.Footer>
						<Button type="submit">Zapisz</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		);
	}

	render() {
		return (
			<div className="container">
				{this.renderPositionModal()}
				<div className="row">
					{this.state.events ? (
						this.state.events[0] ? (
							<div className="card-columns">{this.renderCards()}</div>
						) : (
							<h3>Nie ma żadnych wydarzeń w pobliżu</h3>
						)
					) : (
						<h3>Pobieram listę wydarzeń...</h3>
					)}
				</div>
			</div>
		);
	}
}

EventList.propTypes = {
	history: PropTypes.any
};

export default withRouter(EventList);
