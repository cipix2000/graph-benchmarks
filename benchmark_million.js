function MillionPointsBenchmark()
{
  'use strict';
  var chart;
  var dps = [];
  var placehoder;
  var dps_backing = null;

  function generateTypedArrays(datasize) {
  	dps_backing = new Float64Array(datasize * 2);

  	dps = [];
    for (var i = 0; i < datasize; i++) {
      dps[i] = dps_backing.subarray(i*2, i*2+2);
      dps[i][0] = i;
      dps[i][1] = Math.sin(i/datasize*30) * 10.0;
    }  
  }

  function generateData(datasize) {
    dps = [];
    for (var i = 0; i < datasize; i++) {
      dps[i] = [i, Math.sin(i/datasize*30) * 10.0];
    }    
  };

  function generateWideData(datasize) {
    dps = [[],[]];
    for (var i = 0; i < datasize; i++) {
      dps[0][i] = i;
      dps[1][i] = Math.sin(i/datasize*30) * 10.0;
    }    
  };

  function init(div, datasize, dataformat) {
    placehoder = '#' + div;
    var format = 'tall'

    if (dataformat === 1) generateTypedArrays(datasize);
    else if (dataformat === 0) generateData(datasize);
    else if (dataformat === 2) {
      generateWideData(datasize);
      format = 'wide';
    }

    chart = $.plot(placehoder,
        [dps],{
        lines: { show: true, lineWidth: 1},
        canvas: true,
        series: {
          shadowSize: 0,	// Drawing is faster without shadows
          downsample: { threshold: 1000, dataformat: format }
        },
        yaxis: {
          min: 0,
          max: 10
        },
        xaxis: {
          min:0, max: datasize, show: true
        }
      });
  }

  function step() {
    var options = chart.getOptions();
    options.yaxes[0].max = 10 + Math.random();
    options.yaxes[0].min = -11 + Math.random();
    chart.setData([dps]);
    chart.setupGrid();
    chart.draw();
  }

  function cleanup() {
    chart.shutdown();
    $(placehoder).empty();
    dps=[];
    chart = null;
    dps_backing = null;
  }

  return {init: init, step: step, cleanup: cleanup};
}