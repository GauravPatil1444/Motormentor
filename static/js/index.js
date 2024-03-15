let profileclk = ()=>{
    window.location.href = "/profile"
}
let content = document.createElement("div");
content.classList.add("message");
let send = ()=>{
    container = document.getElementById('chat-container');
    message = document.getElementById('chat-input').value;
    content.innerHTML = container.innerHTML+message;
    container.appendChild(content);
    const xhr = new XMLHttpRequest();
  xhr.open('post','/message',true);
  xhr.onload=()=>{
    console.log(xhr.responseText)  
  }
  xhr.send({'message':message});
}

