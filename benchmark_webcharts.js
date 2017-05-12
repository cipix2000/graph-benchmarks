function WebchartsBenchmark()
{
  'use strict';
  var chart;
  var dps = [];
  var placehoder;

  function generateData(datasize) {
    dps = [];
    for (var i = 0; i < datasize; i++) {
      dps[i] = Math.sin(i/datasize*30) * 10.0;
    }
  };

  function init(div, datasize, downsample) {
    placehoder = '#' + div;
    generateData(datasize);

    chart = $(placehoder).append('\
    <ni-cartesian-graph>\
        <ni-cartesian-axis show axis-position="left" show-ticks show-minor-ticks show-tick-labels="all" grid-lines auto-scale="exact"></ni-cartesian-axis>\
        <ni-cartesian-axis show axis-position="bottom" show-ticks show-minor-ticks show-tick-labels="all" grid-lines></ni-cartesian-axis>\
        <ni-cartesian-plot show label="Plot 1">\
            <ni-cartesian-plot-renderer line-width="1" line-stroke="#a84716"></ni-cartesian-plot-renderer>\
        </ni-cartesian-plot>\
    </ni-cartesian-graph>').find('ni-cartesian-graph')[0];
  }

  function step() {
    dps[0] = -11 + Math.random();
    dps[1] = 11 + Math.random();

    chart.setData(dps);
  }

  function cleanup() {
    $(placehoder).empty();
    dps=[];
    chart = null;
  }

  return {init: init, step: step, cleanup: cleanup};
}
