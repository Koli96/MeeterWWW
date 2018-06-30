import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import "../../styles/css/main.css";
import logo from "../../assets/img/meeter-logo.png";
import { Nav, Navbar, NavDropdown, MenuItem } from "react-bootstrap";
import { GoogleLogin, GoogleLogout } from "react-google-login";

class Header extends Component {

	renderUserInfoSection() {
		if (!this.props.authed) {
			return (
				<Fragment>
					<li className="nav-item">
						<GoogleLogin
							className="nav-link loginBtn"
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

					<li className="nav-item">
						<a
							className="nav-link headerLink"
							style={{ cursor: "pointer" }}
							onClick={() => {
								this.props.history.push("/");
								this.props.logout();
							}}>
							<GoogleLogout
								className="nav-link loginBtn"
								buttonText="Wyloguj"
								onLogoutSuccess={this.props.logout}
							></GoogleLogout>
						</a>
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
						<Navbar inverse collapseOnSelect className="borderNone">
							<Navbar.Header>
								<Navbar.Brand>
									<Link className="navbar-brand col-4 offset-4" to="/">
										<img className="d-flex mx-auto logo" src={logo} alt="" />
									</Link>
								</Navbar.Brand>
								<Navbar.Toggle className="navbarToggle" />
							</Navbar.Header>

							<Navbar.Collapse
								className="collapse navbar-collapse borderNone col-4 justify-content-end"
								id="navbarNav">
								<Nav>
									<NavDropdown  title="Wydarzenia" id="basic-nav-dropdown" 
									className="headerLink dropdown-toggle">
										<li className="nav-item">
											<Link className="nav-link headerLink" to="/events/list">
												Przeglądaj wydarzenia
										</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link headerLink" to="/events/add">
												Dodaj wydarzenie
										</Link>
										</li>
									</NavDropdown>
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
