(function () {
  'use strict';

  // Kintone event triggered after the record list page is displayed.
  kintone.events.on('app.record.index.show', function (event) {

    // Retrieve & configure the space element below the record list's header
    var spaceDiv = kintone.app.getHeaderSpaceElement();
    spaceDiv.style.height = '500px';
    spaceDiv.style.marginLeft = '25px';
    spaceDiv.style.marginRight = '25px';
    spaceDiv.style.border = 'solid';
    spaceDiv.style.borderColor = '#ED7B84';

    // Initiate the Themes
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create(spaceDiv, am4charts.SlicedChart);
    // initial fade in effect
    chart.hiddenState.properties.opacity = 0;

    // Create JSON object from Kintone records & pass it onto amCharts
    var kData = event.records.map(function (record) {
      return {
        'name': record.Text.value,
        'value': Number(record.Number.value)
      }
    });
    chart.data = kData;

    // Create chart series
    var series = chart.series.push(new am4charts.PictorialStackedSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "name";
    series.alignLabels = true;

    // Set the SVG data (from K_SVG.js)
    series.maskSprite.path = svgCan;

    // Ticks connect slice to its label
    series.ticks.template.locationX = 1;
    series.ticks.template.locationY = 0.5;

    // Container label elements are put in.
    series.labelsContainer.width = 200;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "left";
    chart.legend.valign = "bottom";

    // --- Optional ---

    // Enable export
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = "left";
    chart.exporting.menu.verticalAlign = "top";
    chart.exporting.backgroundColor = am4core.color("#f00", 0);
  }); // end am4core.ready()
})();