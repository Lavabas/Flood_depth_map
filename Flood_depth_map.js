var jrc = imageCollection
.filterBounds(geometry)

print(jrc.aggregate_array('return_period'))


var flood_20 = jrc
.filterBounds(geometry)
.filter(ee.Filter.eq('return_period', 20)).mosaic()

print(flood_20)

Map.addLayer(flood_20.clip(geometry),{palette:['skyblue', 'blue', 'darkblue']}, 'flood20', false)

print(
  ui.Chart.image.histogram(flood_20, geometry, 1000)
  )

var flood_50 = jrc
.filterBounds(geometry)
.filter(ee.Filter.eq('return_period', 50)).mosaic()

print(flood_50)

Map.addLayer(flood_50.clip(geometry),{palette:['skyblue', 'blue', 'darkblue']}, 'flood50', false)

print(
  ui.Chart.image.histogram(flood_50, geometry, 1000)
  )

var flood_100 = jrc
.filterBounds(geometry)
.filter(ee.Filter.eq('return_period', 100)).mosaic()

print(flood_100)

Map.addLayer(flood_100.clip(geometry),{palette:['skyblue', 'blue', 'darkblue']}, 'flood100', false)

print(
  ui.Chart.image.histogram(flood_100, geometry, 1000)
  )

var flood_200 = jrc
.filterBounds(geometry)
.filter(ee.Filter.eq('return_period', 200)).mosaic()

print(flood_200)

Map.addLayer(flood_200.clip(geometry),{palette:['skyblue', 'blue', 'darkblue']}, 'flood200', false)

print(
  ui.Chart.image.histogram(flood_200, geometry, 1000)
  )
  
var flood_500 = jrc
.filterBounds(geometry)
.filter(ee.Filter.eq('return_period', 500)).mosaic()

print(flood_500)

Map.addLayer(flood_500.clip(geometry),{palette:['skyblue', 'blue', 'darkblue']}, 'flood500', false)

print(
  ui.Chart.image.histogram(flood_500, geometry, 1000)
  )
  
// Function to add a flood depth legend
function addFloodLegend() {
  var legend = ui.Panel({
    style: {
      position: 'bottom-right',
      padding: '8px 15px'
    }
  });

  var legendTitle = ui.Label({
    value: 'Flood Depth (m)',
    style: {
      fontWeight: 'bold',
      fontSize: '14px',
      margin: '0 0 6px 0',
      padding: '0'
    }
  });

  legend.add(legendTitle);

  // Color bar
  var makeRow = function(color, label) {
    var colorBox = ui.Label('', {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 4px 0'
    });
    var description = ui.Label(label, {margin: '0 0 4px 6px'});
    return ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal'));
  };

  var palette = ['skyblue', 'blue', 'darkblue'];
  var labels = ['0–0.5 m', '0.5–1.5 m', '>1.5 m'];

  for (var i = 0; i < palette.length; i++) {
    legend.add(makeRow(palette[i], labels[i]));
  }

  Map.add(legend);
}

addFloodLegend();

  
// Define return periods to compare
var return_periods = [20, 50, 100, 200, 500];

// Create an empty dictionary to store images
var flood_images = {};

// Loop over return periods to create a dictionary of images
return_periods.forEach(function(period) {
  var img = imageCollection
    .filter(ee.Filter.eq('return_period', period))
    .filterBounds(geometry)
    .mosaic()
    .clip(geometry);
    
  flood_images[period] = img;
  Map.addLayer(img, {min: 0, max: 1, palette: ['white', 'blue']}, 'Flood RP ' + period, false);
});



var flood_areas = return_periods.map(function(period) {
  var flood = flood_images[period];
  var flooded_area = flood.gt(0); // Flood depth > 0

  var stats = flooded_area.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: geometry,
    scale: 30,
    maxPixels: 1e10
  });

print('Flooded image bands:', flooded_area.bandNames());
  return ee.Feature(null, {
    'return_period': period,
    'flooded_pixels': stats.get('depth')
  });
});

// Convert list to FeatureCollection
var flood_fc = ee.FeatureCollection(flood_areas);

// Print table
print('Flooded area comparison', flood_fc);

var chart = ui.Chart.feature.byFeature(flood_fc, 'return_period', 'flooded_pixels')
  .setChartType('ColumnChart')
  .setOptions({
    title: 'Flooded Area vs Return Period',
    hAxis: {title: 'Return Period (years)'},
    vAxis: {title: 'Flooded Pixels'},
    colors: ['#1f78b4']
  });

print(chart);

var diff_500_20 = flood_images[500].subtract(flood_images[20]);
Map.addLayer(diff_500_20, {min: 0, max: 1, palette: ['white', 'purple']}, 'Flood Depth Diff: RP500 - RP20');

// Function to add legend for Flood Depth Difference (RP500 - RP20)
function addDiffLegend() {
  var legend = ui.Panel({
    style: {
      position: 'bottom-right',
      padding: '8px 15px'
    }
  });

  var legendTitle = ui.Label({
    value: 'Flood Depth Difference (m): RP500 - RP20',
    style: {
      fontWeight: 'bold',
      fontSize: '14px',
      margin: '0 0 6px 0',
      padding: '0'
    }
  });

  legend.add(legendTitle);

  // Create a color bar with gradient from white to purple
  var makeRow = function(color, label) {
    var colorBox = ui.Label('', {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 4px 0'
    });
    var description = ui.Label(label, {margin: '0 0 4px 6px'});
    return ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal'));
  };

  var palette = ['#ffffff', '#800080'];  // white to purple
  var labels = ['0 m', '1 m'];

  for (var i = 0; i < palette.length; i++) {
    legend.add(makeRow(palette[i], labels[i]));
  }

  Map.add(legend);
}
// Call the function to add legend
addDiffLegend();



var depthVis = {
  min: 0,
  max: 1,
  palette: ['ffffff','0000ff'],
};

Map.addLayer(jrc, depthVis, 'flood depth',true)