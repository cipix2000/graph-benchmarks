var intervalRef;
var interval = 30;
var dataIndex = 0;
var dataCounts = [10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000];
var frameCounts = [];
var frameCount = 0;

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

var allDPS = [dps]

function generateAllData() {
  for (var j = 0 ; j < dataCounts.length; j++) {
    allDPS[j] = [];
    for (var i = 0; i < dataCounts[j]; i++) {
      allDPS[j][i] = [i, Math.sin(i/dataCounts[j]*30) * 10.0];
    }    
  }
};

var repeatingFunction = function () {
    intervalRef = setImmediate(function(){
        updateChart(dps);
        repeatingFunction();
    });
}


function oneInterval(count) {
    frameCount = 0;
    dps = allDPS[dataIndex];
    setTimeout(function(){
        clearImmediate(intervalRef);
        frameCounts[dataIndex] = frameCount;
        dataIndex++;
        if (dataIndex < count) {
            oneInterval(count);
        }
        else {
            updateSecondChart();
            updateTable();
        }
    }, 5000);
    repeatingFunction();
}

function utilTableUpdate(data) {
        for (var i = 0; i < data.length; i++) {
                var s = "R" + (i + 1) + "C1";
                $("#" + s).empty();
                $("#" + s).append("<span>" + dataCounts[i] + "</span>");
                var s2 = "R" + (i + 1) + "C2";
                $("#" + s2).empty();
                $("#" + s2).append("<span>" + data[i] + "</span>");
        }
}