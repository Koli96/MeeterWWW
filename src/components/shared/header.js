import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import "../../styles/css/main.css";
import logo from "../../assets/img/meeter-logo.png";
import {Grid, Nav, Navbar, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {GoogleLogin, GoogleLogout} from "react-google-login";

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
						/>
					</li>
				</Fragment>
			);
		}
	}

	render() {
		return (
			<Fragment>
				<header className="header-section">
					<Grid>
						<Navbar>
							<Navbar.Header>
								<Navbar.Brand>
									<Link to="/">
										<img className="d-flex mx-auto logo" src={logo} alt="" />
									</Link>
								</Navbar.Brand>
								<Navbar.Toggle />
							</Navbar.Header>
							<Navbar.Collapse id="navbarNav">
								<Nav>
									<LinkContainer to="events/list">
										<NavItem>Wydarzenia</NavItem>
									</LinkContainer>
									<LinkContainer to="/account">
										<NavItem>Konto</NavItem>
									</LinkContainer>
									{this.renderUserInfoSection()}
								</Nav>
							</Navbar.Collapse>
						</Navbar>
					</Grid>
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
