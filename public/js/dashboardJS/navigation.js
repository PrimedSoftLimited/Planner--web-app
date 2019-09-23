import { search } from './search.js';
export const { token } = JSON.parse(localStorage.getItem("userData"));

let project = false;

const UI = ((project) => {

	all(".search-tab").forEach(tab => tab.addEventListener("focus", function () {
		search.react(this);
		search.search(this);
	})
	);

	if (project) {
		_(`[data-project='project-true']`).dataset.id = 'project';
	} else {
		_(`[data-project='project-false']`).dataset.id = 'project';
	}

	all(".nav-tab-link").forEach(link => {
		link.addEventListener("click", () => {

			all("[data-nav-controlled]").forEach(tab => {
				if (tab.dataset.id !== link.dataset.id) {
					tab.classList.remove("active", "show");
				} else {
					tab.classList.add("active", "show");
				}
			});
		});
	});

	_("#project-info").addEventListener("click", () => {
		_("#main-aside").classList.toggle("show");

		// _("#main-aside").innerHTML = `
		// 	`;
	});

	all(".get-about-project-details").forEach(btn => {
		btn.addEventListener('click', e => {
			e.preventDefault();

			all(".about-project-details").forEach(detail => {
				if (detail.dataset.projectDetail !== btn.dataset.projectDetail) {
					detail.classList.remove("show");
				} else {
					detail.classList.toggle("show");
				}
			});
		});
	});
})(project);
