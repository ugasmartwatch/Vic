var menuItems = {
  " ":{value:"No"},
  "Add Health": () => addHRM(),
  "Show data": () => showData()
}; // menu items for recording and accessing data

var menu = E.showMenu(menuItems); // load menu items

var file = require("Storage").open("heartrate.csv", "a"); // open in append mode or create file if it doesn't exist
var hrm; // hrm

Bangle.on("HRM", function(h) {
  hrm = h;
});

// function to set the status for the app
function setStatus(msg) {
  menuItems[" "].value = msg; 
  menu.draw();
}

var d = new Date();

function addHRM() {

  // check if hrm is ready 
  if (hrm === undefined) {
    setStatus("Undefined");
    return;
  }
  
  // value to be added
  var csv = [
    d.getHours(),
    d.getMinutes(),
    hrm.bpm,
    hrm.confidence
  ];
  
  // combine into one line & set status
  file.write(csv.join(",")+"\n");
  setStatus("Written");
  
}

function showData() {
  var f = require("Storage").open("heartrate.csv","r"); // open in read mode
  var l = f.readLine();
  while (l!==undefined) {
    console.log(l);
    // Terminal.println(l);
    l = f.readLine();
  }
}


Bangle.loadWidgets();
Bangle.drawWidgets();
Bangle.setHRMPower(1);


