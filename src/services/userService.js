// MOCK LOGIN

export function loginUser(email, password) {
	const requestTime = Math.floor(Math.random() * 1000) + 100;
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (email === "test@user.com" && password === "pass") {
				resolve({
					code: 100,
					userName: "TestUser"
				});
			} else {
				reject({
					code: 400,
					message: "User does not exist"
				});
			}
		}, requestTime);
	});
}
