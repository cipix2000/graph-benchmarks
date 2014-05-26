var chart;
var actfps = 0;

var datasize = 1000000;

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

var dpscopy = [
  [0, 0]
];

function Initialize() {
  chart = $.plot("#Graph",
      [dps],{
      lines: { show: true, lineWidth: 1},
      series: {
        shadowSize: 0,	// Drawing is faster without shadows
        downsample: { threshold: 2000 } // Default downsampling threshold 
      },
      yaxis: {
        min: -12,
        max: 12
      },
      xaxis: {
        show: true
      }
    });

  generateData();

  $("#StartButton1").on("click", function(){
    burn();
  });
}

function generateData() {
  for (var i = 0; i < datasize*1.2; i++) {
    dps[i] = [i, Math.sin(i/datasize*30) * 10.0];
  }
  for (var i = 0; i < datasize; i++) {
    dpscopy[i] = [0, 0];
  }
};

function burn() {
        var imediateRef;
        frameCount = 0;
        actfps = 0;
        var imm = function(){
            updateChart(datasize * 0.1 * Math.random());
            frameCount++;
            imediateRef = setImmediate(imm);
        }
        setTimeout(function(){
            clearImmediate(imediateRef);
            console.log(frameCount/5 + " fps");
            $('#fps').empty();
            $('#fps').append("<span> fps: " + frameCount/5 + "</span>");            
            $('#fps').append("<span> act: " + actfps/5 + "</span>");  

        }, 5000);
        imediateRef = setImmediate(imm);
}

var uct = $.throttle( 33, updateChart_core);

function updateChart_unthrottled(count) {
  //var data = dps.slice(count, datasize + count);
  var data = dps;
  updateChart_core(data);
}

function updateChart_throttled(count) {
  count = count | 0;
  for (var i = 0; i < datasize; i++) {
    dpscopy[i][0] = dps[i+count][0];
    dpscopy[i][1] = dps[i+count][1];
  }
  uct(dpscopy);
}

function updateChart_core(data) {
  var options = chart.getOptions();
  chart.setData([data]);
  chart.setupGrid();
  chart.draw();
  actfps ++;
}

var updateChart = updateChart_unthrottled;