import { token } from './navigation.js';

export const search = {
	clear: tab => {
		tab.innerHTML = ``;
	},
	clearAll: searchComponent => {
		console.log('cleared!');
		searchComponent.querySelector(".con-data-search-react").classList.add("d-none");
		searchComponent.querySelector(".con-data-search-react").classList.remove("d-flex");

		searchComponent.querySelector('.searchTabs').classList.add('d-none');
		searchComponent.querySelectorAll('.tab-search-list').forEach(list => list.innerHTML = ``);
	},
	react: searchComponent => {
		const react = function (e) {
			e.stopImmediatePropagation();
			let elem = e.srcElement || e.target;
			if (elem.value === "") {
				searchComponent.querySelector(".con-data-search-react").classList.add("d-none");
				searchComponent.querySelector(".con-data-search-react").classList.remove("d-flex");
			} else {
				searchComponent.querySelector(".con-data-search-react").classList.remove("d-none");
				searchComponent.querySelector(".con-data-search-react").classList.add("d-flex");
				searchComponent.querySelector("[data-search-react]").textContent = elem.value;
			}
		};
		searchComponent.querySelector("[data-search-field]").addEventListener("keyup", react);
	},
	search: searchComponent => {
		const submit = function (e) {
			e.preventDefault();

			// empty search results before making new search
			search.clearAll(searchComponent);

			console.log("searching...");
			const searchValue = new FormData(this).get("generic");

			const searchTerms = ['u', 'w', 'p', 'c'];

			searchTerms.forEach(searchTerm => {

				const params = new URLSearchParams([['t', searchTerm], ['q', searchValue]]);
				const url = `${api_link}/api/search?${params}`;

				fetch(url, {
					method: 'GET',
					headers: {
						Authorization: token
					}
				})
					.then(response => response.json())
					.then(data => {
						if (data.success) {
							console.log(data);

							let { message, search_result } = data;

							// if no search result, do nothing
							if (!Array.isArray(search_result) || !search_result.length) return;

							// remove search button
							searchComponent.querySelector(".con-data-search-react").classList.add("d-none");
							searchComponent.querySelector(".con-data-search-react").classList.remove("d-flex");

							// matches search response with appropriate populating HTML
							searchComponent.querySelector('.searchTabs').classList.remove('d-none');
							if (message.includes('Users')) {
								alert('waow');
								search.clear(searchComponent.querySelector('[data-search-param="Users"] .tab-search-list'));
								search_result.forEach(result => {
									let { name, username, user_image } = result;
									searchComponent.querySelector('[data-search-param="Users"] .tab-search-list').innerHTML += `
										<div class="d-flex search-item m-0 align-items-center pl-4 py-2 col-12">
											<button type="button" class="plannerr-sm-pic" aria-label="">
												<img src="" alt="">
											</button>
											<div class="d-flex col-11">
												<span>${username}</span>
												<div class="online-status"></div>
												<span class="pl-1">- ${name}</span>
											</div>
										</div>
									`;
								});
							} else if (message.includes('Company')) {
								search.clear(searchComponent.querySelector('[data-search-param="Companies"] .tab-search-list'));
								search_result.forEach(result => {
									let { name, username, user_image } = result;
									searchComponent.querySelector('[data-search-param="Companies"] .tab-search-list').innerHTML += `
											<div class="d-flex search-item align-items-center m-0 pl-4 py-2 col-12">
											<button type="button" class="plannerr-sm-pic" aria-label="">
												<img src="" alt="">
											</button>
											<div class="d-flex col-11">
												<span>Primedsoft LLC - </span>
												<span>IT Hub</span>
											</div>
										</div>
									`;
								});
							} else if (message.includes('Workspace')) {
								search.clear(searchComponent.querySelector('[data-search-param="Workspaces"] .tab-search-list'));
								search_result.forEach(result => {
									let { name, username, user_image } = result;
									searchComponent.querySelector('[data-search-param="Workspaces"] .tab-search-list').innerHTML += `
										<div class="d-flex search-item align-items-center m-0 pl-4 py-2 col-12">
											<button type="button" class="plannerr-sm-pic" aria-label="">
												<img src="" alt="">
											</button>
											<div class="d-flex col-11">
												<span>Apache - </span>
												<span>This is it!</span>
											</div>
										</div>
									`;
								});
							} else if (message.includes('Project')) {
								search.clear(searchComponent.querySelector('[data-search-param="Project"] .tab-search-list'));
								search_result.forEach(result => {
									let { title, description } = result;
									searchComponent.querySelector('[data-search-param="Project"] .tab-search-list').innerHTML += `
										<div class="d-flex search-item align-items-center m-0 pl-4 py-2 col-12" aria-label="">
											<ion-icon class="plannerr-sm-icon" name="git-merge"></ion-icon>
											<span class="pl-3">${title}</span>
											<span class="pl-1">- ${description}</span>
										</div>
									`;
								});
							}
						}
					})
					.catch(error => console.log(error));
			});
		};
		searchComponent.querySelector('[data-search-field]').addEventListener('focus', e => {
			e.stopImmediatePropagation();
			searchComponent.querySelector(".search-tab-form").addEventListener("submit", submit);
			console.log("{ADDED SUBMIT EVENT}");
		});

		// searchComponent.querySelector('[data-search-field]').addEventListener('blur', e => {
		// 	e.stopImmediatePropagation();
		// 	searchComponent.querySelector(".search-tab-form").removeEventListener("submit", submit);
		// 	console.log("{REMOVED SUBMIT EVENT}");
		// });
	}
};
