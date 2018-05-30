import React from "react";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			email: "",
			password: "",
			firstName: "",
			lastName: ""
		};
	}

	validateForm() {
		return Object.values(this.state).every(input => input.length > 0);
	}

	handleChange(event) {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state);
	}

	render() {
		return (
			<section className="login-section">
				<div className="container">
					<div className="row">
						<div className="col-4 mx-auto login-form-container">
							<form onSubmit={this.handleSubmit}>
								<FormGroup controlId="firstName" bsSize="large">
									{" "}
									<ControlLabel>First Name</ControlLabel>
									<FormControl
										autoFocus
										type="text"
										value={this.state.firstName}
										onChange={this.handleChange}
									/>
								</FormGroup>{" "}
								<FormGroup controlId="lastName" bsSize="large">
									{" "}
									<ControlLabel>Last Name</ControlLabel>
									<FormControl
										type="text"
										value={this.state.lastName}
										onChange={this.handleChange}
									/>{" "}
								</FormGroup>
								<FormGroup controlId="email" bsSize="large">
									{" "}
									<ControlLabel>Email</ControlLabel>
									<FormControl
										type="email"
										value={this.state.email}
										onChange={this.handleChange}
									/>{" "}
								</FormGroup>
								<FormGroup controlId="password" bsSize="large">
									{" "}
									<ControlLabel>Password</ControlLabel>
									<FormControl
										value={this.state.password}
										onChange={this.handleChange}
										type="password"
									/>{" "}
								</FormGroup>
								<Button
									className="btn btn-outline-success submit-btn"
									block
									bsSize="large"
									disabled={!this.validateForm()}
									type="submit">
									{" "}
									Login{" "}
								</Button>
							</form>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
