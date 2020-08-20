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
    "value": 1,
    "color": am4core.color("#390511")
  }, {
    "name": "The second",
    "value": 2,
    "color": am4core.color("#7b131c")
  }, {
    "name": "The third",
    "value": 3
  }, {
    "name": "The fourth",
    "value": 4
  }, {
    "name": "The fifth",
    "value": 5
  }, {
    "name": "The sixth",
    "value": 6
  }, {
    "name": "The seventh",
    "value": 7
  }];

  var series = chart.series.push(new am4charts.PictorialStackedSeries());
  series.dataFields.value = "value";
  series.dataFields.category = "name";
  series.alignLabels = true;

  series.maskSprite.path = svgApple;
  series.ticks.template.locationX = 1;
  series.ticks.template.locationY = 0.5;

  series.labelsContainer.width = 200;

  chart.legend = new am4charts.Legend();
  chart.legend.position = "left";
  chart.legend.valign = "bottom";
  // chart.background.fill = am4core.color("#f00", 0)
  // chart.background.opacity = 0
  // Enable export
  chart.exporting.menu = new am4core.ExportMenu();
}); // end am4core.ready()