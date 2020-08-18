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

  // Changed SVG to FlatIcon's Apple
  var iconPath = "M265.081,133.419c-7.95-26.232-25.885-43.17-51.866-48.984c-6.762-1.515-13.381-2.282-19.672-2.282 c-15.877,0-27.92,4.871-36.634,10.598c0.037-2.923-0.107-9.156-1.461-18.038c1.123,0.074,2.864,0.157,5.096,0.157 c11.068,0,31.675-2.036,45.315-15.674C224.47,40.584,221.405,8.747,221.265,7.4l-0.67-6.462l-6.462-0.67 C213.87,0.241,211.443,0,207.652,0c-11.069,0-31.675,2.037-45.312,15.675c-8.406,8.405-12.383,19.504-14.212,29.277 c-3.988-11.944-9.756-25.577-18.117-40.407c-2.169-3.847-7.05-5.21-10.898-3.039c-3.85,2.17-5.21,7.049-3.04,10.898 c24.289,43.078,24.902,75.465,24.828,80.66c-8.719-5.67-20.785-10.2-36.707-10.2c-0.001,0-0.004,0-0.006,0 c-6.288,0-12.904,0.412-19.668,1.926c-25.98,5.814-43.916,22.575-51.866,48.807c-7.353,24.263-4.524,51.562-0.857,70.264 c3.896,19.871,14.335,42.127,27.926,59.604c7.75,9.966,16.168,17.918,25.021,23.678c10.813,7.037,22.005,10.594,33.264,10.594 c10.8,0,21.136-3.236,30.86-9.631c9.726,6.395,20.061,9.623,30.861,9.623c11.26,0,22.452-3.569,33.266-10.605 c8.852-5.76,17.271-13.736,25.02-23.701c13.591-17.477,24.03-39.775,27.927-59.65C269.607,185.067,272.433,157.68,265.081,133.419z  M257.425,135.739c-3.312-10.927-8.563-20.036-15.576-27.162C248.862,115.703,254.113,124.813,257.425,135.739z"

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

  series.maskSprite.path = iconPath;
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