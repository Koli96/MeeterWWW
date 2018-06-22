import * as userActions from "../actions/userActions";
import {Cookies} from "react-cookie";

const getInitialState = () => {
	return {
		authed: false,
		request: false,
		userName: null,
		token: null,
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
				token: action.token,
				code: action.code,
				message: null
			};
		}
		// case userActions.REGISTRED: {
		// 	return {
		// 		...state,
		// 		authed: true,
		// 		request: false,
		// 		userName: action.userName,
		// 		code: action.code,
		// 		message: null
		// 	};
		// }
		case userActions.LOGIN_REQUEST: {
			return {
				...state,
				authed: false,
				message: null,
				userName: null,
				token: null,
				code: 0,
				request: true
			};
		}
		// case userActions.REGISTER_REQUEST: {
		// 	return {
		// 		...state,
		// 		authed: false,
		// 		message: null,
		// 		userName: null,
		// 		code: 0,
		// 		request: true
		// 	};
		// }
		case userActions.DISAUTH: {
			const cookies = new Cookies();
			cookies.remove("gloguser");
			cookies.remove("glogtoken");
			return {
				...state,
				code: action.code,
				userName: null,
				token: null,
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
