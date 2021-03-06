export const RESPONSE_CODES = Object.freeze({
	OK: 100,
	USER_DOESNT_EXIST: 400,
	USER_CANT_REGISTERD: 401
});

export function checkIfGeolocationIsAvailable() {
	return navigator.geolocation;
}
