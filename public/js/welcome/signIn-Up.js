// Sign In, Sign Up and Workspace scripts 
// workspace to be moved to different file

let registerUrl = "/api/signup";
registerUrl = `${api_link}${registerUrl}`;

let loginUrl = "/api/signin";
loginUrl = `${api_link}${loginUrl}`;

let createWorkspaceUrl = "/api/workspace/create";
createWorkspaceUrl = `${api_link}${createWorkspaceUrl}`;

let joinWorkspaceUrl = "/api/workspace/request";
joinWorkspaceUrl = `${api_link}${joinWorkspaceUrl}`;

const userEmail = _("#newUserEmail");
const email = localStorage.getItem("email") == "null" ? "" : localStorage.getItem("email");
const urlParams = new URLSearchParams(window.location.search);
const cToken = urlParams.get('confirm_token') ? urlParams.get('confirm_token') : null;

// check if token to be used for acc. confirmation was sent from server
// for debugging workspace onboarding process, make if condition the boolean "true", and disable api requests as u see fit
if (cToken) {
    let token, status = "Public", workspaceForm = _("#create-workspace-form"), workspaceUrl = createWorkspaceUrl;

    _(".preloader").style.visibility = "visible";
    _("#workspace-tab").style.display = "block";
    _("#pills-home").style.display = "none";
    _("#workspace-tab").style.opacity = "1";

    // do acc. activation i.e confirmation
    axios.get(`${api_link}/api/confirmation/${cToken}`)
        .then(response => {
            _(".preloader").style.visibility = "hidden";
            let userData = response.data.data;
            localStorage.setItem("userData", JSON.stringify(userData));
            userData = JSON.parse(localStorage.getItem("userData"));
            ({token} = userData)
            console.log(response);
        })
        .catch(error => {
            _(".preloader").style.visibility = "hidden";
            handleError(error.response);
            console.log(error.response);
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

    
    // create workspace;
    const create = (e) => {
        e = e || window.event;
        e.preventDefault();
        _("#create-workspace-form").removeEventListener('submit', create);
        workspaceForm = _("#create-workspace-form");
        workspaceUrl = createWorkspaceUrl;
        

        axios.interceptors.request.use((config) => {
            workspaceForm.querySelector("button[type='submit']").innerHTML = loader;
            // setTimeout(function() {
            //     throw new Error("Request timeout");
            // }, 12000);
            return config;
        }, (error) => {
            console.log(error);
        });

        axios.interceptors.response.use((response) => {
            workspaceForm.querySelector("button[type='submit']").innerHTML = `${"<i class='fa fa-arrow-right'></i>"}`;
            if (response.data) {
                _("#create-workspace-btn").classList.remove("active");
                _("#create-workspace-btn").classList.add("grey-out");
                _("#join-workspace-btn").classList.add("active");
                _("#join-workspace-btn").classList.remove("grey-out");
                _("#create-workspace-tab").classList.remove("show", "active");
                _("#workspace-tab-header").textContent = `Join a workspace. Make sure it's a fun one`;
                _("#join-workspace-tab").classList.add("show", "active");
            }
            
            return response;
        }, (error) => {
            workspaceForm.querySelector("button[type='submit']").innerHTML = `${"<i class='fa fa-arrow-right'></i>"}`;
            handleError(error.response);
        });

        let formData = new FormData(workspaceForm);

        // set workspace parameters based on user preference in workspace creation
        // _("#create-workspace-form input[type='checkbox']").checked ? status = "Private" : status = "Public";
        const randomHsl = () => `hsla(${Math.floor(Math.random() * 360)}, 100%, 50%, 1)`;
        const wallpaper = randomHsl();
        formData.append("status", status);
        formData.append("wallpaper", wallpaper);
        formData = formDataToObject(formData);
        console.log(formData);

        axios.post(workspaceUrl, formData, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                if (response.data) {
                    console.log(response);
                }
            })
            .catch(error => {
                console.error(error);
                _("#create-workspace-form").addEventListener('submit', e => create(e));
            })
    }
    _("#create-workspace-form").addEventListener('submit', e => create(e))


    // join workspace

    const join = (e, unique_name=null) => {
        e = e || window.event;
        e.defaultPrevented? null:e.preventDefault();
        let name = unique_name;
        console.log(token, unique_name, joinWorkspaceUrl);

        _("#join-workspace-form").removeEventListener('submit', e);
        workspaceForm = _("#join-workspace-form");
        workspaceUrl = joinWorkspaceUrl;

        axios.interceptors.request.use((config) => {
            workspaceForm.querySelector("button[type='submit']").innerHTML = loader;
            // setTimeout(function() {
            //     throw new Error("Request timeout");
            // }, 12000);
            return config;
        }, (error) => {
            console.log(error);
        });

        axios.interceptors.response.use((response) => {
            workspaceForm.querySelector("button[type='submit']").innerHTML = `${"<i class='fa fa-arrow-right'></i>"}`;
            if (response.data) {
                return response;
            }
        }, (error) => {
            workspaceForm.querySelector("button[type='submit']").innerHTML = `${"<i class='fa fa-arrow-right'></i>"}`;
            handleError(error.response);
        });

        let formData = new FormData(workspaceForm);

        if (unique_name != null && _("#con-append-join > input").classList.contains('inactive')) {
            formData.set("title", unique_name)
            console.log(...formData);
        } else if (unique_name == null && _("#con-append-join > input").classList.contains('inactive')) {
            throw new Error(console.error("Que pasa"));
            // return;
        }
        
        formData = formDataToObject(formData);
        console.log(formData, workspaceUrl, token);
        axios.post(workspaceUrl, formData, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                if (response.data) {
                    if (unique_name != null) {
                        _("#company-tab").style.display = "block";
                        _("#workspace-tab").style.display = "none";
                        _("#company-tab").style.opacity = "1";
                    } else {
                        response.data.data.choose_workspace? dissembleWorkspaces(response):null;
                    }
                }
                
                console.log(response);
            })
            .catch(error => {
                console.error(error);
                if (unique_name != null) {
                    _("#join-workspace-form").addEventListener("submit", e => join(e, unique_name = name));    
                } else {
                    _("#join-workspace-form").addEventListener("submit", e => join(e))
                }
            })
        }
    _("#join-workspace-form").addEventListener("submit", e => join(e));

    // const createWorkspace = () => {
    //     _("#create-workspace-form").addEventListener("submit", )
    // }


    const dissembleWorkspaces = (response) => {
        let { data: { data: { choose_workspace } } } = response;

        _(".appendage-join").classList.remove("inactive");
        _("#join-workspace--submit-btn").classList.add("inactive");
        let title, unique_name, wallpaper, unique_nme;
        _("#workspace-appendage").classList.remove('inactive');
        choose_workspace.forEach(workspace => {
            ({ title, unique_name, wallpaper } = workspace);
            let child = new DOMParser().parseFromString(`<div class="append-join border mt-1 mb-1 row mx-0">
                <div class="col-2">
                    <div class="append-img"></div>
                </div>
                <div class="col-8 append-title">
                    <div class="col-12 append-name">
                        <span class="">${title}</span>
                    </div>
                    <div class="col-12 append-id">
                        <span class="append-unique-name">${unique_name}</span>
                    </div>
                </div>
                <div class="col-1">
                    <button class="btn btn-brand add-append-btn">
                        <i class="fas fa-minus"></i>
                    </button>
                </div>
            </div>`, 'text/html');

            child = child.body.firstElementChild;
            child.querySelector(".append-img").style.backgroundColor = `${wallpaper}`;

            // select workspace
            const space = function(e) {
                e.defaultPrevented? null:e.preventDefault();
                child.removeEventListener('click', space);
                
                _("#workspace-appendage").innerHTML = ``;
                _("#workspace-appendage").classList.add('inactive');
                _("#con-append-join .floating-label").classList.add('inactive');
                _("#con-append-join > input").classList.add('inactive');
                _("#join-workspace--submit-btn").classList.remove('inactive');
                _("#con-append-join").appendChild(child);
                unique_nme = document.querySelector(".append-unique-name").textContent;
                _(".appendage-join").classList.add("inactive");
                _("#join-workspace-form").addEventListener("submit", e => join(e, unique_nme));
                child.querySelector(".add-append-btn").classList.add("show");
            };
            child.addEventListener('click', space);
            // undo select workspace
            const work = e => {
                e.stopPropagation();
                e.preventDefault();
                child.querySelector(".add-append-btn").removeEventListener('click', work);
                
                child.remove();
                _("#con-append-join .floating-label").classList.remove('inactive');
                _("#con-append-join > input").classList.remove('inactive');
                _("#join-workspace-form").removeEventListener("submit", e => join(e));
            };
            child.querySelector(".add-append-btn").addEventListener("click", work)

            _("#workspace-appendage").appendChild(child);
        });
    };
}

// For signUp
if (regForm) {
    axios.interceptors.request.use((config) => {
        regForm.querySelector("button[type='submit']").innerHTML = loader;
        return config;
    }, (error) => {
        handleError(error.response);
        return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
        regForm.querySelector("button[type='submit']").innerHTML = `${"<i class='fa fa-arrow-right'></i>"}`;
        // $('#signUpModal').modal('show');
        return response;
    }, (error) => {
        regForm.querySelector("button[type='submit']").innerHTML = `${"<i class='fa fa-arrow-right'></i>"}`;
        handleError(error.response);
        return Promise.reject(error);
    });

    userEmail.setAttribute("value", email);

    regForm.addEventListener("submit", e => {
        e.preventDefault();

        let formData = new FormData(regForm);
        const email = formData.get("email");
        const mail = Object.keys(mailMap).find(key => email.includes(key));
        proceed.href = mailMap[mail];

        axios.post(registerUrl, formData)
            .then(response => {
                console.log(response.data);
                _("#userMail").innerHTML = `Please check your mail for the verification link sent to <a href='#'>${email}</a>`;
                $("#signUpModal").modal('show');
            })
            .catch(err => {
                console.log(err.response);
            })

    })
}

// For signIn
if (loginForm) {
    axios.interceptors.request.use((config) => {
        loginForm.querySelector("button[type='submit']").innerHTML = loader;
        return config;
    }, (error) => {
        handleError(error.response);
    });

    axios.interceptors.response.use((response) => {
        loginForm.querySelector("button[type='submit']").innerHTML = `${"Log In"}`;
        return response;
    }, (error) => {
        loginForm.querySelector("button[type='submit']").innerHTML = `${"Log In"}`;
        handleError(error.response);
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        let formData = new FormData(loginForm);

        axios.post(loginUrl, formData)
            .then((response) => {
                const userData = response.data.data;
                localStorage.setItem("userData", JSON.stringify(userData));
                setTimeout(replaceLocation("../dashboard/dashboard.html"), 2000);
            })
            .catch((err) => {
                console.log(err.response);
                handleError(err.response);
            })
    })
}
