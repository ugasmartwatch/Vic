// initialize game variable
var time;
var win;
var inProgress;
var x,y;
var dx, dy;
dx = dy = 0;
var points = [10,10,166,10,166,166,10,166];

var diff;

var hrmArr = [];
var x1, y1 = 0;
var obstacles;
var border = [];

function randomCenters () {
  
    for (let i = 0; i < 5; i++) {

      while (x1 == 0 || y1 == 0 || Math.abs(x1-88) < 7 || Math.abs(y1-88) < 7) {
        x1 = Math.random() * (166-10) + 10;
        y1 = Math.random() * (166-10) + 10;
      }
      // console.log(x, y);
      obstacles = [x1-10, y1-10, x1+10, y1-10, x1+10, y1+10, x1-10, y1+10]; 
      border.append(obstacles);
      g.drawPoly(obstacles, true);

    }
  
}

function drawBorder () {
  Bangle.setLCDPower(1);
  g.clear();
  g.drawPoly(points, true);
  
}

// initial display resting stage
function iniDisplay(diff) {
  // let points = [5,5,171,5,171,171,5,171]; 
  // g.drawPoly(points, true);
  
  if (diff == 2) randomCenters();
  
  drawBorder();
  x = y = 88;
  g.drawCircle(x,y,7);

  
}

// instructions
function instruction() {
  // let msg = "Simple balance game: keep the ball within the parameter for 30 seconds to win. Press side button to begin.";
  
  let msg = "Simple balance game: keep the ball within the parameter for 30 seconds to win. Choose difficulty on next screen.";
  
  E.showMessage(msg);
}

function difficulty() {
  let menu = {
    "":{value:"Difficulty?"},
    "Easy": () => beginGame(1),
    "Hard": () => beginGame(2)
  };
  E.showMenu(menu);
}

instruction();
setTimeout(difficulty, 6500);

function beginGame(d) {
  diff = d;
  iniDisplay(diff);
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
    // console.log(accelerometer);
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
  drawBorder(diff);
  
  x = x + dx/150;
  y = y + dy/150;
  
  g.setColor(1);
  g.drawCircle(x,y,7);
  
  if (x > 10 && x < 166 & y > 10 && y < 166) {
    // console.log("Tracking hrm");
    
    trackHRM();
    
  } else { 
    reset();
    E.showMessage("You've lost!");
    /*
    win = false;
    winCondition(win);
    */
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
    
    if (heart[2] >= 70 && hrmArr.length < 50) {
      hrmArr.push(heart[1]);
    } 
    
    if (hrmArr.length >= 50) {
     var bpmSum = hrmArr.reduce(function (x, y) {
        return x + y;
    }, 0);
      
      var bpmAvg = bpmSum / hrmArr.length;
      reset();
      E.showMessage("Your heartrate:" + bpmAvg);
      
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
    setTimeout(E.showMessage("You lost!"), 3000);
  }
}
*/

// setWatch(difficulty, BTN);



