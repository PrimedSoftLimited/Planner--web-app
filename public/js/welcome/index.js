const getEmail = _(".form-get-started");
const prom = new Promise((resolve, reject) => {
    getEmail.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const formData = new FormData(getEmail);
        const mail = formData.get("email");
        resolve(mail);
    });
});

prom.then((mail) => {
    localStorage.setItem("email", mail);
    setTimeout(assignLocation("./onboard/signup.html"), 2000);
})
