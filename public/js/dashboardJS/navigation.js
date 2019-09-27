import { project } from './project.js';
import { search } from './search.js';
import { workspaces } from './get-workspaces.js';
export const { token } = JSON.parse(localStorage.getItem("userData"));

const multipleWorkspaces = (async () => {
	const { data: userWorkspaces } = await workspaces.getUserWorkspaces();
	console.log(userWorkspaces);
	let { attached_workspaces, workspaces: created_workspaces } = userWorkspaces;
	if (Number(created_workspaces.length) + Number(attached_workspaces.length) <= 1) {
		_("body > main").classList.remove("d-none");
		return;
	}
	const choose_workspacesHTML = _("#choose-workspace").import;
	console.log(choose_workspaceHTML);
	_("body").appendChild(choose_workspaceHTML);
})();

const UI = ((project) => {

	// search component functionality
	all(".search-tab").forEach(tab => tab.addEventListener("focus", function () {
		search.react(this);
		search.search(this);
	})
	);


	// CRUD Project
	_("#btn-create-project").addEventListener("click", project.createProject);
	_("#btnEditProjectName").addEventListener("click", project.editProject);
	_("#btnEditProjectPurpose").addEventListener("click", project.editProject);
	_("#btnDeleteProject").addEventListener("click", project.deleteProject);


	if (true) {
		_(`[data-project='project-true']`).dataset.id = 'project';
	} else {
		_(`[data-project='project-false']`).dataset.id = 'project';
	}


	// sidebar controls
	all(".nav-tab-link").forEach((link, i, links) => {
		link.addEventListener("click", () => {
			links.forEach(link => {
				link.classList.remove("active");
				console.log("WORKS");
			});
			link.classList.add("active");
			all("[data-nav-controlled]").forEach(tab => {
				if (tab.dataset.id !== link.dataset.id) {
					tab.classList.remove("active", "show");
				} else {
					tab.classList.add("active", "show");
				}
			});
		});
	});

	// aside.main controls
	all(".get-about-project-details").forEach(btn => {
		btn.addEventListener('click', function(e) {
			e.preventDefault();

			// toggle dropdown arrow
			this.querySelectorAll('.btn-toggle').forEach(btn => btn.classList.toggle('d-none'));

			all(".about-project-details").forEach(detail => {
				if (detail.dataset.projectDetail !== btn.dataset.projectDetail) {
					detail.classList.remove("show");
				} else {
					detail.classList.toggle("show");
				}
			});
		});
	});

	_("#project-info").addEventListener("click", () => {
		_("#main-aside").classList.toggle("show");

		// _("#main-aside").innerHTML = `
		// 	`;
	});

	_("#btn-close-aside").addEventListener("click", () => {
		_("#main-aside").classList.toggle("show");

	});


})(project);
