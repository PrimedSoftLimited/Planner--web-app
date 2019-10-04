const formConfirmCode = _(".form-confirm-code");
const urlParams = new URLSearchParams(window.location.search);
const verificationCode = urlParams.get('verify_code');
const email = urlParams.get('email');
localStorage.setItem("email", email);

if (formConfirmCode) {
    _("input[name='verify_code']").value = verificationCode;

    formConfirmCode.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const formData = new FormData(formConfirmCode);
        const code = formData.get("verify_code");
        localStorage.setItem("code", code);
        setTimeout(assignLocation("./newpassword.html"), 2000);
    })    
}