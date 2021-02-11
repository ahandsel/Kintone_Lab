// amChart TimeLine x Kintone

(function () {
  'use strict';

  const partyColor = {
    'Democratic': '#2502fe',
    'Democratic-Republican': '#0e7003',
    'Federalist': '#e28665',
    'Republican': '#e0001b',
    'Unaffiliated': '#d5d5d5',
    'Whig': '#ebbd50'
  };

  // Kintone event triggered after the record list page is displayed.
  kintone.events.on('app.record.index.show', function (event) {

    // Retrieve & configure the space element below the record list's header
    const spaceDiv = kintone.app.getHeaderSpaceElement();
    spaceDiv.style.height = '650px';
    spaceDiv.style.marginLeft = '25px';
    spaceDiv.style.marginRight = '25px';
    spaceDiv.style.border = 'solid';
    spaceDiv.style.borderColor = '#ED7B84';

    // Automatically enable all amCharts animations
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    const chart = am4core.create(spaceDiv, am4plugins_timeline.SerpentineChart);
    chart.autoMargins = true;
    chart.paddingTop = '1px';
    chart.paddingTop = '70px';
    chart.levelCount = 5;
    chart.maskBullets = false; // Allow bullets to "bleed" over the edge
    chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';
    chart.dateFormatter.dateFormat = 'yyyy-MM-dd';
    chart.fontSize = 12;
    chart.tooltipContainer.fontSize = 12;
    chart.data = event.records.map((records, index) => {
      return {
        'text': `${records.First.value}\n${records.Last.value}`,
        'color': partyColor[records.Party.value],
        'start': records.start.value,
        'end': records.end.value,
        'textDisabled': false,
        'icon': `https://github.com/ahandsel/US-Presidents/raw/main/img/President_${records.Number.value}.png`,
        'category': ''
      }
    });

    console.log('chart.data');
    console.log(chart.data);

    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';

    // Timeline axis
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 70;
    // Specify the time unit
    dateAxis.baseInterval = {
      count: 2,
      timeUnit: 'years'
    };
    dateAxis.renderer.tooltipLocation = 0;
    dateAxis.renderer.line.strokeDasharray = '1,4';
    dateAxis.renderer.line.strokeOpacity = 1;
    dateAxis.tooltip.background.fillOpacity = 0.2;
    dateAxis.tooltip.background.cornerRadius = 5;
    dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor('alternativeBackground');
    dateAxis.tooltip.label.paddingTop = 7;
    dateAxis.endLocation = 0;
    dateAxis.startLocation = -0.5;

    // Timeline axis' label
    const labelTemplate = dateAxis.renderer.labels.template;
    labelTemplate.verticalCenter = 'middle';
    labelTemplate.fillOpacity = 1;
    labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor('background');
    labelTemplate.background.fillOpacity = 1;
    labelTemplate.padding(7, 7, 7, 7);

    // Series containing the US Presidents and their terms
    const series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
    series.columns.template.height = am4core.percent(15);
    series.dataFields.openDateX = 'start';
    series.dataFields.dateX = 'end';
    series.dataFields.categoryY = 'category';
    series.baseAxis = categoryAxis;
    series.columns.template.propertyFields.fill = 'color';
    series.columns.template.propertyFields.stroke = 'color';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.fillOpacity = 0.6;

    // Create the PinBullet (Circles)
    const pinBullet = series.bullets.push(new am4plugins_bullets.PinBullet());
    pinBullet.locationX = 1;
    pinBullet.propertyFields.stroke = 'color';
    pinBullet.background.propertyFields.fill = 'color';
    pinBullet.image = new am4core.Image();
    pinBullet.image.propertyFields.href = 'icon';

    // President's name over the icon
    const textBullet = series.bullets.push(new am4charts.LabelBullet());
    textBullet.label.propertyFields.text = 'text';
    textBullet.disabled = true;
    textBullet.propertyFields.disabled = 'textDisabled';
    textBullet.label.strokeOpacity = 0;
    textBullet.locationX = 1;
    textBullet.dy = -80;
    textBullet.label.textAlign = 'middle';

    // Scrollbar used to focus the timeline
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.align = 'center'
    chart.scrollbarX.width = am4core.percent(75);
    chart.scrollbarX.opacity = 0.5;
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    // Year appearing when hovering over the chart axis
    const cursor = new am4plugins_timeline.CurveCursor();
    chart.cursor = cursor;
    cursor.xAxis = dateAxis;
    cursor.yAxis = categoryAxis;
    cursor.lineY.disabled = true;
    dateAxis.renderer.tooltipLocation2 = 0.5;
  });
})();