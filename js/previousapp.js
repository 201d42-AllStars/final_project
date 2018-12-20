'use strict';


var sectionGradient = JSON.parse( localStorage.getItem('userColorSelection') );
// var table = document.getElementById('gradient-table');

// console.log(tableGradient);

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
    section.appendChild(container);
  }
}

generateSavedSection();

// function generateTable() {  
//   for (var i = 0; i < tableGradient.length; i++) {
//     var table = document.createElement('table');
//     var trEl = document.createElement('tr');
//     for (var j = 0; j < tableGradient[i].length; j++) {
//       var tdEl = document.createElement('td');
//       var divEl = document.createElement('div');
//       divEl.textContent = tableGradient[i][j];
//       tdEl.appendChild(divEl);
//       tdEl.style.backgroundColor = tableGradient[i][j];
//       trEl.appendChild(tdEl);
//     }
//     table.appendChild(trEl);
//     section.appendChild(table);
//   }
// }


// generateTable();

