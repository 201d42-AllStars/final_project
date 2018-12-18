'use-strict';

var hexArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
var chart = document.getElementById('gradient-chart');
Gradient.left = document.getElementById('color1');
Gradient.right = document.getElementById('color2');
Gradient.segments = document.getElementById('segmentcount');
Gradient.data = [];


var bothColors = [];

var differenceArray = [];

var incrementArray = [];

var redArrayRGB = [];
var greenArrayRGB = [];
var blueArrayRGB = [];
var userArrayRGB = [];

var redArrayHex = [];
var greenArrayHex = [];
var blueArrayHex = [];
var userArrayHex = [];

// var colorOne = '#ff0000';
// var colorTwo = '#567d46';
// var segments = 25;


// constructor function for user gradient array

function Gradient(hex1, segments, hex2) {
  this.left = hex1;
  this.right = hex2;
  this.segments = segments;
  this.userArrayRGB = [];
  this.userArrayHex = [];
}

new Gradient(Gradient.left.value, Gradient.segments.value, Gradient.right.value);

// convert the hex code to RGB

function convertToRGB(hexcode) {
  var one   = hexcode.charAt(1);
  var two   = hexcode.charAt(2);
  var three = hexcode.charAt(3);
  var four  = hexcode.charAt(4);
  var five  = hexcode.charAt(5);
  var six   = hexcode.charAt(6);

  var firstDec  = hexArray.indexOf(one);
  var secondDec = hexArray.indexOf(two);
  var thirdDec  = hexArray.indexOf(three);
  var fourthDec = hexArray.indexOf(four);
  var fifthDec  = hexArray.indexOf(five);
  var sixthDec  = hexArray.indexOf(six);

  var redValue   = ( firstDec * 16 ) + secondDec;
  var greenValue = ( thirdDec * 16 ) + fourthDec;
  var blueValue  = ( fifthDec * 16 ) + sixthDec;

  var rgbColor = [redValue, greenValue, blueValue];

  return rgbColor;
}

bothColors.push(convertToRGB(Gradient.left.value));
bothColors.push(convertToRGB(Gradient.right.value));


// function to measure distance between 2 RGB values

function differences(arrayOfArrays) {
  var redDiff = arrayOfArrays[0][0] - arrayOfArrays[1][0];
  var absRedDiff = Math.abs(redDiff);

  var greenDiff = arrayOfArrays[0][1] - arrayOfArrays[1][1];
  var absGreenDiff = Math.abs(greenDiff);

  var blueDiff = arrayOfArrays[0][2] - arrayOfArrays[1][2];
  var absBlueDiff = Math.abs(blueDiff);

  differenceArray = [absRedDiff, absGreenDiff, absBlueDiff];
}

differences(bothColors);


// grab difference numbers and divide by segments

function spacing() {
  var redSpacing = differenceArray[0] / Gradient.segments.value;
  var greenSpacing = differenceArray[1] / Gradient.segments.value;
  var blueSpacing = differenceArray[2] / Gradient.segments.value;

  incrementArray = [redSpacing, greenSpacing, blueSpacing];
}

spacing();


// add numbers to red, green, and blue arrays

function rgbArrayPush() {
  redArrayRGB = [];
  greenArrayRGB = [];
  blueArrayRGB = [];

  var redFirst = bothColors[0][0];
  var greenFirst = bothColors[0][1];
  var blueFirst = bothColors[0][2];

  var redLast = bothColors[1][0];
  var greenLast = bothColors[1][1];
  var blueLast = bothColors[1][2];

  var redSpacing = incrementArray[0];
  var greenSpacing = incrementArray[1];
  var blueSpacing = incrementArray[2];

  redArrayRGB.push(redFirst);
  greenArrayRGB.push(greenFirst);
  blueArrayRGB.push(blueFirst);

  var nextRed = redFirst;
  var nextGreen = greenFirst;
  var nextBlue = blueFirst;

  for (var i = 2; i < Gradient.segments.value; i++) {
    if(redFirst > redLast) {
      nextRed = nextRed - redSpacing;
    } else {
      nextRed = nextRed + redSpacing;
    }

    if(greenFirst > greenLast) {
      nextGreen = nextGreen - greenSpacing;
    } else {
      nextGreen = nextGreen + greenSpacing;
    }

    if(blueFirst > blueLast) {
      nextBlue = nextBlue - blueSpacing;
    } else {
      nextBlue = nextBlue + blueSpacing;
    }


    redArrayRGB.push(nextRed);
    greenArrayRGB.push(nextGreen);
    blueArrayRGB.push(nextBlue);
  }

  redArrayRGB.push(redLast);
  greenArrayRGB.push(greenLast);
  blueArrayRGB.push(blueLast);
}

rgbArrayPush();


// floor values in rgbArray so they render correctly.

function floorRGB(colorArray) {
  for (var i = 0; i < colorArray.length; i++) {
    colorArray[i] = Math.floor( colorArray[i]);
  }
}

floorRGB(redArrayRGB);
floorRGB(greenArrayRGB);
floorRGB(blueArrayRGB);


// generate user array

function generateUserArrayRGB() {
  userArrayRGB = [];
  for (var i = 0; i < Gradient.segments.value; i++) {
    userArrayRGB.push(`rgb(${redArrayRGB[i]},${greenArrayRGB[i]},${blueArrayRGB[i]})`);
  }
}

generateUserArrayRGB();


// convert RGB back to Hex

function convertToHex() {
  redArrayHex = [];
  for (var i = 0; i < redArrayRGB.length; i++) {
    var RGB = redArrayRGB[i];
    var one = Math.floor( RGB / 16 );
    var two = RGB % 16;
    var hex = `${hexArray[one]}${hexArray[two]}`;
    redArrayHex.push(hex);
  }
  greenArrayHex = [];
  for (i = 0; i < greenArrayRGB.length; i++) {
    RGB = greenArrayRGB[i];
    one = Math.floor( RGB / 16 );
    two = RGB % 16;
    hex = `${hexArray[one]}${hexArray[two]}`;
    greenArrayHex.push(hex);
  }
  blueArrayHex = [];
  for (i = 0; i < blueArrayRGB.length; i++) {
    RGB = blueArrayRGB[i];
    one = Math.floor( RGB / 16 );
    two = RGB % 16;
    hex = `${hexArray[one]}${hexArray[two]}`;
    blueArrayHex.push(hex);
  }
  userArrayHex = [];
  for (i = 0; i < userArrayRGB.length; i++) {
    var hexRed = redArrayHex[i];
    var hexGreen = greenArrayHex[i];
    var hexBlue = blueArrayHex[i];
    // console.log(hexRed,hexGreen,hexBlue);
    userArrayHex.push(`#${hexRed}${hexGreen}${hexBlue}`);
  }
}

convertToHex();

// generate random number

function randomNum() {
  var random = Math.random() * (25 - 10) + 10;
  var randomRoundedDown = Math.floor(random);
  return randomRoundedDown;
}

// create array of random numbers for data of sample chart

function randomData() {
  Gradient.data = [];
  for (var i = 0; i < userArrayHex.length; i++) {
    Gradient.data.push(randomNum());
  }
}

randomData();


function updateLeft() {
  var newLeft = convertToRGB(Gradient.left.value);

  bothColors[0] = newLeft;
  differences(bothColors);
  spacing();
  rgbArrayPush();
  floorRGB(redArrayRGB);
  floorRGB(greenArrayRGB);
  floorRGB(blueArrayRGB);
  generateUserArrayRGB();
  convertToHex();
  randomData();
  displayChart();
}

function updateRight() {
  var newRight = convertToRGB(Gradient.right.value);

  bothColors[1] = newRight;
  differences(bothColors);
  spacing();
  rgbArrayPush();
  floorRGB(redArrayRGB);
  floorRGB(greenArrayRGB);
  floorRGB(blueArrayRGB);
  generateUserArrayRGB();
  convertToHex();
  randomData();
  displayChart();
}

function updateSegments() {
  differences(bothColors);
  spacing();
  rgbArrayPush();
  floorRGB(redArrayRGB);
  floorRGB(greenArrayRGB);
  floorRGB(blueArrayRGB);
  generateUserArrayRGB();
  convertToHex();
  randomData();
  displayChart();
}



Gradient.left.addEventListener('input', updateLeft);
Gradient.right.addEventListener('input', updateRight);
Gradient.segments.addEventListener('input', updateSegments);




// create chart for user input

function displayChart() {

  if (displayChart) displayChart.destroy();

  var displayChart = new Chart(chart, {
    type: 'bar',
    data: {
      labels: userArrayHex,
      datasets: [{
        label: '',
        data: Gradient.data,
        backgroundColor: userArrayHex,
      }],
    },
    options: {
      legend: {
        position: 'top',
        labels: {
        },
      },
      scales: {
        yAxes: [{
          gridLines: {
            // display: false,
          },
          ticks: {
            // display: false,
          }
        }],
        xAxes: [{
          gridLines: {
            // display: false,
          },
          ticks: {
            // display: false,
          }
        }]
      }
    }
  });
}

displayChart();


