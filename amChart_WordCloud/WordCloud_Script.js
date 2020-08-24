(function () {
  'use strict';

  // Kintone event triggered after the record list page is displayed.
  kintone.events.on('app.record.detail.show', function (event) {

    // Accesses the Record in the Kintone App
    let kRecord = event.record;
    // Get data from the Text Area field
    let kText = kRecord.Text_area.value;

    // Retrieve & configure the Header Space element below the Record Detail view's header
    let headerSpace = kintone.app.record.getHeaderMenuSpaceElement();
    headerSpace.style.height = '500px';
    // headerSpace.style.width = '700px';
    headerSpace.style.marginLeft = '25px';
    headerSpace.style.marginRight = '25px';
    headerSpace.style.border = 'solid';
    headerSpace.style.borderColor = '#ED7B84';

    // Apply amCharts Themes for automatic animation
    am4core.useTheme(am4themes_animated);

    // Creating chart instance
    let chart = am4core.create(headerSpace, am4plugins_wordCloud.WordCloud);

    // Color Setting
    chart.color = am4core.color("#FF0000", 0);

    // Creating a series
    let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

    // Configuring the series
    series.accuracy = 4;
    series.step = 15;
    series.rotationThreshold = 0.7;
    series.maxCount = 200;
    series.minWordLength = 2;
    series.labels.template.margin(4, 4, 4, 4);
    series.maxFontSize = am4core.percent(30);
    series.angles = [0, -90];
    series.fontWeight = '900';
    series.labels.template.tooltipText = '{word}:\n[bold]{value}[/]';

    // - - - - - - - - - - - - - - -
    // Optional Settings:

    // Uncomment for word and value to be displayed
    // series.labels.template.text = "{word} {value}";

    // Uncomment for graphic to be at a 45 degree angle
    // series.labelsContainer.rotation = 45;
    // - - - - - - - - - - - - - - -

    // Auto-assigning colors from theme list
    series.colors = new am4core.ColorSet();
    // Keeps the words' color the same as it rotates
    series.colors.passOptions = {};

    series.text = kText;
    let allStopWords = lowerCase.concat(sentCase, upperCase);
    series.excludeWords = allStopWords;

    // - - - Extra Functionality - - -
    // Randomly generate new graphics every 2 minutes
    // setInterval(function () {
    //   series.dataItems.getIndex(Math.round(Math.random() * (series.dataItems.length - 1))).setValue("value", Math.round(Math.random() * 10));
    // }, 120000)

    // Enable export
    chart.exporting.menu = new am4core.ExportMenu();
    // chart.exporting.menu.align = "left";
    // chart.exporting.menu.verticalAlign = "top";
    chart.exporting.backgroundColor = am4core.color("#f00", 0);

    // Disable mouse wheel zooming
    chart.chartContainer.wheelable = false;

    // series.events.on("arrangestarted", function (ev) {
    //   ev.target.baseSprite.preloader.show(0);
    // });

    // // Displaying progress indicator
    // series.events.on("arrangeprogress", function (ev) {
    //   ev.target.baseSprite.preloader.progress = ev.progress;
    // });
  });
})();