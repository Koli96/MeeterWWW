import axios from "axios";
import {store} from "../store";

const API_URL = "http://65.52.71.32:5000/api";

export function getEventsByCoords(lat, lon) {
	const token = store.getState().user.token;
	if (!token) {
		throw new Error("User is not logged in!");
	}
	return axios({
		method: "get",
		url: `${API_URL}/events`,
		params: {
			coordsx: lat,
			coordsy: lon
		},
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
}

export function addEvent(
	name,
	desc,
	coordsX,
	coordsY,
	activityId,
	radius,
	expiryTime
) {
	const token = store.getState().user.token;
	if (!token) {
		throw new Error("User is not logged in!");
	}
	const payload = {
		name,
		description: desc,
		coordsx: coordsX,
		coordsy: coordsY,
		activityid: activityId,
		radius,
		expirytime: expiryTime
	};
	return axios({
		method: "post",
		url: `${API_URL}/events`,
		headers: {
			Authorization: `Bearer ${token}`
		},
		data: payload
	});
}

export function getActivities() {
	return axios({
		method: "get",
		url: `${API_URL}/activities`
	});
}
