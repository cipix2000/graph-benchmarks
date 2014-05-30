function DygraphsBenchmark()
{
  'use strict';
  var chart;
  var dps = [];
  var placehoder, g;

  function generateData(datasize) {
    dps = [];
    for (var i = 0; i < datasize; i++) {
      dps[i] = [i, Math.sin(i/datasize*30) * 10.0];
    }    
  };

  function init(div, datasize) {
    placehoder = "#"+div;
    generateData(datasize);

    g = new Dygraph(
        document.getElementById(div),
        dps,
        {valueRange: [-10, 10],
        drawPoints: false});
  }

  function step() {
    g.updateOptions( { 'file': dps, valueRange: [-11 + Math.random(), 10 + Math.random()] } );
  }

  function cleanup() {
    $(placehoder).empty();
    dps=[];
  }

  return {init: init, step: step, cleanup: cleanup};
}