// MOCK LOGIN

export function getEvents() {
	const requestTime = Math.floor(Math.random() * 1000) + 100;
	return new Promise((resolve, reject) => {
		setTimeout(() => {
				resolve({
					code: 100,
					events: [
						{
							id: 34,
							name: 'test',
							description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid commodi consequuntur cupiditate eos est ex facilis impedit in inventore iste laboriosam molestiae, nemo non possimus, quas rem velit voluptatibus?',
							lng: '52.224990',
							lat: '21.007861',
							owner: {
								id: 2,
								name: 'Janusz'
							}
						},	{
							id: 12,
							name: 'test2',
							description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid commodi consequuntur cupiditate eos est ex facilis impedit in inventore iste laboriosam molestiae, nemo non possimus, quas rem velit voluptatibus?',
							lng: '52.224990',
							lat: '21.007861',
							owner: {
								id: 2,
								name: 'Janusz'
							}
						}
					]
				});
		}, requestTime);
	});
}
