let validate = () => {

    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let form  = document.getElementById('login_form');
    let form_data = new FormData(form);
  
    document.getElementById('email').innerText = email;
    let status = 0;
    if (pass.length < 8) {
      status = 1;
      document.getElementById("password").style.borderBottomColor = 'red';
      alert("Password length must be atleast 8 charachters");
    }

    if (status == 0) {
      // document.form.action = "/authenticate"; \
      const xhr = new XMLHttpRequest();
      xhr.open('POST','/authenticate',true);
      xhr.onload = function(){
        let data = JSON.parse(xhr.responseText);
        // console.log(data)
        if(data['status']==1){
          sessionStorage.setItem('email',data['email']);
          sessionStorage.setItem('status',data['status']);
          sessionStorage.setItem('name',data['name']);
          sessionStorage.setItem('history',data['history']);
          window.location.href = "/";
        }
        else{
          alert("Invalid email or password !");
          document.getElementById("password").style.borderBottomColor = 'red';
          document.getElementById("email").style.borderBottomColor = 'red';
        }
      }
      xhr.send(form_data);
    }
    else{
        document.getElementById('login_form').method = "get";
    }
}