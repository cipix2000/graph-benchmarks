google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(googlechartReady);

window.waitingToLoadCount = 1
function googlechartReady() {
  window.waitingToLoadCount -= 1;
}

function GoogleChartBenchmark()
{
  'use strict';
  var chart;
  var dps = [];
  var placehoder;
  var data;
  var options;

  function generateData(datasize) {
    dps = [];
    for (var i = 0; i < datasize; i++) {
      dps[i] = [i, Math.sin(i/datasize*30) * 10.0];
    }
  };

  function init(div, datasize, downsample) {
    placehoder = '#' + div;
    generateData(datasize);
    data = google.visualization.arrayToDataTable(dps, true);
    options = {
        vAxis: {
          viewWindow: {
              max: 10,
              min: -11
          }
        },
        chartType: 'Table',
        backgroundColor: '#f1f8e9'
    };
    chart = new google.visualization.LineChart(document.getElementById(div));
    chart.draw(data, options);
  }

  function step() {
    options.vAxis.viewWindow.max = 10 + Math.random();
    options.vAxis.viewWindow.min = -11 + Math.random();
    chart.draw(data, options);
  }

  function cleanup() {
    chart.clearChart();
    $(placehoder).empty();
    dps=[];
    chart = null;
  }

  return {init: init, step: step, cleanup: cleanup};
}
