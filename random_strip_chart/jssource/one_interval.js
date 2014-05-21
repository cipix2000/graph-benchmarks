var intervalRef;
var interval = 30;
var dataIndex = 0;
var dataCounts = [10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000];
var frameCounts = [];
var frameCount = 0;
function oneInterval(count) {
        frameCount = 0;
        setTimeout(function(){
            clearInterval(intervalRef);
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
        intervalRef = setInterval(function(){
            updateChart();
        }, 0);
}

function utilTableUpdate(data) {
        for (var i = 0; i < data.length; i++) {
                var s = "R" + (i + 1) + "C1";
                $("#" + s).append("<span>" + dataCounts[i] + "</span>");
                var s2 = "R" + (i + 1) + "C2";
                $("#" + s2).append("<span>" + data[i] + "</span>");
        }
}