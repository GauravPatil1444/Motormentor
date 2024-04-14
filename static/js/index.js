let profileclk = ()=>{
    window.location.href = "/profile"
}
let content = document.createElement("div");
content.classList.add("message");
let send = ()=>{
    document.getElementById("Loading").style.display = "block";
    container = document.getElementById('chat-container');
    message = document.getElementById('chat-input').value;
    content.innerHTML = container.innerHTML+message;
    container.appendChild(content);
    const xhr = new XMLHttpRequest();
    xhr.open('post','http://127.0.0.1:5500/preprocess',true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload=()=>{
      console.log(xhr.responseText)
      scrape_data = xhr.responseText
      const xhr1 = new XMLHttpRequest();
      xhr1.open('post','/scrape',true);
      xhr1.setRequestHeader('Content-Type', 'application/json');
      xhr1.onload=()=>{
        document.getElementById("Loading").style.display = "none";
        document.getElementById("content").style.display = "block";
        console.log(xhr1.responseText)
        try {
          data = JSON.parse(xhr1.responseText);
        } catch (error) {
          document.getElementById("carname").innerHTML = "<h1>Car not found</h1>"
        }
        document.getElementById('table').innerHTML = data['table'];
        // document.getElementById("carname").innerHTML = data["carname"];
        // document.getElementById("img").innerHTML =
        //   "<img src=" + data["img"] + "></img>";
        // document.getElementById("price").innerHTML =
        //   "<h3> Price : " + data["price"] + "</h3>";
        // data["features"]!="None"?document.getElementById("features").innerHTML = 
        //   "<span><h3>Key features : </h3></span><br>"+data["features"]:document.getElementById("features").innerHTML = " ";
        // data["specs"]!="None"?document.getElementById("specs").innerHTML = 
        //   "<span><h3>Specifications : <h3></span><br>"+data["specs"]:document.getElementById("specs").innerHTML = " ";
        // data["mileage"]!="None"?document.getElementById("mileage").innerHTML = 
        //   "<span><h3>Mileage : </h3></span><br>"+data["mileage"]:document.getElementById("mileage").innerHTML = " "
        // data["verdict"]!="None"?document.getElementById("verdict").innerHTML = data["verdict"]:document.getElementById("verdict").innerHTML = " ";
        // document.getElementById("variants").innerHTML = 
        //   "<span><h3>variants : </h3></span><br>"+data["variants"];
        // data["summary"]!="None"?document.getElementById("summary").innerHTML = 
        //   "<span><h3>summary : </h3></span><br>"+data["summary"]:document.getElementById("summary").innerHTML = " ";  
      }
      xhr1.send(JSON.stringify({'data':scrape_data}));
    }
  xhr.send(JSON.stringify({'message':message}));
}

