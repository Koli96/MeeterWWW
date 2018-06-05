import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {connect} from "react-redux";
import Footer from "./shared/footer";
import Home from "./home";
import Account from "./protected/account";
import Dashboard from "./protected/dashboard";
import Login from "./login";
import Register from "./register";
import Header from "./shared/header";
import {checkAuth} from "./protected/validateLogin";
import {logout} from "../actions/userActions";
import AddEvent from "./protected/addEvent";
import EventList from "./protected/eventList";
import EventView from "./protected/eventView";

class App extends Component {
	render() {
		const {authed, userName, logout} = this.props;
		return (
			<Fragment>
				<Router>
					<Header authed={authed} userName={userName} logout={logout}>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/login" component={Login} />
							<Route path="/register" component={Register} />
							<Route path="/dashboard" component={checkAuth(Dashboard)} />
							<Route path="/account" component={checkAuth(Account)} />
							<Route path="/events/add" component={checkAuth(AddEvent)} />
							<Route path="/events/list" component={checkAuth(EventList)} />
							<Route path="/events/list/:id" component={checkAuth(EventView)} />
						</Switch>
					</Header>
				</Router>

				<Footer />
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	authed: state.user.authed,
	userName: state.user.userName
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
	authed: PropTypes.bool.isRequired,
	userName: PropTypes.string,
	logout: PropTypes.func.isRequired
};
