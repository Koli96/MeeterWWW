import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import "../../styles/css/main.css";
import logo from "../../assets/img/meeter-logo.png";
import {Nav, Navbar} from "react-bootstrap";
import {GoogleLogin, GoogleLogout } from "react-google-login";

class Header extends Component {

	renderUserInfoSection() {
		if (!this.props.authed) {
			return (
				<Fragment>
					<li className="nav-item">
						<GoogleLogin
							className="btn btn-success navbar-btn"
							clientId="645131427897-m2ricc1950clmllapou09f15p6o5ctvi.apps.googleusercontent.com"
							buttonText="Zaloguj się z Google"
							onSuccess={this.props.login}
							onFailure={this.props.login}
						/>
					</li>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<Link className="nav-link" to="/account">
						Witaj {this.props.userName}
					</Link>
					<li
						className="nav-item nav-link"
						style={{cursor: "pointer"}}
						onClick={() => {
							this.props.history.push("/");
							this.props.logout();
						}}>
						<GoogleLogout
							className="btn btn-danger navbar-btn"
							buttonText="Logout"
							onLogoutSuccess={this.props.logout}
						></GoogleLogout>
					</li>
				</Fragment>
			);
		}
	}

	render() {
		return (
			<Fragment>
				<header className="header-section">
					<div className="container">
						<Navbar className="navbar navbar-expand-lg navbar-light">
							<Link className="navbar-brand col-4 offset-4" to="/">
								<img className="d-flex mx-auto logo" src={logo} alt="" />
							</Link>

							<Navbar.Collapse
								className="collapse navbar-collapse col-4 justify-content-end"
								id="navbarNav">
								<Nav>
									<li className="nav-item">
										<Link className="nav-link headerLink" to="/events/list">
											Wydarzenia
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link headerLink" to="/account">
											Konto
										</Link>
									</li>
									{this.renderUserInfoSection()}
								</Nav>
							</Navbar.Collapse>
						</Navbar>
					</div>
				</header>
				{this.props.children}
			</Fragment>
		);
	}
}

Header.propTypes = {
	children: PropTypes.node.isRequired,
	authed: PropTypes.bool.isRequired,
	userName: PropTypes.string,
	logout: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired,
	history: PropTypes.any
};

export default withRouter(Header);
