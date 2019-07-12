const formFPwd = _(".form-forgotPwd");
localStorage.clear();

if (formFPwd) {
    formFPwd.addEventListener("submit", (e) => {
        e.preventDefault();

        let forgotPwdUrl = "/api/verify/email";
        forgotPwdUrl = `${api_link}${forgotPwdUrl}`;
        const formData = new FormData(formFPwd);

        axios.post(forgotPwdUrl, formData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            })
    })
}