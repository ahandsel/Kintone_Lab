/**
 * ------------------------------------
 * This demo was created using amCharts 4.
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ------------------------------------
 */

am4core.ready(function () {

  // Initiate the Themes
  am4core.useTheme(am4themes_animated);

  var chart = am4core.create("chartdiv", am4charts.SlicedChart);
  chart.hiddenState.properties.opacity = 0; // initial fade in effect

  chart.data = [{
    "name": "The first",
    "value": 354
  }, {
    "name": "The second",
    "value": 245
  }, {
    "name": "The third",
    "value": 187
  }, {
    "name": "The fourth",
    "value": 123
  }, {
    "name": "The fifth",
    "value": 87
  }, {
    "name": "The sixth",
    "value": 45
  }, {
    "name": "The seventh",
    "value": 23
  }];

  var series = chart.series.push(new am4charts.PictorialStackedSeries());
  series.dataFields.value = "value";
  series.dataFields.category = "name";
  series.alignLabels = true;

  // Set the SVG data (from K_SVG.js)
  series.maskSprite.path = svgHuman;
  series.ticks.template.locationX = 1;
  series.ticks.template.locationY = 0.5;

  series.labelsContainer.width = 200;

  chart.legend = new am4charts.Legend();
  chart.legend.position = "left";
  chart.legend.valign = "bottom";
}); // end am4core.ready()