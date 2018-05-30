import * as userActions from "../actions/userActions";

const getInitialState = () => {
	return {
		authed: false,
		request: false,
		userName: null,
		code: 0,
		message: null
	};
};

export const reducer = (state = getInitialState(), action) => {
	switch (action.type) {
		case userActions.LOG_IN: {
			return {
				...state,
				authed: true,
				request: false,
				userName: action.userName,
				code: action.code,
				message: null
			};
		}
		case userActions.LOIGN_REQUEST: {
			return {
				...state,
				authed: false,
				message: null,
				userName: null,
				code: 0,
				request: true
			};
		}
		case userActions.DISAUTH: {
			return {
				...state,
				code: action.code,
				userName: null,
				authed: false,
				message: action.message,
				request: false
			};
		}
		default: {
			return {...state};
		}
	}
};
