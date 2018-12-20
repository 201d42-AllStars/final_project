'use-strict';

var sectionGradient = JSON.parse( localStorage.getItem('userColorSelection') );

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
