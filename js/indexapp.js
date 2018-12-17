'use-strict';

var hexArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

var bothColors = [];

var differenceArray = [];

var incrementArray = [];

var redArray = [];
var greenArray = [];
var blueArray = [];

var userArray = [];

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


// generate user array

function generateUserArray() {
  for (var i = 0; i < segments; i++) {
    userArray.push(`rgb(${redArray[i]},${greenArray[i]},${blueArray[i]})`);
  }
}

generateUserArray();


// function convertToHex(decimal) {
//   var resultOne      = Math.floor(decimal / 16);
//   var remainderOne   = decimal % 16;
//   var resultTwo      = Math.floor(resultOne / 16);
//   var remainderTwo   = resultOne % 16;
//   var resultThree    = Math.floor(resultTwo / 16);
//   var remainderThree = resultTwo % 16;
//   var resultFour     = Math.floor(resultThree / 16);
//   var remainderFour  = resultThree % 16;
//   var resultFive     = Math.floor(resultFour / 16);
//   var remainderFive  = resultFour % 16;
//   var remainderSix   = resultFive % 16;

//   var one   = hexArray[remainderSix];
//   var two   = hexArray[remainderFive];
//   var three = hexArray[remainderFour];
//   var four  = hexArray[remainderThree];
//   var five  = hexArray[remainderTwo];
//   var six   = hexArray[remainderOne];

//   return `#${one}${two}${three}${four}${five}${six}`;
// }

// convertToHex(14614367);


// function to take in beginning and ending hex values and calculate the difference between the two
// function spacing() {
//   var number1 = convertToDecimal(colorOne);
//   var number2 = convertToDecimal(colorTwo);
//   var difference = Math.abs(number1 - number2);
//   var result = difference / segments;
//   var floored = Math.floor(result);
//   console.log('This is the spacing:', floored);
//   return floored;
// }

// spacing();

// // generate array of hex values - DOES NOT FUNCTION PROPERLY

// generateUserArray();

