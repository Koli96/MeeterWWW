import {loginUser} from "../services/userService";
import {registerUser} from "../services/userService";
import {RESPONSE_CODES} from "../common";

export const LOG_IN = "log-in";
export const REGISTRED = "registred";
export const LOGIN_REQUEST = "login-request";
export const REGISTER_REQUEST = "register-request";
export const DISAUTH = "disauth";
export function register(firstName,lastName,email,password) {
	return async dispatch => {
		dispatch({type: REGISTER_REQUEST});
		try {
			const data = await registerUser(firstName,lastName,email,password);
			if (data.code === RESPONSE_CODES.OK) {
				dispatch({type: REGISTRED, userName: data.userName, code: data.code});
			} else {
				dispatch({type: DISAUTH, code: data.code, message: data.message});
			}
		} catch (e) {
			dispatch({
				type: DISAUTH,
				code: e.code ? e.code : 500,
				message: e.message ? e.message : "error"
			});
		}
	};
}
export function login(response) {
	return async dispatch => {
		dispatch({type: LOGIN_REQUEST});
		try {
			const data = await loginUser(response);
			if (data.code === RESPONSE_CODES.OK) {
				dispatch({type: LOG_IN, userName: data.userName, code: data.code});
			} else {
				dispatch({type: DISAUTH, code: data.code, message: data.message});
			}
		} catch (e) {
			dispatch({
				type: DISAUTH,
				code: e.code ? e.code : 500,
				message: e.message ? e.message : "error"
			});
		}
	};
}

export const logout = () => ({type: DISAUTH, code: 0, message: null});
