const api_link = "https://goalsetterapi.herokuapp.com";
const regForm = _(".signup-form");
const loginForm = _(".signin-form");
const loader = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="5vh" height="5vh" viewBox="0 0 128 128" xml:space="preserve"><g><path d="M59.6 0h8v40h-8V0z" fill="#000000" fill-opacity="1"/><path d="M59.6 0h8v40h-8V0z" fill="#cccccc" fill-opacity="0.2" transform="rotate(30 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#cccccc" fill-opacity="0.2" transform="rotate(60 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#cccccc" fill-opacity="0.2" transform="rotate(90 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#cccccc" fill-opacity="0.2" transform="rotate(120 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#b2b2b2" fill-opacity="0.3" transform="rotate(150 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#999999" fill-opacity="0.4" transform="rotate(180 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#7f7f7f" fill-opacity="0.5" transform="rotate(210 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#666666" fill-opacity="0.6" transform="rotate(240 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#4c4c4c" fill-opacity="0.7" transform="rotate(270 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#333333" fill-opacity="0.8" transform="rotate(300 64 64)"/><path d="M59.6 0h8v40h-8V0z" fill="#191919" fill-opacity="0.9" transform="rotate(330 64 64)"/><animateTransform attributeName="transform" type="rotate" values="0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64" calcMode="discrete" dur="840ms" repeatCount="indefinite"></animateTransform></g></svg>`;
const mailMap = {
    "gmail": "https://mail.google.com/mail/u/0/#inbox",
    "ymail": "https://login.yahoo.com",
    "yahoomail": "https://login.yahoo.com",
    "outlook": "https://login.live.com",
    "aol": "https://login.aol.com}"
};

const proceed = _("#proceedToMail");

function assignLocation(str) {
    location.assign(str);
}

function replaceLocation(str) {
    location.replace(str);
}

function _(str) {
    return document.querySelector(str);
}

function all(str) {
    return document.querySelectorAll(str);
}

function formDataToObject(formData) {
    return new Object(Array.from(formData.entries()).reduce((old, pair) => ({
        ...old, [pair[0]]: pair[1]
    }), {}));
}

// toggle password reveal (&#xf06e;) ==> illuminati 👁
// x - string id of clicked element, y - string id of input[type="password"]
function showPwd(x, y) {
    if (_(x).classList.contains('active')) {
        _(x).innerHTML = '&#xf070;';
        _(y).type = 'password';
        _(x).classList.remove('active')
    } else {
        _(x).innerHTML = '&#xf06e;';
        _(y).type = 'text';
        _(x).classList.add('active');
    }
}
//
function handleError(error) {
    if (error == undefined) {
        $("#myToast").toast('show');
        $("#myToast").css('height', '15vh');
    } else if (error.status == 400) {
        // what to do
        $("#myToast").toast('show');
        $("#myToast").css('height', '15vh');
    } else if (error.status == 401) {
        genericErrorFunction("password");
    } else if (error.status == 404 || error.status == 422) {
        genericErrorFunction("email");
    } else if (error.status == 500) {
        $("#myToast").toast('show');
        $("#myToast").css('height', '15vh');
    } else if (error.status == 501) {
        // what to do
        $("#myToast").toast('show');
        $("#myToast").css('height', '15vh');
    } else if (error.status == 503) {
        // what to do
        $("#myToast").toast('show');
        $("#myToast").css('height', '15vh');
    } else if (error.status == 504) {
        // what to do
        $("#myToast").toast('show');
        $("#myToast").css('height', '15vh');
    }
    function genericErrorFunction(data) {
        const errorElem = _(`[data-id='${data}']`);
        const id = errorElem.previousElementSibling.id;
        const inputElem = _(`#${id} input`) || _(`#${id}`);

        if (regForm) {
            errorElem.innerText = error.data[data][0];
        }

        if (loginForm) {
            errorElem.innerText = error.data.data.message;
        }

        errorElem.classList.add("invalid");
        inputElem.classList.add("invalid");

        inputElem.addEventListener("input", () => {
            errorElem.innerText = errorElem.dataset.label;
            errorElem.classList.remove("invalid");
            inputElem.classList.remove("invalid");
        })
    }
}

// helper function for css to animate label on input field
all(".con-input input").forEach((elem) => {
    elem.addEventListener("blur", e => {
        e.preventDefault();

        const parent = elem.parentNode;
        elem.value? parent.classList.add("valid"):parent.classList.remove("valid");
    })
})

// breadcrumb navigation
try {
    _("#left-btn").addEventListener("click", e => {
        e.preventDefault();
        _("[data-roll='2']").style.display = "none";
        _("[data-roll='1']").style.display = "block";
        _("[data-roll='1']").style.opacity = "1";
    });

    _("#right-btn").addEventListener("click", e => {
        e.preventDefault();
        _("[data-roll='1']").style.display = "none";
        _("[data-roll='2']").style.display = "block";
        _("[data-roll='2']").style.opacity = "1";
    });
} catch (e) {

}

// To keep label up when input has text (on validation)
all('.brand-input').forEach(e => {
    e.addEventListener('blur', event => {
        try {
            event.preventDefault();
            const elemId = e.id;
            const floatingLabel = _(`#${elemId} ~ .floating-label`);
            e.value == "" ? floatingLabel.classList.remove("stay") : floatingLabel.classList.add("stay");
        } catch (e) {
            if (e instanceof TypeError) {
                // console.clear();

            } else {
                console.log(e);
            }
        }
    })
})
