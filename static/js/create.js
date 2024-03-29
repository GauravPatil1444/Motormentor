
let validate = () => {
  
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let Cpass = document.getElementById("Cpass").value;
    let phone = document.getElementById("phone").value;
  
    document.getElementById('email').innerText = email;
    let status = 0;
    if (pass.length < 8) {
      status = 1;
      document.getElementById("password").style.borderBottomColor = 'red';
      alert("Password length must be atleast 8 charachters");
    }
    if (Cpass != pass) {
      status = 1;
      document.getElementById("Cpass").style.borderBottomColor = 'red';
      alert("Confirm password doesn't matched");
    }
    if (phone.length != 10) {
      status = 1;
      document.getElementById("phone").style.borderBottomColor = 'red';
      alert("Phone.no length must be atleast 10 numbers");
    }

    if (status == 1) {
      document.getElementById("create_form").method = "get";
      document.form.action = "/create_account";
      console.log("Data not submitted");
    }
}