'use strict';


var tableGradient = JSON.parse( localStorage.getItem('userColorSelection') );
// var table = document.getElementById('gradient-table');

console.log(tableGradient);

var section = document.getElementById('previous-section');

function generateTable() {  
  for (var i = 0; i < tableGradient.length; i++) {
    var table = document.createElement('table');
    var trEl = document.createElement('tr');
    for (var j = 0; j < tableGradient[i].length; j++) {
      var tdEl = document.createElement('td');
      var divEl = document.createElement('div');
      divEl.textContent = tableGradient[i][j];
      tdEl.appendChild(divEl);
      tdEl.style.backgroundColor = tableGradient[i][j];
      trEl.appendChild(tdEl);
    }
    table.appendChild(trEl);
    section.appendChild(table);
  }
}


generateTable();
