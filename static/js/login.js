let validate = () => {

    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
  
    document.getElementById('email').innerText = email;
    let status = 0;
    if (pass.length < 8) {
      status = 1;
      document.getElementById("password").style.borderBottomColor = 'red';
      alert("Password length must be atleast 8 charachters");
    }

    if (status == 0) {
      document.form.action = "/authenticate";
    }
    else{
        document.getElementById('login_form').method = "get";
    }
}