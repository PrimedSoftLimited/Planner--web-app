let registerUrl = "/api/signup";
registerUrl = `${api_link}${registerUrl}`;
let loginUrl = "/api/signin";
loginUrl = `${api_link}${loginUrl}`;
let createWorkspaceUrl = "/api/workspace/create";
createWorkspaceUrl = `${api_link}${createWorkspaceUrl}`;
let joinWorkspaceUrl = "/api/workspace/request";
joinWorkspaceUrl = `${api_link}${joinWorkspaceUrl}`;
const userEmail = _("#newUserEmail");
const email = localStorage.getItem("email")=="null" ? "" : localStorage.getItem("email");
const urlParams = new URLSearchParams(window.location.search);
const cToken = urlParams.get('confirm_token')? urlParams.get('confirm_token') : null;

// check if token to be used for acc. confirmation was sent from server
// for debugging workspace onboarding process, make if condition the boolean "true", and disable api requests as u see fit
if (true) {
    let token, status, workspaceForm = _("#join-workspace-form"), workspaceUrl = joinWorkspaceUrl;

    // _(".preloader").style.visibility = "visible";
    _("#workspace-tab").style.display = "block";
    _("#pills-home").style.display = "none";
    _("#workspace-tab").style.opacity = "1";

    // do acc. activation i.e confirmation
    // axios.get(`${api_link}/api/confirmation/${cToken}`)
    // .then(response => {
    //     _(".preloader").style.visibility = "hidden";
    //     let userData = response.data.data;
    //     localStorage.setItem("userData", JSON.stringify(userData));
    //     userData = JSON.parse(localStorage.getItem("userData"));
    //     ({token} = userData);
    // })
    // .catch(error => {
    //     _(".preloader").style.visibility = "hidden";
    //     handleError(error.response);
    //     console.log(error.response);
    // })
    
    // helper function for input[type="checkbox"] in create workspace and company form 
    const textAccordingToCheckbox = all(".switch-text");
    Array.from(all(".input-switch")).forEach((checkbox, i) => {
        checkbox.addEventListener('click', function() {
            if (this.checked) {
                textAccordingToCheckbox[i].textContent = `${"Private"}`;
            } else {
                textAccordingToCheckbox[i].textContent = `${"Public (*Workspace is visible to everyone on search)"}`;
            }
        })
    });

    // specifies appropriate form to be submitted on tab switching in workspace and company, and submits it on submit event
    all("[data-switch]").forEach(elem => {
        elem.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (elem.id === "company-tab-btn1") {
                workspaceForm = _("#join-workspace-form");
                workspaceUrl = joinWorkspaceUrl;
                status = undefined;
                submit();
            } else if (elem.id === "company-tab-btn") {
                workspaceForm = _("#create-workspace-form");
                workspaceUrl = createWorkspaceUrl;
                status = "Public";
                submit();
            }
        })
    })

    // function to submit workspace form
    function submit() {
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
            if (workspaceForm ==  _("#create-workspace-form"))  {
                _("#create-workspace-btn").classList.remove("active");
                _("#create-workspace-btn").classList.add("grey-out");
                _("#join-workspace-btn").classList.add("active");
                _("#create-workspace-tab").classList.remove("show, active");
                _("#workspace-tab-header").textContent = `Join a workspace. Make sure it's a fun one`;
                _("#join-workspace-tab").classList.add("show, active");
            } else if (workspaceForm ==  _("#join-workspace-form")) {
                _("#company-tab").style.display = "block";
                _("#workspace-tab").style.display = "none";
                _("#company-tab").style.opacity = "1";
            }
            return response;
        }, (error) => {
            workspaceForm.querySelector("button[type='submit']").innerHTML = `${"<i class='fa fa-arrow-right'></i>"}`;
            handleError(error.response);
        });

        let formData = new FormData(workspaceForm);

        // set workspace status based on user preference in workspace creation
        if (status) {
            _("#create-workspace-form input[type='checkbox']").checked? status = "Private" : status = "Public";
            formData.append("status", status);
        }

        formData = formDataToObject(formData);
        let userData = JSON.parse(localStorage.getItem("userData"));
        ({token} = userData);

        axios.post(workspaceUrl, formData, {
            headers: {
                Authorization: token
            }
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }
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
