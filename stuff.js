/*
var healthData = Bangle.getHealthStatus('day');
console.log(healthData);

Bangle.setHRMPower(1);


Bangle.on('HRM', function(hrm) {
  var d = [
      "H",
      hrm.bpm,
      hrm.confidence
    ];});


Bangle.on('accel',function(a) {
  var d = [
    "A",
    Math.round(a.x*100),
    Math.round(a.y*100),
    Math.round(a.z*100)
    ];
  Bluetooth.println(d.join(","));
});

*/

// setTimeout(function () {console.log(compassStuff);}, 1000);

Bangle.setCompassPower(0);

/*
Bangle.on('mag', function (xyz) {
  var d = [
    "a",
    xyz.heading
    ];
  Bluetooth.println(d.join(","));
});
*/