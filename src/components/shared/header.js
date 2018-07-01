import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";
import "../../styles/css/main.css";
import logo from "../../assets/img/meeter-logo.png";
import {GoogleLogin, GoogleLogout} from "react-google-login";
import {Grid, Nav, Navbar, NavDropdown} from "react-bootstrap";

class Header extends Component {
	renderUserInfoSection() {
		if (!this.props.authed) {
			return (
				<Fragment>
					<li className="nav-item loginBtnContainer">
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
							className="nav-link loginBtnContainer"
							style={{cursor: "pointer"}}
							onClick={() => {
								this.props.history.push("/");
								this.props.logout();
							}}>
							<GoogleLogout
								className="nav-link loginBtn"
								buttonText="Wyloguj"
								onLogoutSuccess={this.props.logout}
							/>
						</a>
					</li>
					<Navbar.Text>Witaj, {this.props.userName}</Navbar.Text>
				</Fragment>
			);
		}
	}

	render() {
		return (
			<Fragment>
				<header className="header-section">
					<Grid>
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
									<NavDropdown
										title="Wydarzenia"
										id="basic-nav-dropdown"
										className="headerLink dropdown-toggle nav-link">
										<li className="nav-item">
											<Link className="nav-link" to="/events/list">
												Przeglądaj wydarzenia
											</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" to="/events/add">
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
