const api_link = "https://goalsetterapi.herokuapp.com";
const regForm = _(".signup-form");
const loginForm = _(".signin-form");
const loader = `${"<svg width='38' height='38' viewBox='0 0 38 38' xmlns='http://www.w3.org/2000/svg' stroke='#efefef'>"}
${"<g fill='none' fill-rule='evenodd'>"}
    ${"<g transform='translate(1 1)' stroke-width='2'>"}
        ${"<circle stroke-opacity='.5' cx='18' cy='18' r='18'/>"}
        ${"<path d='M36 18c0-9.94-8.06-18-18-18'>"}
            ${"<animateTransform attributeName='transform' type='rotate' from='0 18 18' to='360 18 18' dur='1s' repeatCount='indefinite'/>"}
        ${"</path>"}
    ${"</g>"}
${"</g>"}
${"</svg>"}`;
const mailMap = {
    "gmail": "https://mail.google.com/mail/u/0/#inbox",
    "ymail": "https://login.yahoo.com",
    "yahoomail": "https://login.yahoo.com",
    "outlook": "https://login.live.com",
    "aol": "https://login.aol.com}"
};
const proceed = _("#proceedToMail");

// a coder walks into a bar

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
    }), {}))
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