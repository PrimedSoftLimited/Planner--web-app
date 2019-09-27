import { token } from './navigation.js';

export const workspaces = {
	getUserWorkspaces: () => {
		return fetch(`${api_link}/api/workspaces`, {
			method: 'GET',
			headers: {
				Authorization: token
			}
		})
			.then(response => response.json())
			.then(data => {
				return data;
			})
			.catch(error => console.log(error));
	}
};
