const video = document.getElementById("CelebrateVideo");
let counter = 0;
let intervalId;
let isIncrementing = true; 

const incrementCounter = () => {
  if (isIncrementing) {
    counter += 3.5;
    console.log(counter);
    video.height = counter;

    if (counter >= 700) {
      isIncrementing = false; 
    }
  } else {
    counter -= 3.5;
    console.log(counter);
    video.height = counter;

    if (counter <= 0) {
      isIncrementing = true; 
    }
  }
};

intervalId = setInterval(incrementCounter, 1);