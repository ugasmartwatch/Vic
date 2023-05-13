// let array = ["clock", "pet", "app"];
let counter = 0;

let array = ["clock", "pet", "weather", {
  h : 40, c : 8,
  draw : (idx, r) => {
    g.setBgColor((idx&1)?"#666":"#999").clearRect(r.x,r.y,r.x+r.w-1,r.y+r.h-1);
    g.setFont("6x8:2").drawString("Item Number\n"+idx,r.x+10,r.y+4);
  },
  select : (idx) => console.log("You selected ", idx)
}];

E.showMessage(array[counter]);

function stuff(idx) {
  E.showMessage("App " + idx);
}

function returning() {
  E.showScroller();
  g.clear();
  E.showMessage("Returning");
  setTimeout(function() {
    counter = 0;
    E.showMessage(array[counter]);
  }, 1000);
  
}

Bangle.on('swipe', function(directionLR, directionUD) {
  if (directionLR == -1) {
    // counter++;
    if (counter == 3) {
      g.clear();
      E.showScroller({
        h : 40, c : 4,
        draw : (idx, r) => {
          g.setBgColor((idx&1)?"#666":"#999").clearRect(r.x,r.y,r.x+r.w-1,r.y+r.h-1);
          g.setFont("6x8:2").drawString("Item Number\n"+idx,r.x+10,r.y+4);
        },
        // select : (idx) => console.log("You selected ", idx),
        select : (idx) => stuff(idx),
        back : () => returning(),
        /*
        remove : () => {
          // cleanup the timeout to not leave anything behind after being removed from ram
          if (lockTimeout) clearTimeout(lockTimeout);
          Bangle.removeListener("lock", lockHandler);
        }
        */
      });
    }
    
    if (counter < 3) {
      g.clear();
      E.showMessage(array[counter]);
      counter++;
    }
    
  } else if (directionLR == 1) {
    if (counter > 0) counter--;
    E.showMessage(array[counter]);
  }
});