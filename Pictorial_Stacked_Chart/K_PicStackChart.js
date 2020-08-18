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

    // import SVG data from K_SVG.js file
    var iconPath = imgData;

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

    series.maskSprite.path = iconPath;
    series.ticks.template.locationX = 1;
    series.ticks.template.locationY = 0.5;

    series.labelsContainer.width = 200;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "left";
    chart.legend.valign = "bottom";
  }); // end am4core.ready()
})();