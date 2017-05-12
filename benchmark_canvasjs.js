function CanvasJSBenchmark()
{
  'use strict';
  var chart;
  var dps = [];
  var placehoder;

  function generateData(datasize) {
    dps = [];
    for (var i = 0; i < datasize; i++) {
      dps[i] = {y:Math.sin(i/datasize*30) * 10.0};
    }
  };

  function init(div, datasize) {
    placehoder = "#"+div;
    generateData(datasize);

    chart = new CanvasJS.Chart(div,
    {
      axisY:{
        minimum: -10,
        maximum: 10
      },
      animationEnabled: false,
      interactivityEnabled: false,
      data: [
        {
          type: "line",
          lineThickness: 1,
          dataPoints: dps
        }
      ]
    });

    chart.render();
  }

  function step() {
    chart.options.data[0].dataPoints = dps;
    chart.options.axisY.minimum = -11 + Math.random();
    chart.options.axisY.maximum = 10 + Math.random();
    chart.render();
  }

  function cleanup() {
    $(placehoder).empty();
    dps=[];
    chart=null;
  }

  return {init: init, step: step, cleanup: cleanup};
}
