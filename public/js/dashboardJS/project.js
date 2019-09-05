const userData = JSON.parse(localStorage.getItem("userData"));
const workspaceId = localStorage.getItem("workspaceId");
const companyId = localStorage.getItem("companyId");
let projectId = 6, projectData, status;
const { token } = userData;
const createProjectUrl = `${api_link}/api/project/${workspaceId}/${companyId}/create`;
const editProjectUrl = `${api_link}/api/project/${projectId}/edit`;
const deleteProjectUrl = `${api_link}/api/project/${projectId}/delete`;

const createProject = e => {
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
			projectData = data;
			({ project: { id: projectId } } = projectData);
			console.log(projectData);
		})
		.catch(error => console.log(error));
}

const editProject = function (e) {
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

	const errorHandler = response => {
		console.log(response);
		status = response.status;
		return response.json();
	}

	fetch(editProjectUrl, {
		method: 'PUT',
		mode: 'cors',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then(response => errorHandler(response))
		.then(data => {
			projectData = data;
			console.log(projectData);
		})
		.catch(error => console.log(error));
}

const deleteProject = e => {
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

_("#btn-create-project").addEventListener("click", createProject);
_("#btnEditProjectName").addEventListener("click", editProject);
_("#btnEditProjectPurpose").addEventListener("click", editProject);
_("#btnDeleteProject").addEventListener("click", deleteProject);
