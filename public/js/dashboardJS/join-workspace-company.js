import { token } from './navigation.js';
export const join = {
	request: async function (data, url) {
		this.disabled = true;
		axios.post(url, data, {
			headers: {
				Authorization: token
			}
		})
			.then(response => {
				if (response.data) {
					console.log(response);
					return Promise.resolve(response);
				}
			})
			.catch(error => {
				console.error(error);
				this.disabled = false;
				return Promise.reject(error);
			});
	}
};

