import React, {Component} from "react";
import PropTypes from "prop-types";
import {
	Button,
	FormGroup,
	FormControl,
	ControlLabel,
	Alert
} from "react-bootstrap";
import {connect} from "react-redux";
import {login} from "../actions/userActions";

class Login extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			email: "",
			password: "",
			alertVisible: false
		};
	}

	componentWillMount() {
		if (this.props.authed) {
			this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(newProps) {
		if (
			!newProps.authed &&
			newProps.message &&
			newProps.message !== this.props.message
		) {
			this.setState({alertVisible: true});
		} else if (newProps.authed) {
			this.setState({alertVisible: false});
			this.props.history.push("/dashboard");
		}
	}

	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}

	handleChange(event) {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.login(this.state.email, this.state.password);
	}

	render() {
		return (
			<section className="login-section">
				<div className="container">
					<div className="row">
						<div className="col-4 mx-auto login-form-container">
							{this.state.alertVisible && (
								<Alert bsStyle="danger">
									<h3>Wystąpił błąd!</h3>
									<p>{this.props.message}</p>
								</Alert>
							)}
							<form onSubmit={this.handleSubmit}>
								<FormGroup controlId="email" bsSize="large">
									<ControlLabel>Email</ControlLabel>
									<FormControl
										autoFocus
										type="email"
										value={this.state.email}
										onChange={this.handleChange}
									/>
								</FormGroup>
								<FormGroup controlId="password" bsSize="large">
									<ControlLabel>Password</ControlLabel>
									<FormControl
										value={this.state.password}
										onChange={this.handleChange}
										type="password"
									/>
								</FormGroup>
								<Button
									className="btn btn-outline-success submit-btn"
									block
									bsSize="large"
									disabled={!this.validateForm() || this.props.request}
									type="submit">
									{this.props.request ? "Trwa logowanie..." : "Zaloguj"}
								</Button>
							</form>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = state => ({
	authed: state.user.authed,
	userName: state.user.userName,
	request: state.user.request,
	message: state.user.message
});

const mapDispatchToProps = dispatch => ({
	login: (email, password) => login(email, password)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
	login: PropTypes.func.isRequired,
	request: PropTypes.bool.isRequired,
	authed: PropTypes.bool.isRequired,
	message: PropTypes.string,
	userName: PropTypes.string,
	history: PropTypes.any
};
