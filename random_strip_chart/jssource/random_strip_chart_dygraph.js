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
           [10,1]
            ];

var g, g2;
function Initialize() {
    //$("#StartButton").jqxButton();
    g = new Dygraph(
        document.getElementById("Graph"),
        dps,
        {valueRange: [0, 10],
        drawPoints: false});
    
    g2 = new Dygraph(
        document.getElementById("Graph2"),
        dps2
    );
    
    $("#StartButton").on("click", function(){
        oneInterval(10);
    });
}

function updateChart() {
    for (var i = 0; i < dataCounts[dataIndex]; i++) {
        dps[i] = [i, Math.random() * 10.0];
    }
    
    g.updateOptions( { 'file': dps } );
    frameCount++;
}

function updateSecondChart() {
    for (var i = 0; i < 10; i++) {
        dps2[i] = [i, frameCounts[i] / 5];
    }
    g2.updateOptions( { 'file': dps2 } );
}
 

function updateTable() {
    var data = [];
    for (var i = 0; i < 10; i++) {
        data[i] = frameCounts[i] / 5;
    }
    
    utilTableUpdate(data);
}
