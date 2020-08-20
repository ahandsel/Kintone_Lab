(function () {
  'use strict';
  kintone.events.on('app.record.index.show', function (event) {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var spaceDiv = kintone.app.getHeaderSpaceElement();
    spaceDiv.style.height = '500px';
    spaceDiv.style.marginLeft = '25px';
    spaceDiv.style.marginRight = '25px';
    spaceDiv.style.border = 'solid';
    spaceDiv.style.borderColor = '#ED7B84';
    var chart = am4core.create(spaceDiv, am4plugins_wordCloud.WordCloud);
    var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

    series.accuracy = 4;
    series.step = 15;
    series.rotationThreshold = 0.7;
    series.maxCount = 200;
    series.minWordLength = 2;
    series.labels.template.margin(4, 4, 4, 4);
    series.maxFontSize = am4core.percent(30);
    series.excludeWords = ['the', 'a', 'it', 'is', 'to', 'and', 'that', 'of', 'this', 'you', 'what', 'will', 'in', 'with', 'your', 'on', 'we'];

    var texts;

    event.records.forEach(function (record) {
      texts += record.content.value;
    });

    series.text = texts;

    series.colors = new am4core.ColorSet();
    series.colors.passOptions = {}; // makes it loop

    //series.labelsContainer.rotation = 45;
    series.angles = [0, -90];
    series.fontWeight = "700";

    setInterval(function () {
      series.dataItems.getIndex(Math.round(Math.random() * (series.dataItems.length - 1))).setValue("value", Math.round(Math.random() * 10));
    }, 10000);

  });
})();