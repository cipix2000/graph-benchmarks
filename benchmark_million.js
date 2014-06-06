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

  function init(div, datasize, typedarrays) {
    placehoder = '#' + div;
    
    if (typedarrays) generateTypedArrays(datasize);
    else generateData(datasize);

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