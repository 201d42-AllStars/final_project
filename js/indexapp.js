'use-strict';

var hexArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

var bothColors = [];

var differenceArray = [];

var incrementArray = [];

var redArray = [];
var greenArray = [];
var blueArray = [];

var userArrayRGB = [];
var userArrayHex = [];

var colorOne = '#ff0000';
var colorTwo = '#567d46';
var segments = 5;


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

  redArray.push(redFirst);
  greenArray.push(greenFirst);
  blueArray.push(blueFirst);

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


    redArray.push(nextRed);
    greenArray.push(nextGreen);
    blueArray.push(nextBlue);
  }

  redArray.push(redLast);
  greenArray.push(greenLast);
  blueArray.push(blueLast);
}

rgbArrayPush();


// floor values in rgbArray so they render correctly.

function floorRGB(colorArray) {
  for (var i = 0; i < colorArray.length; i++) {
    colorArray[i] = Math.floor( colorArray[i]);
  }
}

floorRGB(redArray);
floorRGB(greenArray);
floorRGB(blueArray);


// generate user array

function generateuserArrayRGB() {
  for (var i = 0; i < segments; i++) {
    userArrayRGB.push(`rgb(${redArray[i]},${greenArray[i]},${blueArray[i]})`);
  }
}

generateuserArrayRGB();

// convert RGB back to Hex

function convertToHex() {
  for (var i = 0; i < redArray.length; i++) {
    var RGB = redArray[i];
    var one = Math.floor( RGB / 16 );
    var two = RGB % 16;
    var hex = hexArray[one]hexArray[]
    console.log(one, two);
  }
}

convertToHex();
