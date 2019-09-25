// Sign In, Sign Up and Workspace scripts
// workspace to be moved to different file

let registerUrl = "/api/signup";
registerUrl = `${api_link}${registerUrl}`;

let loginUrl = "/api/signin";
loginUrl = `${api_link}${loginUrl}`;

const userEmail = _("#newUserEmail");
const email = localStorage.getItem("email") == "null" ? "" : localStorage.getItem("email");


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
            });

    });
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
            });
    });
}
