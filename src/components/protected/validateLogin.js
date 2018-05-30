import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

export function checkAuth(WrappedComponent) {
	class AuthShield extends Component {
		componentWillMount() {
			if (!this.props.authed) {
				this.props.history.push("/login");
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

	const mapStateToProps = state => ({
		authed: state.user.authed
	});

	AuthShield.propTypes = {
		authed: PropTypes.bool,
		history: PropTypes.any
	};

	return withRouter(connect(mapStateToProps, null)(AuthShield));
}
