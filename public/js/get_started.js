// add preloader while activating account
let joinWorkspaceUrl = `${api_link}/api/workspace/request`;
let joinCompanyUrl = `${api_link}/api/company/request`;

const gsjs = true; //constant used to check if module is in file being exported wherever it's in use
const urlParams = new URLSearchParams(window.location.search);
const cToken = urlParams.get('confirm_token') ? urlParams.get('confirm_token') : null;
let createCompanyUrl = "/api/company/create";
createCompanyUrl = `${api_link}${createCompanyUrl}`;
let allInterestUrl = `/api/user/categories`;
allInterestUrl = `${api_link}${allInterestUrl}`;
let submitInterestUrl = "/api/interest/select";
submitInterestUrl = `${api_link}${submitInterestUrl}`;
const activateAccUrl = `${api_link}/api/confirmation/${cToken}`;
let btn, interestBuffer = [], searchBuffer = {}, formData, token, user, url, request, status = "Public";


const helperScript = () => {

	// helper function to set option values corresponding to their textcontent
	all("#industryChooser option").forEach(option => {
		option.value = option.textContent;
	});

	// helper function to switch text for input[type="checkbox"] in create workspace and company form
	const textAccordingToCheckbox = all(".switch-text");

	Array.from(all(".input-switch")).forEach((checkbox, i) => {
		checkbox.addEventListener('click', function () {
			if (this.checked) {
				textAccordingToCheckbox[i].textContent = `${"Private"}`;
				status = "Private";
			} else {
				textAccordingToCheckbox[i].textContent = `${"Public (*Workspace is visible to everyone on search)"}`;
				status = "Public";
			}
		});
	});
};
helperScript();

// do acc. activation i.e confirmation
const activateUserAccount = (() => {
	_(".loader").classList.remove("d-none");
	const config = {
		method: "GET",
		url: activateAccUrl
		// url: "https://randomapi.com/api/006b08a801d82d0c9824dcfdfdfa3b3c"
	};

	axios(config)
		.then(response => {
			if (response.data) {
				let userData = response.data.data;
				localStorage.setItem("userData", JSON.stringify(userData));

				({ token } = userData);
				({ user } = userData);

				_(".loader").classList.add("d-none");
				_("#verification-tab").classList.add("show", "active");
			}
		})
		.catch(error => {
			_(".loader").classList.add("d-none");
			_("#error-tab").classList.add("show", "active");
			_("#verification-tab").classList.remove("show", "active");
			console.log(error);
		});
})();

const submitCreateData = {
	submit: async function (formData, url, removeThisTab, showThisTab) {
		formData = formDataToObject(formData);
		_(".loader").classList.remove("d-none");

		try {
			let response = await axios.post(url, formData, {
				headers: {
					Authorization: token
				}
			});
			let data = await response.data;
			_(".loader").classList.add("d-none");

			if (data) {
				searchBuffer = {};
				removeThisTab.classList.remove("show", "active");
				showThisTab.classList.add("show", "active");
			}
			return data;

		} catch (error) {
			_(".loader").classList.add("d-none");
			this.disabled = false;
			this.classList.remove("grey");
			console.log(error);
			return Promise.reject(error);
		}
	}
};

const getJoinData = {
	getData: async function (formData, url) {
		try {
			if (gsjs) {
				this.nextElementSibling.innerHTML = loader;
			}

			let response = await axios.post(url, formData, {
				headers: {
					Authorization: token
				}
			});
			let data = await response.data;
			if (gsjs) {
				this.nextElementSibling.innerHTML = ``;
			}

			return data;

		} catch (error) {
			if (gsjs) {
				this.nextElementSibling.innerHTML = ``;
			}
			console.log(error);
		}
	}
};

const submitJoinData = {
	submit: async function (formData, url) {
		this.setAttribute('name', 'xx');
		this.innerHTML = loader;
		axios.post(url, formData, {
			headers: {
				Authorization: token
			}
		})
			.then(response => {
				if (response.data) {
					console.log(response);
					this.disabled = true;
					this.setAttribute('name', 'checkmark');
					return Promise.resolve(response);
				}
			})
			.catch(error => {
				this.setAttribute('name', 'paper-plane');
				console.error(error);
				return Promise.reject(error);
			});
	}
};

const loopOutData = (response, parent, searchKey) => {

	let btn, choices, title, unique_name, wallpaper;
	searchBuffer[searchKey] = Object.assign({}, response);

	if (response.data.choose_workspace) {
		choices = response.data.choose_workspace;
		btn = "btn-join-workspace";
		parent.innerHTML = `Workspaces <span id="no-of-workspaces" class="smoll-text"></span>`;
		_("#no-of-workspaces").textContent = `(${choices.length})`;

	} else {
		choices = response.data.choose_company;
		btn = "btn-join-company";
		parent.innerHTML = `Companies <span id="no-of-companies" class="smoll-text"></span>`;
		_("#no-of-companies").textContent = `(${choices.length})`;
	}

	parent.classList.remove("d-none");

	choices.forEach((choice, index) => {

		({ title, unique_name, wallpaper } = choice);

		let child = new DOMParser().parseFromString(`<div data-index="${index}" class="append-join border-top col-12 d-flex m-0">
			<img src="" alt="" class="my-auto append-img">
			<div class="append-title p-0 m-0 my-auto">
				<div class="append-name p-0 ml-1">
					<span>${title}</span>
				</div>
				<span class="smoll-text">${unique_name}</span>
			</div>

			<ion-icon data-store-submit-name="${unique_name}" class="col-1 my-auto ml-auto" name="paper-plane" role="button"></ion-icon>

		</div>`, 'text/html');

		child = child.body.firstElementChild;
		child.querySelector("[data-store-submit-name]").classList.add(btn);
		child.querySelector(".append-img").style.backgroundColor = `${wallpaper}`;

		parent.appendChild(child);
	});

	if (response.data.choose_workspace) {
		all(".btn-join-workspace").forEach(button => {
			button.addEventListener("click", function (e) {
				e.preventDefault();
				let workspaceTitle = this.dataset.storeSubmitName;
				let data = submitJoinData.submit;
				data.bind(this, { title: workspaceTitle }, joinWorkspaceUrl)();
			});
		});
	} else {
		all(".btn-join-company").forEach(button => {
			button.addEventListener("click", function (e) {
				e.preventDefault();
				let companyTitle = this.dataset.storeSubmitName;
				let data = submitJoinData.submit;
				data.bind(this, { title: companyTitle }, joinCompanyUrl)();
			});
		});
	}
};

const getInterests = async () => {
	try {
		_(".loader").classList.remove("d-none");
		let response = await axios.get(allInterestUrl, {
			headers: {
				Authorization: token
			}
		});
		let data = await response.data;
		console.log(data);
		_(".loader").classList.add("d-none");
		return data;

	} catch (error) {
		_(".loader").classList.add("d-none");
		console.log(error);
	}
};

const loadInterestsOntoTab = () => {
	getInterests()
		.then(data => {
			let { categories } = data, index = 0;
			categories.forEach(category => {
				_("#categories").innerHTML += `
					<li class="mx-2 mx-lg-0 p-1 p-lg-0 my-lg-1 pl-lg-2 showfirst">
						<a data-category-id="${category.id}" href="#category${category.id}-tab" data-toggle="tab" aria-controls="category${category.id}-interests" aria-selected="false">
							${category.title}
						</a>
					</li>`;

				_("#interests").innerHTML += `<div id="category${category.id}-tab" data-category-tab data-category-id="${category.id}" class="tab-pane showfirst flex-wrap m-0 p-0 col-12"></div>`;

				// show first tab
				if (index == 0) {
					_("div.showfirst").classList.add("show", "active");
					_("li.showfirst").classList.add("active");
					_("li.showfirst a").setAttribute("aria-selected", "true");
				}

				category.interests.forEach(interest => {
					let node = `<div class="d-flex justify-content-center align-items-center border p-2 m-1" data-category-id="${category.id}" data-interest-id="${interest.id}" data-index="${index}">${interest.title}</div>`;

					_(`#category${category.id}-tab`).innerHTML += node;
					index++;
				});
			});

			all("li.showfirst").forEach((category, index, array) => {
				category.addEventListener('click', () => {

					// remove active state from all category links and give state to clicked
					array.forEach(elem => {
						elem.classList.remove("active");
						console.log(elem.querySelector("a"));
						elem.querySelector("a").setAttribute("aria-selected", "false");
					});
					category.classList.add("active");
					category.querySelector("a").setAttribute("aria-selected", "true");

					// remove active state from all category tabs and give state to clicked
					all("[data-category-tab]").forEach(tab => {
						if (category.querySelector("a").dataset.categoryId !== tab.dataset.categoryId) {
							tab.classList.remove("active", "show");
						} else {
							tab.classList.add("active", "show");
						}
					});
				});
			});

			all(`[data-interest-id]`).forEach(interest => {
				interest.addEventListener("click", function () {

					if (this.classList.contains("clicked")) {
						this.classList.remove("clicked");
						delete interestBuffer[this.dataset.index];

					} else {
						this.classList.add("clicked");
						interestBuffer[this.dataset.index] = [Number(this.dataset.categoryId), Number(this.dataset.interestId)];
					}
				});
			});
		})
		.catch(error => console.log(error));
};

const addInterest = e => {
	e.preventDefault();
	let user_interests = interestBuffer.filter(idArray => idArray instanceof Array);
	console.log(user_interests, token);

	_(".loader").classList.remove("d-none");

	fetch(submitInterestUrl, {
		method: 'POST',
		mode: 'cors',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ user_interests })
	})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			localStorage.setItem("interestData", data);
			_(".loader").classList.add("d-none");
			assignLocation("../dashboard/dashboard.html");
		})
		.catch(error => {
			console.log(error.response);
			_(".loader").classList.add("d-none");
		});
};

const UI = () => {
	_("#btnCreateWorkspace").addEventListener("click", async function (e) {
		e.preventDefault();

		this.disabled = true;
		this.classList.add("grey");
		const workspaceFormData = new FormData(_("#create-workspace-form"));
		const randomHsl = () => `hsla(${Math.floor(Math.random() * 360)}, 100%, 50%, 1)`;
		const wallpaper = randomHsl();
		workspaceFormData.append("status", status);
		workspaceFormData.append("wallpaper", wallpaper);

		let companyId = 0;
		createWorkspaceUrl = `${api_link}/api/workspace/${companyId}/create`;
		let data = submitCreateData.submit;
		data.bind(this, workspaceFormData, createWorkspaceUrl, _("#workspace-tab"), _("#company-tab"))();
		// let { data: { new_workspace: { id: workspaceId } } } = data;
		// localStorage.setItem("workspaceId", workspaceId);
	});

	_("#btnNext").addEventListener("click", e => {
		e.preventDefault();
		searchBuffer = {};
		_("#workspace-tab").classList.remove("show", "active");
		_("#company-tab").classList.add("show", "active");
	});

	_("#btnNext1").addEventListener("click", e => {
		e.preventDefault();
		searchBuffer = {};
		_("#workspace-tab").classList.remove("show", "active");
		_("#company-tab").classList.add("show", "active");
	});

	_("#btnCreateCompany").addEventListener("click", async function (e) {
		e.preventDefault();

		this.disabled = true;
		this.classList.add("grey");
		const companyFormData = new FormData(_("#create-company-form"));
		const randomHsl = () => `hsla(${Math.floor(Math.random() * 360)}, 100%, 50%, 1)`;
		const wallpaper = randomHsl();
		companyFormData.append("status", status);
		companyFormData.append("wallpaper", wallpaper);

		let data = submitCreateData.submit;
		data.bind(this, companyFormData, createCompanyUrl, _("#company-tab"), _("#interest-tab"))();
		loadInterestsOntoTab();
	});

	_("#join-workspace-input-field").addEventListener("keyup", function (e) {
		e.preventDefault();
		// check if user input is a letter i.e valid search
		if (!(/6[5-9]|[7-8][0-9]|90/.test(e.keyCode))) return;
		formData = new FormData(_("#join-workspace-form"));
		let searchKey = formData.get('title').substr(0, 1);
		console.log(searchKey);

		if (searchBuffer.hasOwnProperty(searchKey)) {
			loopOutData(searchBuffer[searchKey], _("#workspace-appendage"), searchKey);
		} else {
			formData.set("title", searchKey);
			formData = formDataToObject(formData);
			let data = getJoinData.getData;
			data.bind(this, formData, joinWorkspaceUrl)()
				.then(response => loopOutData(response, _("#workspace-appendage"), searchKey))
				.catch(error => console.log(error));
		}
	});

	_("#join-company-input-field").addEventListener("keyup", function (e) {
		e.preventDefault();
		// check if user input is a letter i.e valid search
		if (!(/6[5-9]|[7-8][0-9]|90/.test(e.keyCode))) return;
		formData = new FormData(_("#join-company-form"));
		let searchKey = formData.get('title').substr(0, 1);

		if (searchBuffer.hasOwnProperty(searchKey)) {
			loopOutData(searchBuffer[searchKey], _("#company-appendage"), searchKey);
		} else {
			formData.set("title", searchKey);
			formData = formDataToObject(formData);

			let data = getJoinData.getData;
			data.bind(this, formData, joinCompanyUrl)()
				.then(response => loopOutData(response, _("#company-appendage"), searchKey))
				.catch(error => console.log(error));
		}
	});

	_("#btnNext2").addEventListener("click", e => {
		e.preventDefault();
		_("#company-tab").classList.remove("show", "active");
		_("#interest-tab").classList.add("show", "active");
		loadInterestsOntoTab();
	});

	_("#btnNext3").addEventListener("click", e => {
		e.preventDefault();
		_("#company-tab").classList.remove("show", "active");
		_("#interest-tab").classList.add("show", "active");
		loadInterestsOntoTab();
	});

	_("#btn-follow-interests1").addEventListener("click", addInterest);
	_("#btn-follow-interests2").addEventListener("click", addInterest);
};
UI();

