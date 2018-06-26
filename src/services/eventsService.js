import axios from "axios";
import {store} from "../store";

const API_URL = "http://65.52.71.32:5000/api";

// MOCK GetEvents

export function getEvents() {
	const requestTime = Math.floor(Math.random() * 1000) + 100;
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				code: 100,
				events: [
					{
						id: 34,
						name: "test",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid commodi consequuntur cupiditate eos est ex facilis impedit in inventore iste laboriosam molestiae, nemo non possimus, quas rem velit voluptatibus?",
						lng: "52.224990",
						lat: "21.007861",
						owner: {
							id: 2,
							name: "Janusz"
						}
					},
					{
						id: 12,
						name: "test2",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid commodi consequuntur cupiditate eos est ex facilis impedit in inventore iste laboriosam molestiae, nemo non possimus, quas rem velit voluptatibus?",
						lng: "52.224990",
						lat: "21.007861",
						owner: {
							id: 2,
							name: "Janusz"
						}
					}
				]
			});
		}, requestTime);
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
