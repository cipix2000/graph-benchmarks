function Downsampling()
{
  'use strict';
  var chart;
  var dps = [];
  var placehoder;
  var dps_backing = null;
  var algorithm = 1;

  var floor = Math.floor,
        abs = Math.abs;

  function maxMinInTheBuckets1(data, threshold) {
      var data_length = data.length;
      if (threshold >= data_length || threshold === 0) {
          return data; // Nothing to do
      }

      var sampled = [],
          sampled_index = 0;

      // Bucket size. Leave room for start and end data points
      var every = (data_length - 2) / (threshold - 2);

      var a = 0,  // Initially a is the first point in the triangle
          max_area_point,
          max_area,
          area,
          next_a;

      sampled[ sampled_index++ ] = data[ a ]; // Always add the first point

      for (var i = 0; i < threshold - 2; i++) {
          // Calculate point average for next bucket (containing c)
          var range_start  = floor( ( i ) * every ) + 1,
              range_end    = floor( ( i + 1 ) * every ) + 1;

          range_end = range_end < data_length ? range_end : data_length;

          var max_index =  range_start , // * 1 enforces Number (value may be Date) , 
              max_y = data[ range_start ][ 1 ] * 1,
              min_index = range_start, // * 1 enforces Number (value may be Date) , 
              min_y = data[ range_start ][ 1 ] * 1;


          var range_length = range_end - range_start;

          for ( ; range_start < range_end; range_start++ ) {
            if (max_y < data[ range_start ][ 1 ] * 1) {
              max_y = data[ range_start ][ 1 ] * 1;
              max_index = range_start;
            }

            if (min_y > data[ range_start ][ 1 ] * 1) {
              min_y = data[ range_start ][ 1 ] * 1;
              min_index = range_start;
            }
          }


          sampled[ sampled_index++ ] = data[max_index]; // Pick max point from the bucket
          if (max_index <= min_index) {
            sampled[ sampled_index++ ] = data[max_index]; // Pick max point from the bucket
            sampled[ sampled_index++ ] = data[min_index];
          } else if (max_index >= min_index) {
            sampled[ sampled_index++ ] = data[min_index];
            sampled[ sampled_index++ ] = data[max_index]; // Pick max point from the bucket
          } else {
            sampled[ sampled_index++ ] = data[min_index];
          }
      }

      sampled[ sampled_index++ ] = data[ data_length - 1 ]; // Always add last

      return sampled;
  }

function maxMinInTheBuckets2(data, threshold) {
      var data_length = data[0].length;
      if (threshold >= data_length || threshold === 0) {
          return data; // Nothing to do
      }

      var sampled = [],
          sampled_index = 0;

      // Bucket size. Leave room for start and end data points
      var every = (data_length - 2) / (threshold - 2);

      var a = 0,  // Initially a is the first point in the triangle
          max_area_point,
          max_area,
          area,
          next_a;

      sampled[ sampled_index++ ] = [data[0][ a ], data[1] [a]]; // Always add the first point

      for (var i = 0; i < threshold - 2; i++) {
          // Calculate point average for next bucket (containing c)
          var range_start  = floor( ( i ) * every ) + 1,
              range_end    = floor( ( i + 1 ) * every ) + 1;

          range_end = range_end < data_length ? range_end : data_length;

          var max_index =  range_start , // * 1 enforces Number (value may be Date) , 
              max_y = data[1][ range_start ] * 1,
              min_index = range_start, // * 1 enforces Number (value may be Date) , 
              min_y = data[1][ range_start ] * 1;


          var range_length = range_end - range_start;

          for ( ; range_start < range_end; range_start++ ) {
            if (max_y < data[1][ range_start ] * 1) {
              max_y = data[1][ range_start ] * 1;
              max_index = range_start;
            }

            if (min_y > data[1][ range_start ] * 1) {
              min_y = data[1][ range_start ] * 1;
              min_index = range_start;
            }
          }

          if (max_index <= min_index) {
            sampled[ sampled_index++ ] = [data[0][max_index], data[1][max_index]]; // Pick max point from the bucket
            sampled[ sampled_index++ ] = [data[0][min_index], data[1][min_index]];
          } else if (max_index <= min_index) {
            sampled[ sampled_index++ ] = [data[0][min_index], data[1][min_index]];
            sampled[ sampled_index++ ] = [data[0][max_index], data[1][max_index]]; // Pick max point from the bucket
          } else {
            sampled[ sampled_index++ ] = [data[0][min_index], data[1][min_index]]; // Pick max point from the bucket
          }
      }

      sampled[ sampled_index++ ] = [data[0][ data_length - 1], data[1][data_length -1]]; // Always add last

      return sampled;
  }


  function generateTypedArrays1(datasize) {
  	dps_backing = new Float64Array(datasize * 2);

  	dps = [];
    for (var i = 0; i < datasize; i++) {
      dps[i] = dps_backing.subarray(i*2, i*2+2);
      dps[i][0] = i;
      dps[i][1] = Math.sin(i/datasize*30) * 10.0;
    }  
  }

  function generateTypedArrays2(datasize) {
    dps = [];
    dps[0] = new Float64Array(datasize);
    dps[1] = new Float64Array(datasize);
    for (var i = 0; i < datasize; i++) {
      dps[0][i] = i;
      dps[1][i] = Math.sin(i/datasize*30) * 10.0;
    }  
  }


  function generateData1(datasize) {
    dps = [];
    for (var i = 0; i < datasize; i++) {
      dps[i] = [i, Math.sin(i/datasize*30) * 10.0];
    }    
  };

  function generateData2(datasize) {
    dps = [[],[]];
    for (var i = 0; i < datasize; i++) {
      dps[0][i] = i;
      dps[1][i] = Math.sin(i/datasize*30) * 10.0;
    }    
  };


  function init(datasize, typedarrays, algo) {
    algorithm = algo;
    if (algo === 1) {
      if (typedarrays) generateTypedArrays1(datasize);
      else generateData1(datasize);
    }
    if (algo === 2) {
      if (typedarrays) generateTypedArrays2(datasize);
      else generateData2(datasize);
    }
  }

  function step() {
    if (algorithm === 1) {
      return maxMinInTheBuckets1(dps, 2000);
    } else if (algorithm === 2) {
      return maxMinInTheBuckets2(dps, 2000);
    }
  }

  function cleanup() {
    dps=[];
    dps_backing = null;
  }

  return {init: init, step: step, cleanup: cleanup};
}
