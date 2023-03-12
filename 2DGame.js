// initialize game variable
var time;
var win;
var inProgress;
var x,y;
var dx, dy;
dx = dy = 0;
var points = [10,10,166,10,166,166,10,166];


var hrmArr = [];

// initial display resting stage
function iniDisplay() {
  // let points = [5,5,171,5,171,171,5,171]; 
  // g.drawPoly(points, true);
  Bangle.setLCDPower(1);
  g.clear();
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
setTimeout(iniDisplay, 6500);

function beginGame() {
  console.log("HELLO THE GAME SHOULD BE STARTING NOW");

  
  // set the game to being in progress
  inProgress = true;
  
  var accel;
  var accelerometer = [];

  Bangle.on("accel", function(a) {
    accel = a;
    accelerometer = [
      "a",
      Math.round(accel.x*100),
      Math.round(accel.y*100),
      Math.round(accel.z*100)
      ];
    
    setTimeout(function (a) {trackAccel(accelerometer);}, 1000);
    
  });
  
}

function trackAccel(a) {
  
  // console.log(a);
  
  // update ball position based on acceleration data
  // update win condition based on position and time
  
  if (a[1] >= 0) {
    dx = -Math.pow(a[1],2)/2;
  } else {
    dx = Math.pow(a[1],2)/2;
  }
    
  if (a[2] >= 0) {
    dy = -Math.pow(a[2],2)/2;
  } else {
    dy = Math.pow(a[2],2)/2;
  }
  
  /*
  setTimeout(function() {
    console.log(dx);
    console.log(dy);
  }, 1000);
  */
  
  g.clear();
  g.drawPoly(points, true);
  
  x = x + dx/150;
  y = y + dy/150;
  
  g.setColor(1);
  g.drawCircle(x,y,7);
  
  if (x > 10 && x < 166 & y > 10 && y < 166) {
    // console.log("Tracking hrm");
    trackHRM();
    
  } else { 
    win = false;
    winCondition(win);

  }
  
}

function trackHRM() {
  
  Bangle.setHRMPower(1);
  Bangle.on("HRM", function(h) {
    var hrm = h;
    var heart = [
      "hrm",
       hrm.bpm,
       hrm.confidence
      ];
    
    if (heart[2] >= 50 && hrmArr.length < 50) {
      hrmArr.push(heart[1]);
    } 
    
    if (hrmArr.length >= 50) {
     var bpmSum = hrmArr.reduce(function (x, y) {
        return x + y;
    }, 0);
      
      var bpmAvg = bpmSum / hrmArr.length;
      // Bangle.reset();
      E.showMessage('Your heartrate:' + bpmAvg);
      
    }
    
  });
  
  // update heart rate 
}

function winCondition(win) {
  Bangle.reset();
  if (win) {
    E.showMessage("You've won!");
  } else {
    E.showMessage("You've lost!");
  }
}


/*
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
*/

function winMsg(win) {
  if (win) {
    console.log("You've won!");
    Bangle.setHRMPower(0);
    reset();
    E.showMessage("You won!"); 
  } else {
    console.log("You've lost!");
    Bangle.setHRMPower(0);
    reset();
    E.showMessage("You lost!");
  }
}

setWatch(beginGame, BTN);



