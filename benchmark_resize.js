function ResizeBenchmark()
{
  'use strict';
  var chart;
  var dps = [];
  var placehoder;
  var dps_backing = null;
  var direction = 1;
  var x = 0;
  var updates = 0;

  function generateData(datasize) {
    dps = [];
    for (var i = 0; i < datasize; i++) {
      dps[i] = [i, Math.sin(i/datasize*30) * 10.0];
    }    
  };

  function init(div, datasize, dataformat) {
    placehoder = '#' + div;
    var format = 'tall';
    x = 0;

   generateData(datasize);
   
    chart = $.plot(placehoder,
        [dps],{
        lines: { show: true, lineWidth: 1},
        canvas: true,
        series: {
          shadowSize: 0,	// Drawing is faster without shadows
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
      var element = $(placehoder);

      if (x > 200) direction = -1;
      if (x < -200) direction = +1;

      x+= direction;

      var width = (640 + x) + 'px';
      var height = (480 + x) + 'px';
      var elementStyle = element[0].style;
      var update = false;
      if (elementStyle.width !== width) {
          update = true;
          elementStyle.width = width;
      }
      if (elementStyle.height !== height) {
          update = true;
          elementStyle.height = height;
      }
      
      chart.resize();
      chart.setupGrid();
      chart.draw();
      
      updates ++;
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