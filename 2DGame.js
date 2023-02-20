// initialize game variable
var timeCounter;
var win;
var inProgress;
var x,y;

// initial display resting stage
function iniDisplay() {
  // let points = [5,5,171,5,171,171,5,171]; 
  // g.drawPoly(points, true);
  Bangle.setLCDPower(1);
  g.clear();
  let points = [10,10,166,10,166,166,10,166];
  g.drawPoly(points, true);
  x = y = 88;
  g.drawCircle(x,y,7);
}

// instructions
function instruction() {
  let msg = "Simple balance game: keep the ball within the parameter for 30 seconds to win. Press side button to begin";
  E.showMessage(msg);
}

instruction();
setTimeout(iniDisplay, 3000);

function beginGame() {
  inProgress = true;
}

function winMsg(win) {
  if (win) {
   E.showMessage("You won!"); 
  } else {
   E.showMessage("You lost!");
  }
}

function trackAccel(a) {
  let accel = a;
  
  // update ball position based on acceleration data
  // update win condition based on position and time
  
  trackHRM();
  
}

function trackHRM() {
  
  Bangle.on("HRM", function(h) {
    var hrm = h;
    var heart = [
      "hrm",
       hrm.bpm,
       hrm.confidence
      ];
  });
  // update heart rate 
}

function checkWin(x, y) {
  // if the ball ever goes out of bounds
  if (x <= 10 || y <= 10 || x >= 166 || y >= 166) {
    inProgress = false;
    win = false;
  }
  
  // if time reaches 30 second
  if (timeCounter >= 30) {
    win = true;
  }
}

setWatch(beginGame, BTN);

// run loop while game is in progress
while (inProgress) {
  Bangle.on("accel", function(a) {
    var accel = [
      "a",
      Math.round(a.x*100),
      Math.round(a.y*100),
      Math.round(a.z*100)
      ];
  });
  trackAccel(accel);
  
}




