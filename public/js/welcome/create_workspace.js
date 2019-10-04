let createWorkspaceUrl = "/api/workspace/create";
createWorkspaceUrl = `${api_link}${createWorkspaceUrl}`;


if (window.location.hash == "#createworkspace") {
    let token, status = "Public", workspaceForm = _("#create-workspace-form"), workspaceUrl = createWorkspaceUrl;

    _(".preloader").style.visibility = "visible";
    _("#workspace-tab").style.display = "block";
    _("#pills-home").style.display = "none";
    _("#workspace-tab").style.opacity = "1";

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
    const create = e => {
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
    _("#create-workspace-form").addEventListener('submit', e => create(e));
}