let data1 = "";
let data2 = "";
let arr = [];
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
      arr = scrape_data.split(" ");
      if(arr.length>=2){
        send_data = arr[0]+" "+arr[1]; 
        const xhr1 = new XMLHttpRequest();
        xhr1.open('post','/scrape',true);
        xhr1.setRequestHeader('Content-Type', 'application/json');
        xhr1.onload=()=>{
          document.getElementById("Loading").style.display = "none";
          document.getElementById("content").style.display = "block";
          console.log(xhr1.responseText)
          try {
            data1 = JSON.parse(xhr1.responseText);
            console.log("Got one !");
          } catch (error) {
            document.getElementById("carname").innerHTML = "<h1>Car not found</h1>"
          }
          if(arr.length==2){
            document.getElementById('table').innerHTML = data1['table'];
            document.getElementById("carname").innerHTML = data1["carname"];
            document.getElementById("img").innerHTML =
              "<img src=" + data1["img"] + "></img>";
            document.getElementById("price").innerHTML =
              "<h3> Price : " + data1["price"] + "</h3>";
            data1["features"]!="None"?document.getElementById("features").innerHTML = 
              "<span><h3>Key features : </h3></span><br>"+data1["features"]:document.getElementById("features").innerHTML = " ";
            data1["specs"]!="None"?document.getElementById("specs").innerHTML = 
              "<span><h3>Specifications : <h3></span><br>"+data1["specs"]:document.getElementById("specs").innerHTML = " ";
            data1["mileage"]!="None"?document.getElementById("mileage").innerHTML = 
              "<span><h3>Mileage : </h3></span><br>"+data1["mileage"]:document.getElementById("mileage").innerHTML = " "
            data1["verdict"]!="None"?document.getElementById("verdict").innerHTML = data1["verdict"]:document.getElementById("verdict").innerHTML = " ";
            document.getElementById("variants").innerHTML = 
              "<span><h3>variants : </h3></span><br>"+data1["variants"];
            data1["summary"]!="None"?document.getElementById("summary").innerHTML = 
              "<span><h3>summary : </h3></span><br>"+data1["summary"]:document.getElementById("summary").innerHTML = " ";  
          }
        }
        xhr1.send(JSON.stringify({'data':send_data}));
      }
      if(arr.length==4){
        send_data = arr[2]+" "+arr[3];
        const xhr2 = new XMLHttpRequest();
        xhr2.open('post','/scrape',true);
        xhr2.setRequestHeader('Content-Type', 'application/json');
        xhr2.onload=()=>{
          document.getElementById("Loading").style.display = "none";
          document.getElementById("content").style.display = "block";
          console.log(xhr2.responseText)
          try {
            data2 = JSON.parse(xhr2.responseText);
            console.log("Got another one too !");
          } catch (error) {
            document.getElementById("carname").innerHTML = "<h1>Car not found</h1>"
          }
          if(arr.length==4){
            console.log(200);
          }
        }
        xhr2.send(JSON.stringify({'data':send_data}));
      }
      
    } 
  xhr.send(JSON.stringify({'message':message}));
}

