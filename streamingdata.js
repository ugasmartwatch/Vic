// randomNumber
var compassButton;
var compassOutput;

/*
var p;
var input;
var button;
var textNode;
*/

var BANGLE_CODE = `
Bangle.buzz();
Bangle.setLCDPower(1);
g.clear();
g.setFontAlign(0,0); // center font
g.setFont('6x8', 2);
g.drawString('Connected', g.getWidth()/2, g.getHeight()/2);
`;

var COMPASS_CODE = `
Bangle.setCompassPower(1);
Bangle.on('mag', function (xyz) {
  var d = [
    xyz.heading
  ];
Bluetooth.println(d);
});
`

var ACCEL_CODE = `
Bangle.on('accel', function (a) {
  var accel = [
    Math.round(a.x * 100),
    Math.round(a.y * 100),
    Math.round(a.z * 100)
  ]
  Bluetooth.println(accel.join(","));
});
`

// When we click the connect button...
var connection;
document.getElementById("btnConnect").addEventListener("click", function() {
  // disconnect if connected already
  if (connection) {
    connection.close();
    connection = undefined;
  }

  // Connect
  Puck.connect(function(c) {
    if (!c) {
      alert("Couldn't connect!");
      return;
    }
    connection = c;
    // console.log(connection);
    // console.log(`Random Number ${randomNumber}`);
    // update text

    // document.getElementById("result").innerHTML = "log in successful"

    // First, reset the Bangle
    connection.write("reset();\n", function() {
      // Wait for it to reset itself
      setTimeout(function() {
        // Now upload our code to it
        connection.write(BANGLE_CODE);
      }, 1500);
    });

  });
});

document.getElementById("btnCompass").addEventListener("click", addCompass);
document.getElementById("btnAccel").addEventListener("click", addAccel);

/*
function checkPin() {
    let userInput = Number(pin.value);

    if (success === 1) {
        return;
    }

    if (userInput === randomNumber) {
        document.getElementById("result").innerHTML = "Success";
        success = 1;

        // compass
        compassButton = document.createElement("button");
        var node1 = document.createTextNode("Compass");

        compassButton.appendChild(node1);
        compassButton.setAttribute('id', 'btnCompass');

        document.getElementById("compass").appendChild(compassButton);
        document.getElementById("btnCompass").addEventListener("click", addCompass);

        // accel
        accelButton = document.createElement("button");
        var node2 = document.createTextNode("Accelerometer");

        accelButton.appendChild(node2);
        accelButton.setAttribute('id', 'btnAccel');

        document.getElementById("accel").appendChild(accelButton);
        document.getElementById("btnAccel").addEventListener("click", addAccel);

        // output compass
        compassOutput = document.createElement("h2");
        compassOutput.setAttribute('id', 'outputCompass');

        document.getElementById("compass").appendChild(compassOutput);

        // output accelerometer
        accelOutput = document.createElement("h2");
        accelOutput.setAttribute('id', 'outputAxcel');

        document.getElementById("accel").appendChild(compassOutput);

    } else {
        document.getElementById("result").innerHTML = "Failure";
        success = 0;
    }
}
*/

// document.getElementById("btnPin").addEventListener("click", checkPin);

function addCompass() {

    connection.on("data", function(d) {

      // let text;

      d = Math.round(d);

      /*
      if (0 <= d <= 45) {
          text = "north";
      } else if (45 <= d <= 135) {
          text = "east";
      } else if (135 <= d <= 225) {
          text = "south";
      } else if (225 <= d <= 325) {
          text = "west";
      } else if (325 <= d <= 360) {
          text = "north";
      }
      */

        document.getElementById("resultCompass").innerHTML = `${d}`;
    });

    connection.write("reset();\n", function() {
        // Wait for it to reset itself
        setTimeout(function() {
          // Now upload our code to it
          connection.write(COMPASS_CODE);
        }, 1500);
      });
}

function addAccel() {

    connection.on("data", function(d) {

        document.getElementById("resultAccel").innerHTML = `${d}`;
    });

    connection.write("reset();\n", function() {
        // Wait for it to reset itself
        setTimeout(function() {
          // Now upload our code to it
          connection.write(ACCEL_CODE);
        }, 1500);
      });
}