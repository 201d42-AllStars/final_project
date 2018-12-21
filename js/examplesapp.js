'use strict';

var sectionGradient = JSON.parse( localStorage.getItem('userColorSelection') );

var hexArray1 = ["#9c2ef3","#a238e2","#a843d2","#af4dc2","#b558b2","#bc62a2","#c26d91","#c97881","#cf8271","#d68d61","#dc9751","#e3a240","#e9ad30","#f0b720","#fdcd00"];

var hexArray2 = ["#77ed6b","#77eb6c","#77ea6e","#77e970","#77e872","#78e674","#78e576","#78e478","#78e37a","#78e17c","#79e07e","#79df80","#79de82","#79dc84","#79db86","#7ada88","#7ad989","#7ad78b","#7ad68d","#7ad58f","#7bd491","#7bd293","#7bd195","#7bd097","#7bcf99","#7ccd9b","#7ccc9d","#7ccb9f","#7ccaa1","#7cc9a3","#7dc7a5","#7dc6a6","#7dc5a8","#7dc4aa","#7dc2ac","#7ec1ae","#7ec0b0","#7ebfb2","#7ebdb4","#7ebcb6","#7fbbb8","#7fbaba","#7fb8bc","#7fb7be","#7fb6c0","#80b5c2","#80b3c3","#80b2c5","#80b1c7","#80b0c9","#81aecb","#81adcd","#81accf","#81abd1","#81aad3","#82a8d5","#82a7d7","#82a6d9","#82a5db","#82a3dd","#82a2df","#83a1e0","#83a0e2","#839ee4","#839de6","#839ce8","#849bea","#8499ec","#8498ee","#8497f0","#8496f2","#8594f4","#8593f6","#8592f8","#8690fc"];

var hexArray3 = ["#f7a01c","#f2a023","#eea12a","#eaa232","#e5a339","#e1a441","#dda548","#d9a64f","#d4a757","#d0a85e","#cca966","#c8a96d","#c3aa74","#bfab7c","#bbac83","#b6ad8b","#b2ae92","#aeaf99","#aab0a1","#a5b1a8","#a1b2b0","#9db2b7","#99b3be","#94b4c6","#90b5cd","#8cb6d5","#88b7dc","#83b8e3","#7fb9eb","#77bbfa"
];

var chart = document.getElementById('gradient-chart');
var chart2 = document.getElementById('gradient-chart2');
var chart3 = document.getElementById('gradient-chart3');

var k = document.getElementById('logo-k');

var data1 = [];
var data2 = [];
var data3 = [];

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

function randomData1() {
  for (var i = 0; i < hexArray1.length; i++) {
    data1.push(randomNum());
  }
}

function randomData2() {
  for (var i = 0; i < hexArray2.length; i++) {
    data2.push(randomNum());
  }
}

function randomData3() {
  for (var i = 0; i < hexArray3.length; i++) {
    data3.push(randomNum());
  }
}

randomData1();
randomData2();
randomData3();

// create chart for user input

function displayExampleCharts() {

  new Chart(chart, {
    type: 'doughnut',
    data: {
      labels: hexArray1,
      datasets: [{
        label: '',
        data: data1,
        backgroundColor: hexArray1,
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
      labels: hexArray2,
      datasets: [{
        label: '',
        data: data2,
        backgroundColor: hexArray2,
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
      labels: hexArray3,
      datasets: [{
        label: '',
        data: data3,
        backgroundColor: hexArray3,
      }],
    },
    options: {
      legend: {
        display: false,
      },
      scale: {
        display: false,
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
