'use strict';

var sectionGradient = JSON.parse( localStorage.getItem('userColorSelection') );

var section = document.getElementById('previous-section');


function generateSavedSection() {
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
}

generateSavedSection();

