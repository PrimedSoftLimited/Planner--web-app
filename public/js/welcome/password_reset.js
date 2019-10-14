const formResetPwd = _(".form-new-pwd");
const proceed = _("#proceedAfterReset"); //button

if (formResetPwd) {
    axios.interceptors.request.use((config) => {
        // Do something before request is sent
        formResetPwd.querySelector("button[type='submit']").innerHTML = loader;
        return config;
    }, (error) => {
        // Do something with request error
        handleError(error.response);
        return Promise.reject(error);
    });
    
    // Add a response interceptor
    axios.interceptors.response.use((response) => {
        // Do something with response data
        formResetPwd.querySelector("button[type='submit']").innerHTML = `${"Confirm"}`;
        return response;
    }, (error) => {
        // Do something with response error
        formResetPwd.querySelector("button[type='submit']").innerHTML = `${"Confirm"}`;
        handleError(error.response);
        return Promise.reject(error);
    });

    formResetPwd.addEventListener("submit", e => {
        e.preventDefault();
    
        let resetUrl = "/api/reset/password";
        resetUrl = `${api_link}${resetUrl}`;
        let formData = new FormData(formResetPwd);
        const code = localStorage.getItem("code");
        localStorage.setItem("password", formData.get("password"))
        formData.set("verify_code", code);
        formData = formDataToObject(formData);
          
        axios.put(resetUrl, formData)
            .then((response) => {
                replaceLocation("./password-confirmed.html")
            })
            .catch((err) => {
                console.log(err.response);
                handleError(err.response);
            })
    })    
}

if (proceed) {
    axios.interceptors.request.use((config) => {
        // Do something before request is sent
        proceed.innerHTML = loader;
        return config;
    }, (error) => {
        // Do something with request error
        handleError(error.response);
        return Promise.reject(error);
    });
    
    // Add a response interceptor
    axios.interceptors.response.use((response) => {
        // Do something with response data
        proceed.innerHTML = `${"Proceed to Dashboard"}`;
        return response;
    }, (error) => {
        // Do something with response error
        proceed.innerHTML = `${"Proceed to Dashboard"}`;
        handleError(error.response);
        return Promise.reject(error);
    });

    proceed.addEventListener("click", () => {
        axios.post(loginUrl, {
            email: localStorage.getItem("email"),
            password: localStorage.getItem("password")
        })
        .then((response) => {
            const userData = response.data.data;
            localStorage.setItem("userData", JSON.stringify(userData));
            setTimeout(replaceLocation("../dashboard/dashboard.html"), 2000);
        })
        .catch((err) => {
            handleError(err.response);
        })
    })
}


