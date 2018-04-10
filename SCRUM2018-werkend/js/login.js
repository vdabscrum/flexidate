// JavaScript source code
window.onload = function () {

    let eLoginBtn = document.querySelector('.login_button');
    eLoginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (eForm.style.visibility = "hidden") {
            eForm.style.visibility = "visible"
        }
    })

    let eForm = document.getElementById('login');
    eForm.addEventListener('click', function (e) {
        
        let id = inloggen(e, eForm);
        let eMsg = document.querySelector('.message');
        if (!id) {
            let person = scrumlib.getDatasetsByConditions({ email: { "waarde": eForm["email"].value } })[0];
            
            if (person === undefined) {
                eMsg.innerHTML = "Email is niet gekend";
            } else {
                eMsg.innerHTML = "Wachtwoord niet correct";
            }
        } else {
            window.location = "feed.html";
            localStorage.setItem('id', id);
        }
    });
};

function inloggen(e, eForm) {
    e.preventDefault();
    let email = eForm["email"].value;
    let password = eForm["password"].value;
    let id = scrumlib.login(email, password);
    return id;
}
