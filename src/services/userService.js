// MOCK LOGIN

export function loginUser(response) {
	return new Promise((resolve, reject) => {
		console.log(response);
		if (response.w3 !== undefined) {
			resolve({
				code: 100,
				userName: response.w3.U3
			});
		} else {
			reject({
				code: 401,
				message: "Login failed"
			});
		}
	});
}

export function registerUser(firstName, lastName, email, password) {
	const requestTime = Math.floor(Math.random() * 1000) + 100;
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			//Tutaj trzeba dodać warunek, że if adres e-mail nie istnieje w bazie.
			//Trzeba zapytanie dotyczące czy e-mail istnieje
			if (password === "test") {
				resolve({
					code: 100,
					userName: "TestUser"
				});
			} else {
				reject({
					code: 401,
					message: "User registred failed"
				});
			}
		}, requestTime);
	});
}
