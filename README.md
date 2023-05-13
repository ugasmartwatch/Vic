# Victor's GitHub Repository

This repository consists of the work of Victor Qiu for UGA Smart Watch.

## streaming data website
### streamingdata.html & streamingdata.js
This website allows the user to connect to the bangle.js smartwatch using the puckjs library.
The connect button will pop up a device selection screen, which will allow the user to 
choose their specific bangle.js smart watch.

After connecting, the user will be able to view the output of the magnetometer and the 
accelerometer live by clicking on "compass" or "accel".

## 2DGame
### 2DGameNew.js
This game is built to detect the user's heart rate while the user is trying to 
balance a sphere and avoid obstacles on the screen.
It uses the accelerometer data to keep track of wrist movements.

When the user first launches the game, there will be a difficulty selector with 
"easy" or "hard" mode as options; hard mode randomly generates 5 squares that 
the user must avoid hitting, while easy mode only has the border that the user has 
to avoid. The recorded heart rate is displayed on the screen at the end.

## health recording
### healthdataapp.js
This application demonstrates the ability to record data on the bangle.js smart watch.
There are two buttons in this app: the "Add Health" button records the current heart rate,
while the "Show data" button prints out the recorded data and the time it was recorded.

## Watch Layout
### app_layout_v1.js, watchface_layout_v1.js, watchface_layout_v2.js
app_layout_v1.js demonstrates the concept of having information on different screens and
allowing the user to swipe left and right to access the information. The app drawer for the 
watch itself is positioned at the very end of the swipe cycle.

watchface_layout_v1 is a watchface using the clock_info module to display basic information 
about the watch. However, adding a custom clock_info screen proves to be more difficult 
than necessary, so watchface_layout_v2.js was built.

watchface_layout_v2.js uses custom icons and displays the step count, heart rate, and weather data.
It can be customized to display the pet information by repositioning the weather data to be next
to the date, or it can be combined with app_layout_v1.js to create a swipe menu that stores the 
data in a new page.
