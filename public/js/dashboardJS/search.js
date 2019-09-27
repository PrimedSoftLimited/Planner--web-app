import { token } from './navigation.js';

export const search = {
	react: searchComponent => {
		console.log(token);
		searchComponent.querySelector("[data-search-field]").addEventListener("keyup", e => {
			let elem = e.srcElement || e.target;
			if (elem.value === "") {
				searchComponent.querySelector(".con-data-search-react").classList.add("d-none");
				searchComponent.querySelector(".con-data-search-react").classList.remove("d-flex");
			} else {
				searchComponent.querySelector(".con-data-search-react").classList.add("d-flex");
				searchComponent.querySelector("[data-search-react]").textContent = elem.value;
			}
		});
	},
	search: searchComponent => {
		searchComponent.querySelector(".search-tab-form").addEventListener("submit", function (e) {
			e.preventDefault();

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

							// matches search response with appropriate populating HTML
							_('#searchTabs').classList.remove('d-none');
							if (message.includes('Users')) {
								search_result.forEach(result => {
									let { name, username, user_image } = result;
									_('#nav-search-users .tab-search-list').innerHTML += `
										<div class="d-flex search-item m-0 align-items-center pl-4 py-2 col-12">
											<button class="plannerr-sm-pic" aria-label="">
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
								search_result.forEach(result => {
									let { name, username, user_image } = result;
									_('#nav-search-companies .tab-search-list').innerHTML += `
											<div class="d-flex search-item align-items-center m-0 pl-4 py-2 col-12">
											<button class="plannerr-sm-pic" aria-label="">
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
								search_result.forEach(result => {
									let { name, username, user_image } = result;
									_('#nav-search-workspaces .tab-search-list').innerHTML += `
										<div class="d-flex search-item align-items-center m-0 pl-4 py-2 col-12">
											<button class="plannerr-sm-pic" aria-label="">
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
								search_result.forEach(result => {
									let { title, description } = result;
									_('#nav-search-projects .tab-search-list').innerHTML += `
										<div class="d-flex search-item align-items-center m-0 pl-4 py-2 col-12" aria-label="">
											<ion-icon class="plannerr-sm-pic" name="git-merge"></ion-icon>
											<span class=col-11>${title}</span>
											<span class="pl-1">- ${description}</span>
										</div>
									`;
								});
							}
						}
					})
					.catch(error => console.log(error.data));
			});
		});
	}
};
