function FlotBenchmark()
{
  'use strict';
  var chart;
  var dps = [];
  var placehoder;

  function generateData(datasize) {
    dps = [];
    for (var i = 0; i < datasize; i++) {
      dps[i] = [i, Math.sin(i/datasize*30) * 10.0];
    }
  };

  function init(div, datasize, downsample) {
    placehoder = '#' + div;
    generateData(datasize);
    chart = $.plot(placehoder,
        [dps],{
        lines: { show: true, lineWidth: 1},
        canvas: true,
        series: {
          shadowSize: 0,	// Drawing is faster without shadows
          downsample: { threshold: 2000 }
        },
        yaxis: {
          min: 0,
          max: 10,
          autoscale: 'exact'
        },
        xaxis: {
          min:0, max: datasize, show: true
        }
      });
    var options = chart.getOptions();
  }

  function step() {
    dps[0][1] = -11 + Math.random();
    dps[1][1] = 11 + Math.random();
    chart.setData([dps]);
    chart.setupGrid();
    chart.draw();
  }

  function cleanup() {
    chart.shutdown();
    $(placehoder).empty();
    dps=[];
    chart = null;
  }

  return {init: init, step: step, cleanup: cleanup};
}
