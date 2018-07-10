# Make a traffic light
Adapted from: http://www.makeuseof.com/tag/arduino-traffic-light-controller/

## Learning Goals
- Combine your knowledge from the last few activities into one finished product
- Plan a new feature and then implement it
- Troubleshoot your own code
- **Finding Errors in a Tutorial!**
    - WHAT?! There are a few minor errors in this tutorial. You will need to use your awesome brain to find and correct them.

## Programming
We’ll start by defining variables so that we can address the lights by name rather than a number.

### Initial Light Change
Start a new Arduino project, and begin with these lines:

```
#include <Adafruit_CircuitPlayground.h>

int redLight = 0;
int yellowLight = 1;
int greenLight = 2;
long redColor = 0xFF0000;
long yellowColor = 0x00FFFF;
long greenColor = 0x00FF00;
long off = 0x000000;
```

Next, let’s add the setup function, where all we need to do is setup the C.P. library.

```
void setup() {
  CircuitPlayground.begin();
}
```

Now for the actual logic of a traffic light. Let's create a separate function for changing the lights.

```
void loop() {
  changeLights();
  delay(15000);
}

void changeLights() {
  //green off, yellow for 3 seconds
  CircuitPlayground.setPixelColor(greenLight, off);
  CircuitPlayground.setPixelColor(yellowLight, yellowColor);
  delay(3000);
  
  //turn off yellow, then turn on red for 5 seconds
  CircuitPlayground.setPixelColor(yellowLight, off);
  CircuitPlayground.setPixelColor(redLight, redColor);
  delay(5000);
  
  //red and yellow on for 2 seconds (red is already on though)
  CircuitPlayground.setPixelColor(yellowLight, yellowLight);
  delay(2000);
  
  //turn off red and yellow, then turn on green
  CircuitPlayground.setPixelColor(redLight, off);
  CircuitPlayground.setPixelColor(yellowLight, off);
  CircuitPlayground.setPixelColor(greenLight, greenColor);
  
}
```

Now, upload and run. You should have a working traffic light that changes every 15 seconds.

### Pedestrian Button
Let’s add in a pushbutton for pedestrians to change the light whenever they like.

Now, in the loop part of the code, instead of changing the lights every 15 seconds, we’re going to read the state of the pushbutton switch instead, and only change the lights when it’s activated.

In the setup function, add a new line to start the traffic lights in the green stage. Without this initial setting, they would be turned off, until the first time a changeLights() was initiated using a function.

```
CircuitPlayground.setPixelColor(greenLight, greenColor);
```

Change the entire loop function to the following instead:

```
void loop(){
  if (CircuitPlayground.leftButton()){
    changeLights();
    delay(15000); // wait for 15 seconds
  }
}
```

By waiting inside the “if” statement for 15 seconds, we ensure the traffic lights can’t change for at least that duration. Once 15 seconds is up, the loop restarts. Each restart of the loop, we will read the state of the button again, but if it isn’t pressed then the “if” statement never activates, the lights never change, and it simply restarts again.

## Improve on your own
You should add some new features to the traffic light to make it more interesting using the knowledge you have gained this week.

Play around with the code, adjust it, and most importantly have fun.
