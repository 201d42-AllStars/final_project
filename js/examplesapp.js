'use strict';

var sectionGradient = JSON.parse( localStorage.getItem('userColorSelection') );

var hexArray = ["#00eea8", "#0ce9ab", "#18e4af", "#24dfb3", "#30dab7", "#3cd5bb", "#48d0bf", "#54cbc3", "#61c6c7", "#6dc1cb", "#79bccf", "#85b7d3", "#91b2d7", "#9daddb", "#a9a8df", "#b6a3e3", "#c29ee7", "#ce99eb", "#da94ef", "#e68ff3", "#ff85fb"];

var chart = document.getElementById('gradient-chart');
var chart2 = document.getElementById('gradient-chart2');
var chart3 = document.getElementById('gradient-chart3');

var k = document.getElementById('logo-k');

var data = [];

function makeK() {
  if (sectionGradient) {
    var background = `-webkit-linear-gradient(${sectionGradient[sectionGradient.length - 1][0]},${sectionGradient[sectionGradient.length - 1]})`;
    var webOne = '-webkit-background-clip';
    k.style.background = background;
    k.style[webOne] = 'text';
  } else {
    background = '-webkit-linear-gradient(#00eea8,#ff85fb)';
    webOne = '-webkit-background-clip';
    k.style.background = background;
    k.style[webOne] = 'text';
  }
}

makeK();

function randomNum() {
  var random = Math.random() * (25 - 5) + 5;
  var randomRoundedDown = Math.floor(random);
  return randomRoundedDown;
}

function randomData() {
  for (var i = 0; i < hexArray.length; i++) {
    data.push(randomNum());
  }
}

randomData();

// create chart for user input

function displayExampleCharts() {

  new Chart(chart, {
    type: 'doughnut',
    data: {
      labels: hexArray,
      datasets: [{
        label: '',
        data: data,
        backgroundColor: hexArray,
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
            display: false,
          }
        }]
      }
    }
  });

  new Chart(chart2, {
    type: 'bar',
    data: {
      labels: hexArray,
      datasets: [{
        label: '',
        data: data,
        backgroundColor: hexArray,
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
            display: false,
          }
        }]
      }
    }
  });

  new Chart(chart3, {
    type: 'polarArea',
    data: {
      labels: hexArray,
      datasets: [{
        label: '',
        data: data,
        backgroundColor: hexArray,
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
            display: false,
          }
        }]
      }
    }
  });

}

displayExampleCharts();
