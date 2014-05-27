var chart;
var chart2;
var dps = [
           {x: 1, y: 1},
           {x: 2, y: 2},
           {x: 3, y: 3},
           {x: 4, y: 4},
           {x: 5, y: 5},
           {x: 6, y: 6},
           {x: 7, y: 7},
           {x: 8, y: 8},
           {x: 9, y: 9},
           {x: 10, y: 10}
           ];
var dps2 = [
           {x: 1, y: 0},
           {x: 2, y: 1},
           {x: 3, y: 0},
           {x: 4, y: 1},
           {x: 5, y: 0},
           {x: 6, y: 1},
           {x: 7, y: 0},
           {x: 8, y: 1},
           {x: 9, y: 0},
           {x: 10, y: 1},
            ];

function generateAllData() {
  for (var j = 0 ; j < dataCounts.length; j++) {
    allDPS[j] = [];
    for (var i = 0; i < dataCounts[j]; i++) {
      allDPS[j][i] = {x:i, y:Math.sin(i/dataCounts[j]*30) * 10.0};
    }    
  }
};

function Initialize() {
    generateAllData();
    chart = new CanvasJS.Chart("Graph",
    {
      title:{
        text: "Test Chart"  //**Change the title here
      },
      axisY:{
        minimum: 0,
        maximum: 10      
      },
      animationEnabled: false,
      data: [
      {        
        type: "line",
				lineThickness: 1,
        dataPoints: dps
      }
      ]
    });
    
    chart.render();
    
    chart2 = new CanvasJS.Chart("Graph2",
    {
      title:{
      text: "Results"  //**Change the title here
      },
      animationEnabled: false,
      data: [
      {        
        type: "line",
        dataPoints: dps2
      }
      ]
    });
    
    chart2.render();
    
    $("#StartButton").on("click", function(){
        dataIndex = 0;
        oneInterval(10);
    });
}

function updateChart(data) {
    chart.options.data[0].dataPoints = data;
    chart.options.axisY.minimum = -11 + Math.random();
    chart.options.axisY.maximum = 10 + Math.random();

    chart.render();
    frameCount++;
}

function updateSecondChart() {
    for (var i = 0; i < 10; i++) {
        dps2[i] = {x: i, label: dataCounts[i], y: frameCounts[i] / 5};
    }
    
    chart2.render();
}

function updateTable() {
    var data = [];
    for (var i = 0; i < 10; i++) {
        data[i] = dps2[i].y;
    }
    
    utilTableUpdate(data);
}
