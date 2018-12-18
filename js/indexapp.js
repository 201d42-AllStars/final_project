'use-strict';

Gradient.hexNumberArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
Gradient.chart = document.getElementById('gradient-chart');
Gradient.left = document.getElementById('color1');
Gradient.right = document.getElementById('color2');
Gradient.segments = document.getElementById('segmentcount');
Gradient.table = document.getElementById('gradient-table');
Gradient.currentRow = document.getElementById('current-gradient-row');

Gradient.data = [];


Gradient.bothColors = [];

Gradient.differenceArray = [];

Gradient.incrementArray = [];

Gradient.redArrayRGB = [];
Gradient.greenArrayRGB = [];
Gradient.blueArrayRGB = [];
Gradient.userArrayRGB = [];

var redArrayHex = [];
var greenArrayHex = [];
var blueArrayHex = [];
var userArrayHex = [];


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

  var firstDec  = Gradient.hexNumberArray.indexOf(one);
  var secondDec = Gradient.hexNumberArray.indexOf(two);
  var thirdDec  = Gradient.hexNumberArray.indexOf(three);
  var fourthDec = Gradient.hexNumberArray.indexOf(four);
  var fifthDec  = Gradient.hexNumberArray.indexOf(five);
  var sixthDec  = Gradient.hexNumberArray.indexOf(six);

  var redValue   = ( firstDec * 16 ) + secondDec;
  var greenValue = ( thirdDec * 16 ) + fourthDec;
  var blueValue  = ( fifthDec * 16 ) + sixthDec;

  var rgbColor = [redValue, greenValue, blueValue];

  return rgbColor;
}

Gradient.bothColors.push(convertToRGB(Gradient.left.value));
Gradient.bothColors.push(convertToRGB(Gradient.right.value));


// function to measure distance between 2 RGB values

function differences(arrayOfArrays) {
  var redDiff = arrayOfArrays[0][0] - arrayOfArrays[1][0];
  var absRedDiff = Math.abs(redDiff);

  var greenDiff = arrayOfArrays[0][1] - arrayOfArrays[1][1];
  var absGreenDiff = Math.abs(greenDiff);

  var blueDiff = arrayOfArrays[0][2] - arrayOfArrays[1][2];
  var absBlueDiff = Math.abs(blueDiff);

  Gradient.differenceArray = [absRedDiff, absGreenDiff, absBlueDiff];
}

differences(Gradient.bothColors);


// grab difference numbers and divide by segments

function spacing() {
  var redSpacing = Gradient.differenceArray[0] / Gradient.segments.value;
  var greenSpacing = Gradient.differenceArray[1] / Gradient.segments.value;
  var blueSpacing = Gradient.differenceArray[2] / Gradient.segments.value;

  Gradient.incrementArray = [redSpacing, greenSpacing, blueSpacing];
}

spacing();


// add numbers to red, green, and blue arrays

function rgbArrayPush() {
  Gradient.redArrayRGB = [];
  Gradient.greenArrayRGB = [];
  Gradient.blueArrayRGB = [];

  var redFirst = Gradient.bothColors[0][0];
  var greenFirst = Gradient.bothColors[0][1];
  var blueFirst = Gradient.bothColors[0][2];

  var redLast = Gradient.bothColors[1][0];
  var greenLast = Gradient.bothColors[1][1];
  var blueLast = Gradient.bothColors[1][2];

  var redSpacing = Gradient.incrementArray[0];
  var greenSpacing = Gradient.incrementArray[1];
  var blueSpacing = Gradient.incrementArray[2];

  Gradient.redArrayRGB.push(redFirst);
  Gradient.greenArrayRGB.push(greenFirst);
  Gradient.blueArrayRGB.push(blueFirst);

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


    Gradient.redArrayRGB.push(nextRed);
    Gradient.greenArrayRGB.push(nextGreen);
    Gradient.blueArrayRGB.push(nextBlue);
  }

  Gradient.redArrayRGB.push(redLast);
  Gradient.greenArrayRGB.push(greenLast);
  Gradient.blueArrayRGB.push(blueLast);
}

rgbArrayPush();


// floor values in rgbArray so they render correctly.

function floorRGB(colorArray) {
  for (var i = 0; i < colorArray.length; i++) {
    colorArray[i] = Math.floor( colorArray[i]);
  }
}

floorRGB(Gradient.redArrayRGB);
floorRGB(Gradient.greenArrayRGB);
floorRGB(Gradient.blueArrayRGB);


// generate user array

function generateUserArrayRGB() {
  Gradient.userArrayRGB = [];
  for (var i = 0; i < Gradient.segments.value; i++) {
    Gradient.userArrayRGB.push(`rgb(${Gradient.redArrayRGB[i]},${Gradient.greenArrayRGB[i]},${Gradient.blueArrayRGB[i]})`);
  }
}

generateUserArrayRGB();


// convert RGB back to Hex

function convertToHex() {
  redArrayHex = [];
  for (var i = 0; i < Gradient.redArrayRGB.length; i++) {
    var RGB = Gradient.redArrayRGB[i];
    var one = Math.floor( RGB / 16 );
    var two = RGB % 16;
    var hex = `${Gradient.hexNumberArray[one]}${Gradient.hexNumberArray[two]}`;
    redArrayHex.push(hex);
  }
  greenArrayHex = [];
  for (i = 0; i < Gradient.greenArrayRGB.length; i++) {
    RGB = Gradient.greenArrayRGB[i];
    one = Math.floor( RGB / 16 );
    two = RGB % 16;
    hex = `${Gradient.hexNumberArray[one]}${Gradient.hexNumberArray[two]}`;
    greenArrayHex.push(hex);
  }
  blueArrayHex = [];
  for (i = 0; i < Gradient.blueArrayRGB.length; i++) {
    RGB = Gradient.blueArrayRGB[i];
    one = Math.floor( RGB / 16 );
    two = RGB % 16;
    hex = `${Gradient.hexNumberArray[one]}${Gradient.hexNumberArray[two]}`;
    blueArrayHex.push(hex);
  }
  userArrayHex = [];
  for (i = 0; i < Gradient.userArrayRGB.length; i++) {
    var hexRed = redArrayHex[i];
    var hexGreen = greenArrayHex[i];
    var hexBlue = blueArrayHex[i];
    userArrayHex.push(`#${hexRed}${hexGreen}${hexBlue}`);
  }
}

convertToHex();

// generate random number

function randomNum() {
  var random = Math.random() * (25 - 5) + 5;
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

// function to get and create tds for table

function generateTable() {
  Gradient.currentRow.innerHTML = '';

  for (var i = 0; i < userArrayHex.length; i++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = userArrayHex[i];
    Gradient.currentRow.appendChild(tdEl);
  }
}

generateTable();


function updateLeft() {
  var newLeft = convertToRGB(Gradient.left.value);

  Gradient.bothColors[0] = newLeft;
  differences(Gradient.bothColors);
  spacing();
  rgbArrayPush();
  floorRGB(Gradient.redArrayRGB);
  floorRGB(Gradient.greenArrayRGB);
  floorRGB(Gradient.blueArrayRGB);
  generateUserArrayRGB();
  convertToHex();
  // generateTable();
  randomData();
  displayChart();
}

function updateRight() {
  var newRight = convertToRGB(Gradient.right.value);

  Gradient.bothColors[1] = newRight;
  differences(Gradient.bothColors);
  spacing();
  rgbArrayPush();
  floorRGB(Gradient.redArrayRGB);
  floorRGB(Gradient.greenArrayRGB);
  floorRGB(Gradient.blueArrayRGB);
  generateUserArrayRGB();
  convertToHex();
  // generateTable();
  randomData();
  displayChart();
}

function updateSegments() {
  differences(Gradient.bothColors);
  spacing();
  rgbArrayPush();
  floorRGB(Gradient.redArrayRGB);
  floorRGB(Gradient.greenArrayRGB);
  floorRGB(Gradient.blueArrayRGB);
  generateUserArrayRGB();
  convertToHex();
  // generateTable();
  randomData();
  displayChart();
}



Gradient.left.addEventListener('input', updateLeft);
Gradient.right.addEventListener('input', updateRight);
Gradient.segments.addEventListener('input', updateSegments);




// create chart for user input

function displayChart() {

  if (Gradient.displayChart) Gradient.displayChart.destroy();

  Gradient.displayChart = new Chart(Gradient.chart, {
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
        display: false,
      },
      scales: {
        yAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            display: false,
          }
        }],
        xAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
          }
        }]
      }
    }
  });
}

displayChart();


