window.onload = function() {

  let eForm = document.getElementById('login');
  eForm.addEventListener('click', function(e) {
    let id = inloggen(e, eForm);
    if(!id) {
      let person = scrumlib.getDatasetsByConditions({email: {"waarde": eForm["email"].value}})[0];
      let eMsg = document.querySelector('.message');
      if (person === undefined) {
        eMsg.innerHTML = "Email is niet gekend";
      } else {
        eMsg.innerHTML = "Wachtwoord niet correct";
      }
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
