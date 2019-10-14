import { token } from './navigation.js';
import { join } from './join-workspace-company.js';

let joinWorkspaceUrl = `${api_link}/api/workspace/request`;
let joinCompanyUrl = `${api_link}/api/company/request`;

export const search = {
	clear: tab => {
		tab.innerHTML = ``;
	},
	clearAll: searchComponent => {
		searchComponent.querySelector(".con-data-search-react").classList.add("d-none");
		searchComponent.querySelector(".con-data-search-react").classList.remove("d-flex");

		searchComponent.querySelector('.searchTabs').classList.add('d-none');
		searchComponent.querySelectorAll('.tab-search-list').forEach(list => list.innerHTML = ``);
	},
	react: searchComponent => {
		const react = e => {
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
	viewSearchItem: (item, searchComponent) => {
		item.addEventListener('click', function (e) {
			e.preventDefault();

			searchComponent.classList.remove('show');
			search.clearAll(searchComponent);

			if (this.dataset.searchUserClass) {
				let child = new DOMParser().parseFromString(`
					<div class="h-100 w-100">
						<header class="d-flex col-12 px-3 pt-2 border-bottom align-items-center flex-nowrap justify-content-between">
							<button class="btn-return-main-aside plannerr-sm-icon c-pointer" id="">
								<ion-icon name="arrow-dropleft"></ion-icon>
							</button>
							<h4 class="">Plannerr directory</h4>
							<button class="btn-close-aside plannerr-sm-icon c-pointer" id="">
								<ion-icon name="close"></ion-icon>
							</button>
						</header>

						<section class="flow">
							<div class="col-12 m-0 p-0 plannerr-lg-pic">

							</div>
							<div class="col-12 border-bottom info-height">
								<div class="d-flex info-height justify-content-between col-12 p-0 m-0">
									<button class="col-5 my-auto c-pointer border text-center plannerr-btn-dash">Message</button>
									<button class="col-5 my-auto c-pointer border text-center plannerr-btn-dash">Call</button>
								</div>
								<div class="d-flex col-12 px-0 m-0 py-2">
									<span class="plannerr-xbold">${this.querySelector("[data-save-user-name]").dataset.saveUserName}</span>
									<div class="ml-2 online-status align-self-center"></div>
								</div>
							</div>
							<div class="col-12 d-flex py-2 flex-column justify-content-center info-height border-bottom">
								<small class="plannerr-text">
									Display Name
								</small>
								<div class="">
									${this.querySelector("[data-save-user-username]").dataset.saveUserUsername}
								</div>
							</div>
							<div class="col-12 d-flex py-2 flex-column justify-content-center info-height border-bottom">
								<small class="plannerr-text">
									Bio
								</small>
								<div class="">
									Warm
								</div>
							</div>
							<div class="col-12 d-flex py-2 flex-column justify-content-center info-height border-bottom">
								<small class="plannerr-text">
									Company
								</small>
								<div class="">
									SmooVision
								</div>
							</div>
							<div class="col-12 d-flex py-2 flex-column justify-content-center info-height border-bottom">
								<small class="plannerr-text">
									Local Time
								</small>
								<div class="">
									3:45PM
								</div>
							</div>
							<div class="col-12 d-flex py-2 flex-column justify-content-center info-height border-bottom">
								<small class="plannerr-text">
									Email
								</small>
								<div class="">
								${this.querySelector('[data-save-user-email]').dataset.saveUserEmail}
								</div>
							</div>
						</section>
					</div>
					`, 'text/html');
				child = child.body.firstElementChild;

				_("#main-aside .main-content").classList.remove('show', 'active');
				_("#main-aside .content").innerHTML = ``;
				_("#main-aside .content").appendChild(child);
				_("#main-aside").classList.add('show');
				_("#main-aside .content").classList.add('show', 'active');

				child.querySelectorAll(".btn-return-main-aside").forEach(btn => {
					btn.addEventListener("click", e => {
						e.preventDefault();
						_("#main-aside .main-content").classList.add('show', 'active');
						_("#main-aside .content").classList.remove('show', 'active');
					});
				});

				child.querySelectorAll(".btn-close-aside").forEach(btn => {
					btn.addEventListener("click", e => {
						e.preventDefault();
						_("#main-aside").classList.remove("show");

					});
				});

			} else if (this.dataset.searchProjectClass) {
				let child = new DOMParser().parseFromString(`
					<div class="h-100 w-100">
						<header class="d-flex col-12 px-3 pt-2 border-bottom align-items-center flex-nowrap justify-content-between">
							<button class="btn-return-main-aside plannerr-sm-icon c-pointer" id="">
								<ion-icon name="arrow-dropleft"></ion-icon>
							</button>
							<h4 class="">Plannerr directory</h4>
							<button class="btn-close-aside plannerr-sm-icon c-pointer" id="">
								<ion-icon name="close"></ion-icon>
							</button>
						</header>

						<section class="flow">
							<div class="col-12 m-0 p-0 plannerr-lg-pic">
								<ion-icon class="h-100 w-100" name="git-merge"></ion-icon>
							</div>
							<div class="col-12 border-bottom info-height">
								<div class="d-flex col-12 px-0 my-2 py-2">
									<span class="plannerr-xbold">${this.querySelector('[data-save-project-name]').dataset.saveProjectName}</span>
								</div>
								<div class="d-flex info-height justify-content-between col-12 p-0 mx-0 my-2">
									<button class="col-auto my-auto c-pointer border text-center plannerr-btn-dash">Switch to
										workspace</button>
								</div>
							</div>
							<div class="col-12 d-flex py-2 flex-column justify-content-center info-height border-bottom">
								<small class="plannerr-text">
									Tasks assigned
								</small>
								<div class="">
									No tasks assigned
								</div>
							</div>
						</section>
					</div>
				`, 'text/html');
				child = child.body.firstElementChild;

				_("#main-aside .content").innerHTML = ``;
				_("#main-aside .content").appendChild(child);
				_("#main-aside .main-content").classList.remove('show', 'active');
				_("#main-aside").classList.add('show');
				_("#main-aside .content").classList.add('show', 'active');

				child.querySelectorAll(".btn-return-main-aside").forEach(btn => {
					btn.addEventListener("click", e => {
						e.preventDefault();
						_("#main-aside .main-content").classList.add('show', 'active');
						_("#main-aside .content").classList.remove('show', 'active');
					});
				});

				child.querySelectorAll(".btn-close-aside").forEach(btn => {
					btn.addEventListener("click", e => {
						e.preventDefault();
						_("#main-aside").classList.remove("show");

					});
				});

			} else if (this.dataset.searchCompanyClass) {
				let child = new DOMParser().parseFromString(`
					<div class="h-100 w-100">
						<header class="d-flex col-12 px-3 pt-2 border-bottom align-items-center flex-nowrap justify-content-between">
							<button class="btn-return-main-aside plannerr-sm-icon c-pointer" id="">
								<ion-icon name="arrow-dropleft"></ion-icon>
							</button>
							<h4 class="">All directories</h4>
							<button class="btn-close-aside plannerr-sm-icon c-pointer" id="">
								<ion-icon name="close"></ion-icon>
							</button>
						</header>

						<section class="flow">
							<div class="col-12 m-0 p-0 plannerr-lg-pic" style="background-color:${window.getComputedStyle(this.querySelector('img')).getPropertyValue('background-color')};"></div>
							<div class="col-12 border-bottom info-height">
								<div class="d-flex col-12 px-0 my-2 py-2">
									<span class="plannerr-xbold">${this.querySelector('[data-save-company-name]').dataset.saveCompanyName}</span>
								</div>
								<div class="d-flex info-height justify-content-between col-12 p-0 mx-0 my-2">
									<button id="btnJoinCompany" data-save-company-unique-name="${this.querySelector('[data-save-company-unique-name]').dataset.saveCompanyUniqueName}" class="col-auto my-auto c-pointer border text-center plannerr-btn-dash">Join
										Company
									</button>
								</div>
							</div>
							<div class="col-12 d-flex py-2 flex-column justify-content-center info-height border-bottom">
								<small class="plannerr-text">
									Industry
								</small>
								<div class="">
									${this.querySelector('[data-save-company-industry]').dataset.saveCompanyIndustry}
								</div>
							</div>
							<div class="col-12 d-flex py-2 flex-column justify-content-center info-height border-bottom">
								<small class="plannerr-text">
									Email
								</small>
								<div class="">
									example@mail.com
								</div>
							</div>
							<div class="col-12 d-flex py-2 flex-column justify-content-center info-height border-bottom">
								<small class="plannerr-text">
									Telephone
								</small>
								<div class="">
									+234 801 234 5678
								</div>
							</div>
							<div class="col-12 d-flex py-2 flex-column justify-content-center info-height border-bottom">
								<small class="plannerr-text">
									Google Map
								</small>
								<div class="">
									Call Google Maps Api
								</div>
							</div>
						</section>
					</div>
				`, 'text/html');
				child = child.body.firstElementChild;

				_("#main-aside .content").innerHTML = ``;
				_("#main-aside .content").appendChild(child);
				_("#main-aside .main-content").classList.remove('show', 'active');
				_("#main-aside").classList.add('show');
				_("#main-aside .content").classList.add('show', 'active');

				child.querySelectorAll(".btn-return-main-aside").forEach(btn => {
					btn.addEventListener("click", e => {
						e.preventDefault();
						_("#main-aside .main-content").classList.add('show', 'active');
						_("#main-aside .content").classList.remove('show', 'active');
					});
				});

				child.querySelectorAll(".btn-close-aside").forEach(btn => {
					btn.addEventListener("click", e => {
						e.preventDefault();
						_("#main-aside").classList.remove("show");

					});
				});

				child.querySelector('#btnJoinCompany').addEventListener('click', function() {
					let title = _('#btnJoinCompany').dataset.saveCompanyUniqueName;
					let btn = join.request;
					btn.bind(this, {title}, joinCompanyUrl)();
				});

			} else if (this.dataset.searchWorkspaceClass) {
				let child = new DOMParser().parseFromString(`
				<div class="h-100 w-100">
					<header class="d-flex col-12 px-3 pt-2 border-bottom align-items-center flex-nowrap justify-content-between">
						<button class="btn-return-main-aside plannerr-sm-icon c-pointer" id="">
							<ion-icon name="arrow-dropleft"></ion-icon>
						</button>
						<h4 class="">Plannerr directory</h4>
						<button class="btn-close-aside plannerr-sm-icon c-pointer" id="">
							<ion-icon name="close"></ion-icon>
						</button>
					</header>

					<section class="flow pb-5">
						<div class="col-12 m-0 p-0 plannerr-lg-pic" style="background-color:${window.getComputedStyle(this.querySelector('img')).getPropertyValue('background-color')};"></div>
						<div class="col-12 border-bottom info-height">
							<div class="d-flex col-12 px-0 my-2 py-2">
								<span class="plannerr-xbold">${this.querySelector('[data-save-workspace-name]').dataset.saveWorkspaceName}</span>
							</div>
							<div class="d-flex info-height justify-content-between col-12 p-0 mx-0 my-2">
								<button id="btnJoinWorkspace" data-save-workspace-unique-name="${this.querySelector('[data-save-workspace-unique-name]').dataset.saveWorkspaceUniqueName}" class="col-auto my-auto c-pointer border text-center plannerr-btn-dash">Join
									workspace
								</button>
							</div>
						</div>
						<div class="col-12 d-flex py-2 flex-column justify-content-center info-height border-bottom">
							<small class="plannerr-text">
								About
							</small>
							<div class="">
								${this.querySelector('[data-save-workspace-description]').dataset.saveWorkspaceDescription}
							</div>
						</div>
						<div class="col-12 d-flex py-2 flex-column justify-content-center info-height border-bottom">
							<small class="plannerr-text">
								Owner
							</small>
							<div class="d-flex align-items-center">
								<button type="button" class="plannerr-md-pic" aria-label="">
									<img src="" alt="">
								</button>
								<span class="ml-2 plannerr-bold">Sgt. John Nsikak</span>
							</div>
						</div>
					</section>
				</div>
				`, 'text/html');
				child = child.body.firstElementChild;

				_("#main-aside .content").innerHTML = ``;
				_("#main-aside .content").appendChild(child);
				_("#main-aside .main-content").classList.remove('show', 'active');
				_("#main-aside").classList.add('show');
				_("#main-aside .content").classList.add('show', 'active');

				child.querySelectorAll(".btn-return-main-aside").forEach(btn => {
					btn.addEventListener("click", e => {
						e.preventDefault();
						_("#main-aside .main-content").classList.add('show', 'active');
						_("#main-aside .content").classList.remove('show', 'active');
					});
				});

				child.querySelectorAll(".btn-close-aside").forEach(btn => {
					btn.addEventListener("click", e => {
						e.preventDefault();
						_("#main-aside").classList.remove("show");

					});
				});

				child.querySelector('#btnJoinWorkspace').addEventListener('click', () => {
					let title = _('#btnJoinWorkspace').dataset.saveWorkspaceUniqueName;
					let btn = join.request;
					btn.bind(this, {title}, joinWorkspaceUrl)();
				});

			} else {
				console.log("null");
			}
		});
	},
	search: searchComponent => {
		const getJoinData = {
			getData: async function (formData, url) {
				try {
					let response = await axios.post(url, formData, {
						headers: {
							Authorization: token
						}
					});
					let data = await response.data;

					return data;

				} catch (error) {
					console.log(error);
				}
			}
		};

		const submit = function (e) {
			e.preventDefault();

			// empty search results before making new search
			search.clearAll(searchComponent);

			const searchValue = new FormData(this).get("generic");

			const searchTerms = ['u', 'p'];
			console.log("searching");

			searchTerms.map(searchTerm => {

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
								search.clear(searchComponent.querySelector('[data-search-param="Users"] .tab-search-list'));
								search_result.forEach(result => {
									let { name, username, user_image, email } = result;
									searchComponent.querySelector('[data-search-param="Users"] .tab-search-list').innerHTML += `
										<div class="d-flex search-item m-0 align-items-center pl-4 py-2 col-12" data-search-item data-search-user-class="focus">
											<button type="button" class="plannerr-sm-pic" aria-label="">
												<img src="" alt="">
											</button>
											<div class="d-flex col-11">
												<span data-save-user-email="${email}" data-save-user-username="${username}">${username}</span>
												<div class="online-status"></div>
												<span class="pl-1" data-save-user-name="${name}">- ${name}</span>
											</div>
										</div>
									`;
								});

								// call function to mointor for click event that links search item to aside
								if (all("[data-search-user-class]")) {
									all("[data-search-user-class]").forEach(item => {
										search.viewSearchItem(item, searchComponent);
									});
								}
							} else if (message.includes('Project')) {
								search.clear(searchComponent.querySelector('[data-search-param="Project"] .tab-search-list'));
								search_result.forEach(result => {
									let { title, description } = result;
									searchComponent.querySelector('[data-search-param="Project"] .tab-search-list').innerHTML += `
										<div class="d-flex search-item align-items-center m-0 pl-4 py-2 col-12" aria-label="" data-search-item data-search-project-class="focus">
											<ion-icon class="plannerr-sm-icon" name="git-merge"></ion-icon>
											<span class="pl-3" data-save-project-name="${title}">${title}</span>
											<span class="pl-1" data-save-project-description="${description}">- ${description}</span>
										</div>
									`;
								});

								// call function to mointor for click event that links search item to aside
								if (all("[data-search-project-class]")) {
									all("[data-search-project-class]").forEach(item => {
										search.viewSearchItem(item, searchComponent);
									});
								}
							}
						}
					})
					.catch(error => console.log(error));
			});


			// get workspaces and companies
			getJoinData.getData({
				title: searchValue
			}, joinWorkspaceUrl)
				.then(data => {
					if (data.data.success) {
						let { choose_workspace } = data.data;

						search.clear(searchComponent.querySelector('[data-search-param="Workspaces"] .tab-search-list'));
						choose_workspace.forEach(workspace => {
							let { title, description, wallpaper, unique_name } = workspace;
							searchComponent.querySelector('[data-search-param="Workspaces"] .tab-search-list').innerHTML += `
								<div class="d-flex search-item align-items-center m-0 pl-4 py-2 col-12" data-search-item data-search-workspace-class="focus">
									<button type="button" class="plannerr-sm-pic" aria-label="">
										<img src="" alt="" style="background-color:${wallpaper};">
									</button>
									<div class="d-flex col-11">
										<span data-save-workspace-unique-name="${unique_name}" data-save-workspace-name="${title}">${title} - </span>
										<span data-save-workspace-description="${description}">${description}</span>
									</div>
								</div>
								`;
						});

						// call function to mointor for click event that links search item to aside
						if (all("[data-search-workspace-class]")) {
							all("[data-search-workspace-class]").forEach(item => {
								search.viewSearchItem(item, searchComponent);
							});
						}
					}
				})
				.catch(error => console.error(error));

			getJoinData.getData({
				title: searchValue
			}, joinCompanyUrl)
				.then(data => {
					if (data.data.success) {
						let { choose_company } = data.data;

						search.clear(searchComponent.querySelector('[data-search-param="Companies"] .tab-search-list'));
						choose_company.forEach(company => {
							let { title, description, industry, wallpaper, unique_name } = company;
							searchComponent.querySelector('[data-search-param="Companies"] .tab-search-list').innerHTML += `
								<div class="d-flex search-item align-items-center m-0 pl-4 py-2 col-12" data-search-item data-search-company-class="focus">
									<button type="button" class="plannerr-sm-pic" aria-label="">
										<img src="" alt="" style="background-color:${wallpaper};">
									</button>
									<div class="d-flex col-11" data-save-company-industry="${industry}">
										<span data-save-company-unique-name="${unique_name}" data-save-company-name="${title}">${title} - </span>
										<span data-save-company-description="${description}">${description}</span>
									</div>
								</div>
							`;
						});

						// call function to mointor for click event that links search item to aside
						if (all("[data-search-company-class]")) {
							all("[data-search-company-class]").forEach(item => {
								search.viewSearchItem(item, searchComponent);
							});
						}
					}
				})
				.catch(error => console.error(error));
		};

		searchComponent.querySelector('[data-search-field]').addEventListener('focus', e => {
			e.stopImmediatePropagation();
			searchComponent.querySelector(".search-tab-form").addEventListener("submit", submit);
		});


		// searchComponent.querySelector('[data-search-field]').addEventListener('blur', e => {
		// 	e.stopImmediatePropagation();
		// 	searchComponent.querySelector(".search-tab-form").removeEventListener("submit", submit);
		// 	console.log("{REMOVED SUBMIT EVENT}");
		// });
	}
};

