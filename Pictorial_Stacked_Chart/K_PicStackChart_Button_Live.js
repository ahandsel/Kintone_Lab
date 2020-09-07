(function () {
  'use strict';

  // Kintone event triggered after the record list page is displayed.
  kintone.events.on('app.record.index.show', function (event) {
    function charting(svgData, type) {
      am4core.disposeAllCharts();
      // Retrieve & configure the space element below the record list's header
      var spaceDiv = kintone.app.getHeaderSpaceElement();
      spaceDiv.style.height = '500px';
      spaceDiv.style.marginLeft = '25px';
      spaceDiv.style.marginRight = '25px';
      spaceDiv.style.border = 'solid';
      spaceDiv.style.borderColor = '#ED7B84';

      // Auto-Animation
      am4core.useTheme(am4themes_animated);
      // Material Coloring
      // am4core.useTheme(am4themes_material);

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
      series.dataFields.value = 'value';
      series.dataFields.category = 'name';

      if (type !== 'minimal') {
        // Putting labels next to the slices
        series.alignLabels = true;
        series.labelsOpposite = false;

        // Ticks connect slice to its label
        series.ticks.template.locationX = 0.3;
        series.ticks.template.locationY = 0.5;
        series.ticks.template.strokeWidth = 2;
        series.ticks.template.strokeOpacity = 0.7;
        series.ticks.template.stroke = am4core.color("#DEB886");

        chart.legend = new am4charts.Legend();
        chart.legend.position = 'right';
        chart.legend.valign = 'bottom';
        chart.legend.maxWidth = 'undefined';
      }
      if (type == 'minimal') {
        series.labels.template.fill = am4core.color("#FFFFFF");
        series.labels.template.fontSize = 0;
      }

      // Set the SVG data (from K_SVG.js)
      if (typeof svgData == 'undefined') {
        svgData = svgApple;
      }
      series.maskSprite.path = svgData;

      // --- Optional ---

      // Enable export
      chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.menu.align = 'left';
      chart.exporting.menu.verticalAlign = 'top';
      chart.exporting.backgroundColor = am4core.color('#f00', 0);
      console.log('done');
    }

    //Prevent duplication of the button
    if (document.getElementById('changeButton') != null) {
      return;
    }

    var styling = 'display:inline-block;box-sizing:border-box;padding:0 16px;min-width:163px;height:48px;outline:none;border:1px solid #e3e7e8;background-color:#f7f9fa;box-shadow:1px 1px 1px #fff inset;color:#3498db;text-align:center;line-height:48px;font-weight: bold;';

    // Set a button
    var svgButton = document.createElement('button');
    svgButton.id = 'changeButton';
    svgButton.innerText = 'Change Image';
    svgButton.onclick = buttonAction;
    svgButton.style = styling;

    var pointer = 0;
    var svgArray = [svgHuman, svgBottle, svgCan, svgApple, svgJam];

    function buttonAction() {
      pointer++;
      if (pointer >= svgArray.length) {
        pointer = 0;
      }
      charting(svgArray[pointer]);
    }

    // Set a button
    var imgOnlyBtn = document.createElement('button');
    imgOnlyBtn.id = 'imgOnlyID';
    imgOnlyBtn.innerText = 'Graph Only';
    imgOnlyBtn.onclick = imgOnlyAction;
    imgOnlyBtn.style = styling;

    function imgOnlyAction() {
      charting(svgArray[pointer], 'minimal');
    }

    // Append Buttons to Kintone Header
    kintone.app.getHeaderMenuSpaceElement().appendChild(svgButton);
    kintone.app.getHeaderMenuSpaceElement().appendChild(imgOnlyBtn);

    charting(svgHuman);
  }); // end am4core.ready()
})();