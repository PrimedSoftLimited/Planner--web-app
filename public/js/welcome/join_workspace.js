let joinWorkspaceUrl = "/api/workspace/request";
joinWorkspaceUrl = `${api_link}${joinWorkspaceUrl}`;


if (window.location.hash == "#joinworkspace") {

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
            formData.set("title", unique_name);
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
                        if (response.data.data.choose_workspace) {
                            dissembleWorkspaces(response);
                        } else if (response.data.data.message) {
                            
                        }
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