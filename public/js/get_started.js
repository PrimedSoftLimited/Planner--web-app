// add preloader while activating account

const urlParams = new URLSearchParams(window.location.search);
const cToken = urlParams.get('confirm_token') ? urlParams.get('confirm_token') : null;
let createCompanyUrl = "/api/company/create";
createCompanyUrl = `${api_link}${createCompanyUrl}`;
let joinWorkspaceUrl = "/api/workspace/request";
joinWorkspaceUrl = `${api_link}${joinWorkspaceUrl}`;
let joinCompanyUrl = "/api/company/request";
joinCompanyUrl = `${api_link}${joinCompanyUrl}`;
let allInterestUrl = `/api/user/categories`;
allInterestUrl = `${api_link}${allInterestUrl}`;
let submitInterestUrl = "/api/interest/select";
submitInterestUrl = `${api_link}${submitInterestUrl}`;
const activateAccUrl = `${api_link}/api/confirmation/${cToken}`
let btn, companyBuffer = [], workspaceBuffer = [], interestBuffer = [], formData, token, user, url, request, status = "Public";


// (async function () {
//     const req = await fetch('https://randomapi.com/api/006b08a801d82d0c9824dcfdfdfa3b3c');
//     const total = Number(req.headers.get('content-length'));
//     let loaded = 0;
//     for await (const { length } of req.body.getReader()) {
//         loaded += length;
//         const progress = ((loaded / total) * 100).toFixed(2); // toFixed(2) means two digits after floating point
//         console.log(`${progress}%`); // or yourDiv.textContent = `${progress}%`;
//     }
// })();

const helperScript = () => {

    // helper function to set option values corresponding to their textcontent
    all("#industryChooser option").forEach(option => {
        option.value = option.textContent;
    })

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
        })
    });
};
helperScript();


// do acc. activation i.e confirmation
const activateUserAccount = () => {
	const config = {
			method: "GET",
			url: activateAccUrl
			// url: "https://randomapi.com/api/006b08a801d82d0c9824dcfdfdfa3b3c"
	}

	let percentCompleted = 1;

	axios(config)
		.then(response => {
			if (response.data) {
				const z = setInterval(() => {
					if (percentCompleted>=100) {
						clearInterval(z);
						_("#loading > div").classList.add("animated", "fadeOut");
						_("#loading").classList.add("animated", "delay-1s", "slideOutUp");
						setTimeout(() => _("#preset").classList.add("animated", "slideInUp", "try"), 1100);
					}
					const elem = _("#progress");
					elem.style.width = `${percentCompleted}%`;
					percentCompleted+=1;
				}, 50)
				let userData = response.data.data;
				localStorage.setItem("userData", JSON.stringify(userData));
				userData = JSON.parse(localStorage.getItem("userData"));

				({ token } = userData);
				({ user } = userData);

				_("#putName").textContent = `${"You\'re almost there, "}${user.name}`
				window.location.hash = "#onboard";
				console.log(response);
			}
		})
		.catch(error => {
			// handleError(error.response);
			console.log(error);
		});
}
activateUserAccount();

const submitCreateData = async (formData, url) => {
    formData = formDataToObject(formData);
    btn = _("#preset-btn3b");
    console.log("insubmit");
    try {
        let response = await axios.post(url, formData, {
            headers: {
                Authorization: token
            }
        });
        let data = await response.data;

        return data;

    } catch (error) {
        btn.disabled = false;
        btn.classList.remove("grey");
        console.log(error);
        return Promise.reject(error);
    }
}


const getJoinData = async (formData, url) => {
    try {
        let response = await axios.post(url, formData, {
            headers: {
                Authorization: token
            }
        })
        let data = await response.data;

        return data;

    } catch (error) {
        console.log(error);
    }
}

const submitJoinData = async (formData, url) => {
    axios.post(url, formData, {
        headers: {
            Authorization: token
        }
    })
        .then(response => {
            if (response.data) {
                _("#join-workspace-tab").classList.remove("show", "active");
                _("#join-company-tab").classList.add("show", "active");
                console.log(response);
                return Promise.resolve(response);
            }
        })
        .catch(error => {
            console.error(error);
            return Promise.reject(error);
        });
}

const loopOutData = (response, buffer, parent) => {

    let choices, title, unique_name, wallpaper;
    console.log(response);
    choices = response.data.choose_workspace? response.data.choose_workspace:response.data.choose_company;

    parent.innerHTML = ``;
    parent.closest(".con-appendage-join").classList.remove("d-none");

    choices.forEach((choice, index) => {
        ({ title, unique_name, wallpaper } = choice);

        let child = new DOMParser().parseFromString(`<div data-index="${index}" class="append-join border col-12 d-flex">
            <div class="append-img col-1"></div>
            <div class="append-title col-11 p-1">
                <div class="col-12 append-name">
                    <span class="">${title}</span>
                </div>
                <div class="col-12 append-id">
                    <span class="append-unique-name">${unique_name}</span>
                </div>
            </div>
        </div>`, 'text/html');

        child = child.body.firstElementChild;
        child.querySelector(".append-img").style.backgroundColor = `${wallpaper}`;

        // select workspace/company
        (() => {
            child.addEventListener('click', function(e) {
                e.preventDefault();

                if (child.classList.contains("clicked")) {
                    child.classList.remove("clicked");
                    delete buffer[this.dataset.index];

                } else {
                    child.classList.add("clicked");
                    let uniqueName = this.querySelector(".append-unique-name").textContent;
                    buffer[this.dataset.index] = uniqueName;
                }
            });
        })();

        parent.appendChild(child);
    });
};

const getInterests = async () => {
    try {
        let response = await axios.get(allInterestUrl, {
            headers: {
                Authorization: token
            }
        })
        let data = await response.data;
        console.log(data);
        return data;

    } catch (error) {
        console.log(error)
    }
}

const loadInterestsOntoTab = (tab) => {
    tab.classList.remove("show", "active");
    _("#interest-tab").classList.add("show", "active");
    getInterests()
    .then(data => {
        let {categories} = data, index = 0;
        categories.forEach(category => {
            _("#sub-interest-tab").innerHTML += `
                <div data-category-id="${category.id}" class="category mb-5 d-flex flex-wrap col-12">
                    <h4 class="category-name d-flex col-12 pb-1">${category.title}</h4>
                </div>`;
            category.interests.forEach(interest => {
                _(`[data-category-id="${category.id}"]`).innerHTML += `
                    <div data-category-id="${category.id}" data-interest-id="${interest.id}" data-index="${index}" class="select-interest b-shadow mx-2 my-2 p-0">
                        <div></div>
                        <div class="text-center col-12 overflow-auto p-2">${interest.title}</div>
                    </div>`;

                index++;
            });
        });
        all(`[data-interest-id]`).forEach(interest => {
            interest.addEventListener("click", function() {

                if (this.classList.contains("clicked")) {
                    this.classList.remove("clicked");
                    delete interestBuffer[this.dataset.index];
                    if (!(interestBuffer.some(e => e instanceof Array))) {
                        _(".con-bottom-lg").classList.remove("animated", "slideInUp", "d-flex");
                        _(".con-bottom-lg").classList.add("d-none");
                    }
                } else {
                    this.classList.add("clicked");
                    _(".con-bottom-lg").classList.add("animated", "slideInUp", "d-flex");
                    _(".con-bottom-lg").classList.remove("d-none");
                    interestBuffer[this.dataset.index] = [Number(this.dataset.categoryId), Number(this.dataset.interestId)];
                }
            });
        });
    })
    .catch(error => console.log(error));
}

const UI = () => {
    _("#preset-btn1").addEventListener("click", e => {
        e.preventDefault();
        _("#preset-right").classList.remove("show", "active");
        _("#join-workspace-tab").classList.add("show", "active");
    })

    _("#preset-btn2").addEventListener("click", e => {
        e.preventDefault();
        _("#preset-right").classList.remove("show", "active");
        _("#create-tab").classList.add("show", "active");
    })

    _("#preset-btn3a").addEventListener("click", e => {
        e.preventDefault();
        _("#create-tab").classList.remove("show", "active");
        _("#preset-right").classList.add("show", "active");
    })

    _("#preset-btn3b").addEventListener("click", async (e) => {
        e.preventDefault();
        btn = e.target || e.srcElement;
        btn.disabled = true;
        btn.classList.add("grey");
        const companyFormData = new FormData(_("#create-company-form"));
        const workspaceFormData = new FormData(_("#create-workspace-form"));
        const randomHsl = () => `hsla(${Math.floor(Math.random() * 360)}, 100%, 50%, 1)`;
        const wallpaper = randomHsl();
        workspaceFormData.append("status", status);
        workspaceFormData.append("wallpaper", wallpaper);
        companyFormData.append("status", status);
        companyFormData.append("wallpaper", wallpaper);
				let data = await submitCreateData(companyFormData, createCompanyUrl);
				// let { data: { new_company: id } } = data;
				let {data: {new_company: {id: companyId}}} = data;
				localStorage.setItem("companyId", companyId);
        createWorkspaceUrl = `${api_link}/api/workspace/${companyId}/create`;
        data = await submitCreateData(workspaceFormData, createWorkspaceUrl);
				let {data: {new_workspace: {id: workspaceId}}} = data;
				localStorage.setItem("workspaceId", workspaceId);
        loadInterestsOntoTab(_("#create-tab"));
    });

    _("#search-workspaces").addEventListener("click", e => {
        e.preventDefault();
        formData = new FormData(_("#join-workspace-form"));
        formData = formDataToObject(formData);
        workspaceBuffer = [];
        getJoinData(formData, joinWorkspaceUrl)
        .then(response => loopOutData(response, workspaceBuffer, _("#workspace-appendage")))
        .catch(error => console.log(error));
    });

    _("#join-workspaces").addEventListener("click", e => {
        e.preventDefault();
        return Promise.all(workspaceBuffer.map(workspaceTitle => submitJoinData({title: workspaceTitle}, joinWorkspaceUrl)));
    });

    _("#preset-btn4a").addEventListener("click", e => {
        e.preventDefault();
        _("#join-workspace-tab").classList.remove("show", "active");
        _("#preset-right").classList.add("show", "active");
    });

    _("#preset-btn4b").addEventListener("click", e => {
        e.preventDefault();
        _("#join-workspace-tab").classList.remove("show", "active");
        _("#join-company-tab").classList.add("show", "active");
    });

    _("#search-companies").addEventListener("click", e => {
        e.preventDefault();
        formData = new FormData(_("#join-company-form"));
        formData = formDataToObject(formData);
        companyBuffer = [];
        getJoinData(formData, joinCompanyUrl)
        .then(response => loopOutData(response, companyBuffer, _("#company-appendage")))
        .catch(error => console.log(error));
    })

    _("#join-companies").addEventListener("click", e => {
        e.preventDefault();
        return Promise.all(companyBuffer.map(companyTitle => submitJoinData({title: companyTitle}, joinCompanyUrl)));
    });

    _("#preset-btn5").addEventListener("click", e => {
        e.preventDefault();
        loadInterestsOntoTab(_("#join-company-tab"))
    });

    _("#btn-follow-interests").addEventListener("click", e => {
        e.preventDefault();
        let user_interests = interestBuffer.filter(idArray => idArray instanceof Array);
        console.log(user_interests, token);

        // axios.post(submitInterestUrl, {
        //     headers: {
        //         Authorization: token,
        //         'Content-Type': 'application/json'
        //     },
        //     data: {"user_interests": user_interests}
        // })
        // .then(response => console.log(response.data))
        // .catch(error => console.log(error.response));
        _(".preloader").style.visibility = "visible";

        fetch(submitInterestUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_interests})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem("interestData", data);
            assignLocation("../dashboard/dashboard.html");
        })
        .catch(error => {
            console.log(error.response);
            _(".preloader").display.visibility = "hidden";
        });
    })
};
UI();

