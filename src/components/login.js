import React, {Component} from "react";
import PropTypes from "prop-types";
import {Alert} from "react-bootstrap";
import {connect} from "react-redux";
import {login} from "../actions/userActions";
import GoogleLogin from "react-google-login";

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
							<GoogleLogin
								className="btn btn-success"
								clientId="645131427897-m2ricc1950clmllapou09f15p6o5ctvi.apps.googleusercontent.com"
								buttonText="Zaloguj się z Google"
								onSuccess={this.props.login}
								onFailure={this.props.login}
							/>
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
	login: response => login(response)(dispatch)
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
