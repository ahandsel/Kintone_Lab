(function () {
  'use strict';

  kintone.events.on('app.record.detail.show', function (event) {

    // Extract data from Kintone
    var record = event.record;
    var output = record.Text_area.value;
    var chartdivKintone = kintone.app.record.getHeaderMenuSpaceElement();
    var chartdivMini = kintone.app.record.getSpaceElement('mini');
    chartdivKintone.style.height = '700px';

    // Create chart instance
    var chart = am4core.create(chartdivKintone, am4plugins_wordCloud.WordCloud);
    var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
    series.text = output;

    series.colors = new am4core.ColorSet();

    // Enable export
    chart.exporting.menu = new am4core.ExportMenu();

    // Output for Mini
    var miniOutput = document.createElement('div');
    miniOutput.id = 'chartdivKintone';
    chartdivMini.appendChild(miniOutput);

  });
})();