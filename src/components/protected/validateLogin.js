import React, {Component, Fragment} from "react";
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

export function checkAuth(WrappedComponent) {
	class AuthShield extends Component {
		constructor() {
			super();
			this.handleClose = this.handleClose.bind(this);
			this.state = {
				showModal: false
			};
		}

		componentWillMount() {
			if (!this.props.authed) {
				// this.props.history.push("/");
				this.setState({showModal: true});
			}
		}

		handleClose() {
			this.setState({showModal: false});
			this.props.history.push("/");
		}

		render() {
			if (!this.props.authed) {
				return (
					<Fragment>
						<Modal show={this.state.showModal} onHide={this.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Wymagane logowanie</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<p>Aby kontynuować najpierw się zaloguj!</p>
							</Modal.Body>
						</Modal>
					</Fragment>
				);
			} else {
				return <WrappedComponent {...this.props} />;
			}
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
