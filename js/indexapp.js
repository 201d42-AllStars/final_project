'use-strict';

var hexArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

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

var colorOne = '#ff0000';
var colorTwo = '#567d46';
var segments = 25;


// constructor function for user gradient array

function Gradient(hex1, segments, hex2) {
  this.left = hex1;
  this.right = hex2;
  this.segments = segments;
  this.userArrayRGB = [];
  this.userArrayHex = [];
}

var defaultGradient = new Gradient('#ff0000', 20, '#567d46');

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

bothColors.push(convertToRGB(colorOne));
bothColors.push(convertToRGB(colorTwo));


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
  var redSpacing = differenceArray[0] / segments;
  var greenSpacing = differenceArray[1] / segments;
  var blueSpacing = differenceArray[2] / segments;

  incrementArray = [redSpacing, greenSpacing, blueSpacing];
}

spacing();


// add numbers to red, green, and blue arrays

function rgbArrayPush() {
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

  for (var i = 2; i < segments; i++) {
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

function generateuserArrayRGB() {
  for (var i = 0; i < segments; i++) {
    userArrayRGB.push(`rgb(${redArrayRGB[i]},${greenArrayRGB[i]},${blueArrayRGB[i]})`);
  }
}

generateuserArrayRGB();


// convert RGB back to Hex

function convertToHex() {
  for (var i = 0; i < redArrayRGB.length; i++) {
    var RGB = redArrayRGB[i];
    var one = Math.floor( RGB / 16 );
    var two = RGB % 16;
    var hex = `${hexArray[one]}${hexArray[two]}`;
    redArrayHex.push(hex);
  }
  for (i = 0; i < greenArrayRGB.length; i++) {
    RGB = greenArrayRGB[i];
    one = Math.floor( RGB / 16 );
    two = RGB % 16;
    hex = `${hexArray[one]}${hexArray[two]}`;
    greenArrayHex.push(hex);
  }
  for (i = 0; i < blueArrayRGB.length; i++) {
    RGB = blueArrayRGB[i];
    one = Math.floor( RGB / 16 );
    two = RGB % 16;
    hex = `${hexArray[one]}${hexArray[two]}`;
    blueArrayHex.push(hex);
  }
  for (i = 0; i < userArrayRGB.length; i++) {
    var hexRed = redArrayHex[i].toUpperCase();
    var hexGreen = greenArrayHex[i].toUpperCase();
    var hexBlue = blueArrayHex[i].toUpperCase();
    // console.log(hexRed,hexGreen,hexBlue);
    userArrayHex.push(`#${hexRed}${hexGreen}${hexBlue}`);
  }
}

convertToHex();


// create chart for user input

function displayChart() {

  // if (Images.resultsChart) Images.resultsChart.destroy();

  var resultsChart = new Chart(Images.chart, {
    type: 'doughnut',
    data: {
      labels: Images.allNames,
      datasets: [{
        label: 'Votes Per Image',
        data: Images.allVotes,
        backgroundColor: ['rgb(255,204,204)', 'rgb(255,229,204)', 'rgb(255,255,204)', 'rgb(229,255,204)', 'rgb(204,255,204)', 'rgb(204,255,229)', 'rgb(204,255,255)', 'rgb(204,229,255)', 'rgb(204,204,255)', 'rgb(229,204,255)', 'rgb(255,204,255)', 'rgb(255,204,229)', 'rgb(255,102,102)', 'rgb(255,178,102)', 'rgb(255,255,102)', 'rgb(178,255,102)', 'rgb(102,255,255)', 'rgb(102,178,255)', 'rgb(178,102,255)', 'rgb(255,102,255)']
      }],
    },
    options: {
      legend: {
        position: 'top',
        labels: {
          fontFamily: "'Nova Mono', monospace",
          fontSize: 10,

        },
      },
      scales: {
        yAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          }
        }],
        xAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          }
        }]
      }
    }
  });
};


