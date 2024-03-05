let profileclk = () => {
  window.location.href = "/profile";
};

var ws = new WebSocket("ws://localhost:8000/ws");
ws.onmessage = function (event) {
  console.log("received");
  console.log(event.data);
  res = event.data;
  document.getElementById('prediction').style.display = 'block';
  document.getElementById('contact').style.display = 'block';
  document.getElementById('amount').style.display = 'block';
  document.getElementById('amount').innerText = res;
};
function sendMessage(event) {
  let car_name = document.getElementsByName("car_name")[0].value;
  let kmdriven = document.getElementsByName("kmdriven")[0].value;
  let mileage = document.getElementsByName("mileage")[0].value;
  let engine = document.getElementsByName("engine")[0].value;
  let power = document.getElementsByName("power")[0].value;
  let year = document.getElementsByName("year")[0].value;
  let Seats = document.getElementsByName("Seats")[0].value;
  let fuel_type = document.getElementsByName("fuel_type")[0].value;
  let Transmission = document.getElementsByName("Transmission")[0].value;
  let Ownertype = document.getElementsByName("Ownertype")[0].value;
  
  let data = {
    car_name: car_name,
    kmdriven: kmdriven,
    mileage: mileage,
    engine: engine,
    power: power,
    year: year,
    Seats: Seats,
    fuel_type: fuel_type,
    Transmission: Transmission,
    Ownertype: Ownertype,
  };
  
  console.log("sent");
  console.log(data);
  ws.send(JSON.stringify(data));
  event.preventDefault();
}
