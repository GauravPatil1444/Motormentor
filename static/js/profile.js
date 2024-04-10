let profileclk = () => {
  window.location.href = "/profile";
};
let login = () => {
  if (document.getElementById("loginbtn").innerText == "Login") {
    window.location.href = "/login";
  } 
  else {
    sessionStorage.removeItem('status');
    console.log(sessionStorage.length);
    window.location.href = "/profile";
  }
};
document.addEventListener("DOMContentLoaded", function () {
  if (sessionStorage.getItem("status")) {
    let obj = sessionStorage.getItem("history");
    console.log(typeof obj);
    document.getElementById("user_name").innerText =
      sessionStorage.getItem("name");
    document.getElementById("user_email").innerText =
      sessionStorage.getItem("email");
    document.getElementById("user_status").innerText = "Logged in";
    document.getElementById("loginbtn").innerText = "Logout";
    list = sessionStorage.getItem('history');
    try{
      list = list.split(',')
    }
    catch{
      document.getElementById("user_history").innerText = "No history";
    }
      console.log(list)
    for(let i=0;i<list.length;i++){
      document.getElementById('user_history').innerHTML += list[i]+'<br>';
    }
  } else {
    document.getElementById("user_name").innerText = "Login to view";
    document.getElementById("user_email").innerText = "Login to view";
    document.getElementById("user_status").innerText = "Logged out";
    document.getElementById("no_history").innerText = "Login to view";
  }
});
