import decode from "jwt-decode";

export function loginUser(response) {
	return new Promise((resolve, reject) => {
		try {
			if (response.w3) {
				const exp = decode(response.tokenId).exp;
				resolve({
					code: 100,
					userName: response.w3.U3,
					token: response.accessToken,
					exp
				});
			} else {
				reject({
					code: 401,
					message: "Login failed"
				});
			}
		} catch (e) {
			console.log(e);
			reject({
				code: 402,
				message: e.message
			});
		}
	});
}

// export function registerUser(firstName, lastName, email, password) {
// 	const requestTime = Math.floor(Math.random() * 1000) + 100;
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			//Tutaj trzeba dodać warunek, że if adres e-mail nie istnieje w bazie.
// 			//Trzeba zapytanie dotyczące czy e-mail istnieje
// 			if (password === "test") {
// 				resolve({
// 					code: 100,
// 					userName: "TestUser"
// 				});
// 			} else {
// 				reject({
// 					code: 401,
// 					message: "User registred failed"
// 				});
// 			}
// 		}, requestTime);
// 	});
// }
