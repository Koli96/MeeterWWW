import React from "react";
import _ from "lodash";
import {getEvents} from "../../services/eventsService";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";

class EventList extends React.Component {
	constructor() {
		super();

		this.state = {
			events: [],
			error: "Data fetch error"
		};
	}

	async componentDidMount() {
		try {
			const events = await getEvents();
			this.setState({events: events.events});
		} catch (error) {
			this.setState({error});
			console.log(this.state.error.message);
		}
	}

	renderCards() {
		const toReturn = [];

		_.forEach(this.state.events, event => {
			toReturn.push(
				<Link to={`/events/${event.id}`} key={event.id}>
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">{event.title}</h5>
							<p className="card-text">{event.description}</p>
						</div>
					</div>
				</Link>
			);
		});

		return toReturn;
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					{this.state.events[0] ? (
						<div className="card-columns">{this.renderCards()}</div>
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
