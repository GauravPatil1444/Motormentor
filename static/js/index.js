let data1 = " ";
let data2 = " ";
let arr = [];
// sessionStorage.clear();
let profileclk = ()=>{
    window.location.href = "/profile"
}
let content = document.createElement("div");
content.classList.add("message");
let send = ()=>{
  if(sessionStorage.getItem("status")==1){

    document.getElementById("Loading").style.display = "block";
    // document.getElementById('content').innerHTML = ' '; 
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
            sessionStorage.setItem('data1',JSON.stringify(data1));
            console.log("check1");
          } catch (error) {
            document.getElementById("carname").innerHTML = "<h1>Car not found</h1>"
          }
          if(arr.length==2){
            // document.getElementById('table').innerHTML = data1['table'];
            document.getElementById("content").style.display = "none";
            document.getElementById("content1").style.display = "block";
            carname = document.getElementById('carname1');
            carname.innerHTML = data1["carname"]+"<br>Car price<br>"+data1['price']+"<br>";
      
            document.getElementById("imgd1").innerHTML =
              "<img src=" + data1["img"] + "></img>";
           
            let fcontent = document.createElement('div');
            fcontent.id = "fcontent";
            fcontent.innerHTML = "<br><br><div id='h3'><h3>Key features : </h3></div><br>";
            document.getElementById("kfeatures").appendChild(fcontent);
            let features = document.createElement("div");
            features.id = "features";
            document.getElementById("fcontent").appendChild(features);
            let features1 = document.createElement('div');
            features1.id = "features1";
            data1["features"]!="None"?features1.innerHTML = 
              "<br>"+data1["features"]:features1.innerHTML = " ";
            document.getElementById("features").appendChild(features1);

            let scontent = document.createElement('div');
            scontent.id = "scontent";
            scontent.innerHTML = "<br><br><div id='h3'><h3>Specifications: </h3></div><br>";
            document.getElementById("specifications").appendChild(scontent);
            let specs = document.createElement("div");
            specs.id = "specs";
            document.getElementById("scontent").appendChild(specs);
            let specs1 = document.createElement('div');
            specs1.id = "specs1";
            data1["specs"]!="None"?specs1.innerHTML = 
              "<br>"+data1["specs"]:specs1.innerHTML = " ";
              document.getElementById("specs").appendChild(specs1);
           
              let mcontent = document.createElement('div');
              mcontent.id = "mcontent";
              mcontent.innerHTML = "<br><br><div id='h3'><h3>Mileage: </h3></div><br>";
              document.getElementById("avg").appendChild(mcontent);
              let mileage = document.createElement("div");
              mileage.id = "mileage";
              document.getElementById("mcontent").appendChild(mileage);
              let mileage1 = document.createElement('div');
              mileage1.id = "mileage1";
              data1["mileage"]!="None"?mileage1.innerHTML = 
              "<br>"+data1["mileage"]:mileage1.innerHTML = " ";
            document.getElementById("mileage").appendChild(mileage1);

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
        document.getElementById("content1").style.display = "none";
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
            document.getElementById("content").innerHTML = "<h1>Car not found</h1>"
          }
          if(arr.length==4){
            console.log(200);
            sessionStorage.setItem('data2',JSON.stringify(data2));
            console.log("check2")
          }
          // setTimeout(func(),5000);
          data1 = JSON.parse(sessionStorage.getItem('data1'));
          data2 = JSON.parse(sessionStorage.getItem('data2'));
          setTimeout(()=>{
            carname = document.createElement('div');
            carname.id = "carname";
            carname.innerHTML = data1["carname"]+" VS "+data2["carname"]+"<br>Car price : <br>"+data1['price']+" VS "+data2['price'];
          document.getElementById("content").appendChild(carname);

          document.getElementById("img").style.display = "flex";
          document.getElementById("img1").innerHTML =
            "<img src=" + data1["img"] + "></img>";
          document.getElementById("img2").innerHTML =
          "<img src=" + data2["img"] + "></img>";
          let fcontent = document.createElement('div');
          fcontent.id = "fcontent";
          fcontent.innerHTML = "<br><br><div id='h3'><h3>Key features : </h3></div><br>";
          document.getElementById("content").appendChild(fcontent);
          let features = document.createElement("div");
          features.id = "features";
          document.getElementById("fcontent").appendChild(features);
          let features1 = document.createElement('div');
          features1.id = "features1";
          data1["features"]!="None"?features1.innerHTML = 
            "<br>"+data1["features"]:features1.innerHTML = " ";
            document.getElementById("features").appendChild(features1);
            let features2 = document.createElement('div');
            features2.id = "features2";
            data2["features"]!="None"?features2.innerHTML = 
            "<br>"+data2["features"]:features2.innerHTML = " ";  
            document.getElementById("features").appendChild(features2);
            
          let scontent = document.createElement('div');
          scontent.id = "scontent";
          scontent.innerHTML = "<br><br><div id='h3'><h3>Specifications: </h3></div><br>";
          document.getElementById("content").appendChild(scontent);
          let specs = document.createElement("div");
          specs.id = "specs";
          document.getElementById("scontent").appendChild(specs);
          let specs1 = document.createElement('div');
          specs1.id = "specs1";
          data1["specs"]!="None"?specs1.innerHTML = 
            "<br>"+data1["specs"]:specs1.innerHTML = " ";
          document.getElementById("specs").appendChild(specs1);
          let specs2 = document.createElement('div');
          specs2.id = "specs2";
          data2["specs"]!="None"?specs2.innerHTML = 
            "<br>"+data2["specs"]:specs2.innerHTML = " ";  
          document.getElementById("specs").appendChild(specs2);
          
          let mcontent = document.createElement('div');
          mcontent.id = "mcontent";
          mcontent.innerHTML = "<br><br><div id='h3'><h3>Mileage: </h3></div><br>";
          document.getElementById("content").appendChild(mcontent);
          let mileage = document.createElement("div");
          mileage.id = "mileage";
          document.getElementById("mcontent").appendChild(mileage);
          let mileage1 = document.createElement('div');
          mileage1.id = "mileage1";
          data1["mileage"]!="None"?mileage1.innerHTML = 
          "<br>"+data1["mileage"]:mileage1.innerHTML = " ";
          document.getElementById("mileage").appendChild(mileage1);
          let mileage2 = document.createElement('div');
          mileage2.id = "mileage2";
          data2["mileage"]!="None"?mileage2.innerHTML = 
          "<br>"+data2["mileage"]:mileage2.innerHTML = " ";  
          document.getElementById("mileage").appendChild(mileage2);
        },5000)
      }
      xhr2.send(JSON.stringify({'data':send_data}));
    }
    
  } 
  xhr.send(JSON.stringify({'message':message}));
}
else{
  alert("You need to be logged in to use this feature");
}
}