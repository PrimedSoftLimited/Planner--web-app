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
				console.log(url);

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
							let { search_result } = data;
							if (!Array.isArray(search_result) || !search_result.length) return;
							// search_result.map()
						}
					})
					.catch(error => console.log(error.data));
			});
		});
	}
};
