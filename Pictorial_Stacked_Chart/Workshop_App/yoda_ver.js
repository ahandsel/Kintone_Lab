(function () {
  'use strict';
  kintone.events.on('app.record.index.show', function (event) {
    var records = event.records;

    // 描画する領域
    var spaceDiv = kintone.app.getHeaderSpaceElement();
    spaceDiv.style.height = '500px';
    spaceDiv.style.marginLeft = '25px';
    spaceDiv.style.marginRight = '25px';
    spaceDiv.style.border = 'solid';
    spaceDiv.style.borderColor = '#ED7B84';

    // SVG
    // https://www.flaticon.com/free-icon/cup-of-hot-chocolate_15234
    var iconPath = 'M36.591,39.606c8.158-0.328,11.784-4.041,11.784-8.585c0-3.947-2.739-7.268-8.806-8.288    c0.027-1.468,0.029-2.884,0.029-4.206H0.909c0,8.644,0.01,21.2,7.776,27.197c-4.713,0.361-7.776,0.935-7.776,1.581    c0,1.094,8.661,1.979,19.345,1.979s19.344-0.885,19.344-1.979c0-0.646-3.063-1.221-7.775-1.581    C33.931,44.097,35.472,41.991,36.591,39.606z M39.425,26.492c3.404,0.789,4.012,2.458,3.973,4.619    c-0.043,2.454-0.754,4.115-5.402,4.687C38.837,32.811,39.235,29.604,39.425,26.492z M5.579,21.527h6.048    c-2.711,8,1.863,20.658,1.862,20.658C3.601,34.606,5.579,21.527,5.579,21.527z';

    // チャートの初期化
    am4core.disposeAllCharts();

    // テーマ
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(spaceDiv, am4charts.SlicedChart);

    // データの整形
    var caffeineTotals = records.reduce(function (result, current) {
      var category = result.find(function (value) {
        return value.name === current.caffeine.value;
      });
      if (category) {
        category.value++;
      } else {
        result.push({
          name: current.caffeine.value,
          value: 1
        });
      }
      return result;
    }, []);
    chart.data = caffeineTotals;
    console.log(caffeineTotals);

    // Create chart series
    var series = chart.series.push(new am4charts.PictorialStackedSeries());
    series.dataFields.value = 'value';
    series.dataFields.category = 'name';
    series.alignLabels = true;

    // タイトルを表示する
    var title = chart.titles.create();
    title.text = 'How do you get your caffeine?';
    title.fontSize = 30;
    title.marginBottom = 40;

    // チャートを描画するSVGの指定
    series.maskSprite.path = iconPath;

    // データラベルに繋がる棒の表示位置を設定する
    series.ticks.template.locationX = 1;
    series.ticks.template.locationY = 0.5;
    // データラベルの表示幅を設定する
    series.labelsContainer.width = 200;

    // 凡例を表示する
    chart.legend = new am4charts.Legend();
    // 凡例の位置を設定する
    chart.legend.position = 'left';
    chart.legend.valign = 'bottom';

    return event;
  });
})();