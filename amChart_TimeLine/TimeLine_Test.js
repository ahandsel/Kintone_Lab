// TimeLine x Kintone Test by Genji
// https://drive.google.com/uc?export=view&id=1lapS2hg7VTOGrpIkZDRilEMnQVCjwgaK

/* Required CDNs
https://cdn.amcharts.com/lib/4/core.js
https://cdn.amcharts.com/lib/4/charts.js
https://cdn.amcharts.com/lib/4/plugins/timeline.js
https://cdn.amcharts.com/lib/4/plugins/bullets.js
https://cdn.amcharts.com/lib/4/themes/animated.js
*/

(function () {
  'use strict';

  // Kintone event triggered after the record list page is displayed.
  kintone.events.on('app.record.index.show', function (event) {
    // Retrieve & configure the space element below the record list's header
    const spaceDiv = kintone.app.getHeaderSpaceElement();
    spaceDiv.style.height = '900px';
    spaceDiv.style.marginLeft = '25px';
    spaceDiv.style.marginRight = '25px';
    spaceDiv.style.border = 'solid';
    spaceDiv.style.borderColor = '#ED7B84';

    // Automatically enable all amCharts animations
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    const chart = am4core.create(spaceDiv, am4plugins_timeline.SerpentineChart);
    // chart.curveContainer.padding(100, 20, 50, 20);
    chart.curveContainer.padding(20, 20, 20, 20);
    chart.levelCount = 5;
    // chart.yAxisRadius = am4core.percent(20);
    // chart.yAxisInnerRadius = am4core.percent(2);
    chart.maskBullets = false;

    // Auto-assigning colors from theme list
    // const colorSet = new am4core.ColorSet();

    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';
    chart.dateFormatter.dateFormat = 'yyyy-MM-dd';

    console.log(event.records);

    chart.data = event.records.map((records, index) => {
      return {
        'category': '',
        'text': `${records.First.value}\n${records.Last.value}`,
        'start': records.start.value,
        'end': records.end.value,
        'textDisabled': false,
        'icon': `https://github.com/ahandsel/US-Presidents/raw/main/img/President_${records.Number.value}.png`,
        'color': records.Color.value
      }
    });

    console.log('chart.data');
    console.log(chart.data);

    chart.fontSize = 10;
    chart.tooltipContainer.fontSize = 10;

    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.paddingRight = 25;
    categoryAxis.renderer.minGridDistance = 10;

    // Date axis (DateAxis) is a Value axis that uses date & time scale.
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = {
      count: 2,
      timeUnit: 'years' //identifies base time unit (second, minute, hour, day, etc.)
    };

    dateAxis.renderer.tooltipLocation = 0;
    dateAxis.renderer.line.strokeDasharray = '1,4';
    dateAxis.renderer.line.strokeOpacity = 0.5;
    dateAxis.tooltip.background.fillOpacity = 0.2;
    dateAxis.tooltip.background.cornerRadius = 5;
    dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor('alternativeBackground');
    dateAxis.tooltip.label.paddingTop = 7;
    dateAxis.endLocation = 0;
    dateAxis.startLocation = -0.5;

    const labelTemplate = dateAxis.renderer.labels.template;
    labelTemplate.verticalCenter = 'middle';
    labelTemplate.fillOpacity = 0.4;
    labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor('background');
    labelTemplate.background.fillOpacity = 1;
    labelTemplate.padding(7, 7, 7, 7);

    const series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
    series.columns.template.height = am4core.percent(15);

    series.dataFields.openDateX = 'start';
    series.dataFields.dateX = 'end';
    series.dataFields.categoryY = 'category';
    series.baseAxis = categoryAxis;
    series.columns.template.propertyFields.fill = 'color'; // get color from data
    series.columns.template.propertyFields.stroke = 'color';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.fillOpacity = 0.6;

    // Create the PinBullet (Circles)
    const imageBullet1 = series.bullets.push(new am4plugins_bullets.PinBullet());
    imageBullet1.locationX = 1;
    imageBullet1.propertyFields.stroke = 'color';
    imageBullet1.background.propertyFields.fill = 'color';
    imageBullet1.image = new am4core.Image();
    imageBullet1.image.propertyFields.href = 'icon';
    // imageBullet1.image.propertyFields.href = apple;
    imageBullet1.image.scale = 0.5;
    // imageBullet1.circle.radius = am4core.iconpercent(100);
    imageBullet1.circle.radius = am4core.percent(90);
    imageBullet1.dy = -5;

    const textBullet = series.bullets.push(new am4charts.LabelBullet());
    textBullet.label.propertyFields.text = 'text';
    textBullet.disabled = true;
    textBullet.propertyFields.disabled = 'textDisabled';
    textBullet.label.strokeOpacity = 0;
    textBullet.locationX = 1;
    textBullet.dy = -100;
    textBullet.label.textAlign = 'middle';

    // Create scrollbars
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.align = 'center'
    chart.scrollbarX.width = am4core.percent(75);
    chart.scrollbarX.opacity = 0.5;

    const cursor = new am4plugins_timeline.CurveCursor();
    chart.cursor = cursor;
    cursor.xAxis = dateAxis;
    cursor.yAxis = categoryAxis;
    cursor.lineY.disabled = true;
    cursor.lineX.strokeDasharray = '1,4';
    cursor.lineX.strokeOpacity = 1;

    dateAxis.renderer.tooltipLocation2 = 0;
    categoryAxis.cursorTooltipEnabled = false;

    // const label = chart.createChild(am4core.Label);
    // label.isMeasured = false;
    // label.y = am4core.percent(40);
    // label.x = am4core.percent(50);
    // label.horizontalCenter = 'middle';
    // label.fontSize = 20;
    // const body = {
    //   'id': kintone.app.getId()
    // };
    // kintone.api(kintone.api.url('/k/v1/app', true), 'GET', body, function(resp) {
    //   label.text = resp.description.replace(/<[^>]+>/g, '');
    // }, function(error) {
    //   console.log(error);
    // });
  }); // end am4core.ready()
})();