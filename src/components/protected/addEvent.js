import React, {Component} from "react";
import {
	Form,
	FormGroup,
	Col,
	FormControl,
	ControlLabel,
	Row,
	Button,
	Alert
} from "react-bootstrap";
import Slider, {createSliderWithTooltip} from "rc-slider";
import moment from "moment";
import "moment/locale/pl.js";
import DatePicker from "react-datepicker";
import "../../styles/css/main.css"
import "rc-slider/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
import {addEvent} from "../../services/eventsService";
import 'react-datepicker/dist/react-datepicker.css';

const SliderWithTooltip = createSliderWithTooltip(Slider);

export default class AddEvent extends Component {
	constructor() {
		super();

		this.handleChange = this.handleChange.bind(this);
		this.hanldeSliderChange = this.hanldeSliderChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.toggleCal = this.toggleCal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleErrDismiss = this.handleErrDismiss.bind(this);
		this.handleAddDismiss = this.handleAddDismiss.bind(this);

		this.state = {
			name: "",
			desc: "",
			coordsX: 52.22499,
			coordsY: 21.007861,
			activityId: 1,
			radius: 100,
			expiryTime: moment().add(15, "minutes"),
			openCal: false,
			showErrAlert: false,
			showAddAlert: false,
			errorMsg: null,
			added: null
		};
	}

	toggleCal(e) {
		e && e.preventDefault();
		this.setState(prev => ({openCal: !prev.openCal}));
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	hanldeSliderChange(val) {
		this.setState({radius: val});
	}

	handleDateChange(date) {
		this.setState({expiryTime: date});
		this.toggleCal();
	}

	handleErrDismiss() {
		this.setState({errorMsg: null, showErrAlert: false});
	}

	handleAddDismiss() {
		this.setState({showAddAlert: false});
	}

	handleSubmit(e) {
		e && e.preventDefault();
		try {
			const {
				name,
				activityId,
				coordsX,
				coordsY,
				desc,
				expiryTime,
				radius
			} = this.state;
			addEvent(
				name,
				desc,
				coordsX,
				coordsY,
				activityId,
				radius,
				expiryTime.toISOString()
			)
				.then(res => {
					console.log(res);
					this.setState({showAddAlert: true, added: res.data});
					this.setState({
						name: "",
						desc: "",
						coordsX: 52.22499,
						coordsY: 21.007861,
						activityId: 1,
						radius: 0,
						expiryTime: moment().add(15, "minutes")
					});
				})
				.catch(e => {
					this.setState({showErrAlert: true, errorMsg: e.message});
				});
		} catch (e) {
			this.setState({showErrAlert: true, errorMsg: e.message});
		}
	}

	render() {
		return (
			<div className="container">
				<Row>
					<h1 className="headerText">Dodaj wydarzenie</h1>
				</Row>
				<Row style={{marginTop: "2em"}}>
					{this.state.showErrAlert && (
						<Row>
							<Col style={{textAlign: "center"}} sm={12} md={12}>
								<Alert bsStyle="danger" onDismiss={this.handleErrDismiss}>
									<h4>Wystąpił błąd przy dodawaniu!</h4>
									<p>Serwer zwrócił następujący błąd: {this.state.errorMsg}</p>
								</Alert>
							</Col>
						</Row>
					)}
					{this.state.showAddAlert && (
						<Row>
							<Col style={{textAlign: "center"}} sm={12} md={12}>
								<Alert bsStyle="success" onDismiss={this.handleAddDismiss}>
									<h4>Dodano!</h4>
									<p>Dodano wydarzenie: {this.state.added.name}!</p>
								</Alert>
							</Col>
						</Row>
					)}
					<Form horizontal onSubmit={this.handleSubmit}>
						<FormGroup controlId="formName">
							<Col sm={5} componentClass={ControlLabel}>
								Nazwa wydarzenia
							</Col>
							<Col md={3} sm={5}>
								<FormControl
									type="text"
									required
									placeholder="Kawa u Sarumana"
									maxLength="255"
									value={this.state.name}
									name="name"
									onChange={this.handleChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup controlId="formDesc">
							<Col sm={5} componentClass={ControlLabel}>
								Opis wydarzenia
							</Col>
							<Col md={3} sm={5}>
								<FormControl
									required
									componentClass="textarea"
									style={{resize: "none"}}
									rows="4"
									cols="100"
									maxLength="1000"
									placeholder="Fani Władcy Pierścieni spotykają się na kawę"
									value={this.state.desc}
									name="desc"
									onChange={this.handleChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup controlId="formMap">
							<Col sm={5} componentClass={ControlLabel}>
								Wybierz miejsce
							</Col>
							<Col md={3} sm={5}>
								!!!TUTAJ DO DODANIA GOOGLE MAPS!!!
							</Col>
						</FormGroup>
						<FormGroup controlId="formCat">
							<Col sm={5} componentClass={ControlLabel}>
								Kategoria
							</Col>
							<Col md={3} sm={5}>
								<FormControl
									componentClass="select"
									value={this.state.activityId}
									onChange={this.handleChange}
									name="activityId">
									<option value={1}>Opcja test 1</option>
									<option value={2}>Opcja test 2</option>
									<option value={3}>Opcja test 3</option>
								</FormControl>
							</Col>
						</FormGroup>
						<FormGroup controlId="formRadius">
							<Col sm={5} componentClass={ControlLabel}>
								Zasięg wydarzenia (m)
							</Col>
							<Col md={3} sm={5}>
								<SliderWithTooltip
									style={{marginTop: "0.5em"}}
									onChange={this.hanldeSliderChange}
									value={this.state.radius}
									min={100}
									max={10000}
									step={50}
								/>
							</Col>
						</FormGroup>
						<FormGroup controlId="formRadius">
							<Col sm={5} componentClass={ControlLabel}>
								Data końca
							</Col>
							<Col sm={5}>
								<Button onClick={this.toggleCal}>
									{this.state.expiryTime.format("YYYY-MM-DD HH:mm")}
								</Button>
								{this.state.openCal && (
									<DatePicker
										 withPortal
										 inline
										 selected={this.state.expiryTime}
										 onChange={this.handleDateChange}
										 minTime={moment().add(15, "minutes")}
										 maxTime={moment()
										 	.hours(23)
										 	.minutes(45)}
										 minDate={moment()}
										 showTimeSelect
										 
										 timeFormat="HH:mm"
										 timeIntervals={15}
										 dateFormat="LLL"
										 timeCaption="Godzina"
									/>
								)}
							</Col>
						</FormGroup>
						<Row style={{textAlign: "center"}}>
							<Button type="submit" bsStyle="primary">
								Dodaj
							</Button>
						</Row>
					</Form>
				</Row>
			</div>
		);
	}
}
