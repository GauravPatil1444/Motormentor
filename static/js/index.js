let profileclk = ()=>{
    window.location.href = "/profile";
}
let send = ()=>{
    let send_data = document.getElementById('chat-input').value;
    data = JSON.stringify({"data":send_data,"email":sessionStorage.getItem('email')})
    const xhr = new XMLHttpRequest();
    xhr.open('POST','/history',true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
}