var chart;
var chart2;
var dps = [
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 6],
  [7, 7],
  [8, 8],
  [9, 9],
  [10, 10]
];
var dps2 = [
  [1, 0],
  [2, 1],
  [3, 0],
  [4, 1],
  [5, 0],
  [6, 1],
  [7, 0],
  [8, 1],
  [9, 0],
  [10, 1]
];

function Initialize() {
  generateAllData();
  chart = $.plot("#Graph",
      [dps],{
      lines: { show: true, lineWidth: 1},
      canvas: true,
      series: {
        shadowSize: 0,	// Drawing is faster without shadows
        downsample: { threshold: 2000 } // Default downsampling threshold 
      },
      yaxis: {
        min: 0,
        max: 10
      },
      xaxis: {
        min:0, max: 10, show: true
      }

    });

  $("#Graph2").width("600px");
  $("#Graph2").height("350px");
  chart2 = $.plot("#Graph2", 
      [dps2], {
      lines: { show: true},
      yaxis: {
        show: true
      },
      xaxis: {
        min: 1, max: 10,
        show: true,
        ticks: [[1, 10], [2, 50], [3, 100], [4, 500], [5, 1000], [6,5000], [7, 10000], [8, 50000], [9,100000], [10,500000] ]
      }
    });

  $("#StartButton").on("click", function(){
    dataIndex = 0;
    oneInterval(10);
  });
}

function updateChart(data) {
  var options = chart.getOptions();
  options.xaxes[0].max = dataCounts[dataIndex];
  options.yaxes[0].max = 10 + Math.random();
  options.yaxes[0].min = -11 + Math.random();
  chart.setData([data]);
  chart.setupGrid();
  chart.draw();
  frameCount++;
}

function updateSecondChart() {
  for (var i = 0; i < 10; i++) {
    dps2[i] = [i+1, frameCounts[i] / 5];
  }
  chart2.setData([dps2]);
  chart2.setupGrid();
  chart2.draw();
}

function updateTable() {
  var data = [];
  for (var i = 0; i < 10; i++) {
    var d = dps2[i];
    data[i] = d[1];
  }

  utilTableUpdate(data);
}
