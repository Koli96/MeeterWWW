import {loginUser} from "../services/userService";
import {RESPONSE_CODES} from "../common";

export const LOG_IN = "log-in";
export const LOIGN_REQUEST = "login-request";
export const DISAUTH = "disauth";

export function login(email, password) {
	return async dispatch => {
		dispatch({type: LOIGN_REQUEST});
		try {
			const data = await loginUser(email, password);
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
