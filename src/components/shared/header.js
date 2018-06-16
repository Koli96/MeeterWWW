import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";

import logo from "../../assets/img/meeter-logo.png";
import ExploreIcon from "../../assets/icons/explore.svg";
import AccountIcon from "../../assets/icons/account.svg";
import {Nav, Navbar, NavItem} from "react-bootstrap";

class Header extends Component {
	renderUserInfoSection() {
		if (!this.props.authed) {
			return (
				<Fragment>
					<li className="nav-item">
						<Link className="nav-link" to="/login">
							Logowanie
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/register">
							Rejestracja
						</Link>
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
						WYLOGUJ
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
									<NavItem>
										<Link className="nav-link" to="/events/list">
											{" "}
											<img src={ExploreIcon} alt="explore" />
										</Link>
									</NavItem>
									<NavItem>
										<Link className="nav-link" to="/account">
											{" "}
											<img src={AccountIcon} alt="account" />
										</Link>
									</NavItem>
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
	history: PropTypes.any
};

export default withRouter(Header);
