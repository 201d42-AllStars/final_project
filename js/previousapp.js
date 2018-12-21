'use strict';

var sectionGradient = JSON.parse( localStorage.getItem('userColorSelection') );

var section = document.getElementById('previous-section');

var k = document.getElementById('logo-k');


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

function generateSavedSection() {
  if (sectionGradient) {
    for (var i = 0; i < sectionGradient.length; i++) {
      var container = document.createElement('section');
      var colors = document.createElement('section');
      var hexCodes = document.createElement('section');

      for (var j = 0; j < sectionGradient[i].length; j++) {
        var color = document.createElement('span');
        var percent = 100 / sectionGradient[i].length;
        var string = `${percent}%`;

        color.style.width = string;
        color.style.height = '150px';
        color.style.backgroundColor = sectionGradient[i][j];
        colors.appendChild(color);

        var hex = document.createElement('span');
        hex.className = 'rotate-text';
        hex.style.width = string;
        hex.textContent = sectionGradient[i][j];
        hexCodes.appendChild(hex);
      }
      container.appendChild(colors);
      container.appendChild(hexCodes);
      section.prepend(container);
    }
  } else {
    section.textContent = 'NOTHING HAS BEEN SAVED YET';
  }
}

generateSavedSection();

