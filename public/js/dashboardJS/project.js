import { token } from './navigation.js';

export const project = {

	// userData: JSON.parse(localStorage.getItem("userData")),
	workspaceId: localStorage.getItem("workspaceId"),
	companyId: localStorage.getItem("companyId"),
	// token: userData.token,

	createProject: e => {
		const createProjectUrl = `${api_link}/api/project/${project.workspaceId}/${project.companyId}/create`;
		console.log("in project");
		e.preventDefault();
		const data = formDataToObject(new FormData(_("#projectForm")));

		fetch(createProjectUrl, {
			method: 'POST',
			mode: 'cors',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				({ project: { id } } = data);
				project.id = id;
				console.log(data);
			})
			.catch(error => console.log(error));
	},

	editProject: function (e) {
		const editProjectUrl = `${api_link}/api/project/${project.id}/edit`;
		console.log("editing project");
		e.preventDefault();
		console.log(editProjectUrl);
		let data;

		if (this.dataset.projectName === "") {
			console.log("editing name");
			data = formDataToObject(new FormData(_("#editProjectNameForm")));

		} else if (this.dataset.projectPurpose === "") {
			console.log("editing purpose");
			data = new FormData(_("#editProjectPurposeForm"));
			data.append("title", "Gestapo");
			data = formDataToObject(data);

		}
		console.log(data);

		fetch(editProjectUrl, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
			})
			.catch(error => console.log(error));
	},

	deleteProject: e => {
		const deleteProjectUrl = `${api_link}/api/project/${project.id}/delete`;
		console.log("deleting project...");
		e.preventDefault();
		console.log(deleteProjectUrl);

		fetch(deleteProjectUrl, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				Authorization: token
			}
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
			})
			.catch(error => console.log(error));
	}
};
