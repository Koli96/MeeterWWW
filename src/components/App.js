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

// export function PrivateRoute({component: Component, authed, ...rest}) {
// 	return (
// 		<Route
// 			{...rest}
// 			render={props =>
// 				authed === true ? (
// 					<Component {...props} />
// 				) : (
// 					<Redirect to={{pathname: "/login", state: {from: props.location}}} />
// 				)
// 			}
// 		/>
// 	);
// }

// export function PublicRoute({component: Component, authed, ...rest}) {
// 	console.log("PublicRoute", authed);
// 	return (
// 		<Route
// 			{...rest}
// 			render={props =>
// 				authed === false ? (
// 					<Component {...props} authed={authed} />
// 				) : (
// 					<Redirect to="/dashboard" />
// 				)
// 			}
// 		/>
// 	);
// }

class App extends Component {
	render() {
		const {authed, userName} = this.props;
		return (
			<Fragment>
				<Router>
					<Header authed={authed} userName={userName}>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/login" component={Login} />
							<Route path="/register" component={Register} />
							<Route path="/dashboard" component={checkAuth(Dashboard)} />
							<Route path="/account" component={checkAuth(Account)} />
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

export default connect(mapStateToProps, null)(App);

App.propTypes = {
	authed: PropTypes.bool,
	userName: PropTypes.string
};
