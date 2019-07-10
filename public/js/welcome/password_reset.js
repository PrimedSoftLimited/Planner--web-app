const formResetPwd = _(".form-new-pwd");

if (formResetPwd) {
    formResetPwd.addEventListener("submit", e => {
        e.preventDefault();
    
        let resetUrl = "/api/reset/password";
        resetUrl = `${api_link}${resetUrl}`;
        const code = localStorage.getItem("code");
        let formData = new FormData(formResetPwd);
        formData.set("verify_code", code);
        formData = formDataToObject(formData);
          
        axios.put(resetUrl, formData)
            .then((response) => {
                console.log(response.data);
                localStorage.clear();
            })
            .catch((err) => {
                console.log(err.response);
                localStorage.clear();
            })
    })    
}


