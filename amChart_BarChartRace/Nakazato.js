(function() {
  'use strict';
  kintone.events.on('app.record.index.show', function(event) {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end


    var spacediv = kintone.app.getHeaderSpaceElement();
    spacediv.style.height = '500px';
    spacediv.style.marginLeft = '25px';
    spacediv.style.marginRight = '25px';
    spacediv.style.border = 'solid';
    spacediv.style.borderColor = '#ED7B84';

    var chart = am4core.create(spacediv, am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    chart.numberFormatter.bigNumberPrefixes = [
      { "number": 1e+3, "suffix": "K" },
      { "number": 1e+6, "suffix": "M" },
      { "number": 1e+9, "suffix": "B" }
    ];

    var label = chart.plotContainer.createChild(am4core.Label);
    label.x = am4core.percent(97);
    label.y = am4core.percent(95);
    label.horizontalCenter = "right";
    label.verticalCenter = "middle";
    label.dx = -15;
    label.fontSize = 50;

    var stepDuration = 4000;

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "Manufacturer";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.rangeChangeEasing = am4core.ease.linear;
    valueAxis.rangeChangeDuration = stepDuration;
    valueAxis.extraMax = 0.1;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "Manufacturer";
    series.dataFields.valueX = "value";
    series.tooltipText = "{valueX.value}";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.interpolationDuration = stepDuration;
    series.interpolationEasing = am4core.ease.linear;

    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.horizontalCenter = "right";
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.label.textAlign = "end";
    labelBullet.label.dx = -10;

    chart.zoomOutButton.disabled = true;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(fill, target){
      return chart.colors.getIndex(target.dataItem.index);
    });

    var year = 2005;
    label.text = year.toString();

    var interval;

    function play() {
      interval = setInterval(function(){
        nextYear();
      }, stepDuration);
      nextYear();
    }

    function stop() {
      if (interval) {
        clearInterval(interval);
      }
    }

    function nextYear() {
      year++;

      if (year > 2014) {
        stop();
        return;
      }

      var newData = data[year];
      var itemsWithNonZero = 0;
      for (var i = 0; i < chart.data.length; i++) {
        chart.data[i].value = newData[i].value;
        if (chart.data[i].value > 0) {
          itemsWithNonZero++;
        }
      }

      if (year == 2005) {
        series.interpolationDuration = stepDuration / 4;
        valueAxis.rangeChangeDuration = stepDuration / 4;
      }
      else {
        series.interpolationDuration = stepDuration;
        valueAxis.rangeChangeDuration = stepDuration;
      }

      chart.invalidateRawData();
      label.text = year.toString();

      categoryAxis.zoom({ start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length });
    }


    categoryAxis.sortBySeries = series;
    
    var body = {
      'app': kintone.app.getId(),
      'query': kintone.app.getQueryCondition() + 'limit 500'
    };

    var data = {};
    kintone.api(kintone.api.url('/k/v1/records', true), 'GET', body, function(resp) {
      // success
      var records = resp.records;
      // var data = {};
      records.forEach(function(record) {
        if (data.hasOwnProperty(record.Year.value)) {
          data[record.Year.value].push({
            Manufacturer: record.Manufacturer.value,
            value: record.PhonesSold.value
          });
          return;
        }
        data[record.Year.value] = [
          {
            Manufacturer: record.Manufacturer.value,
            value: record.PhonesSold.value
          }
        ];
      });
      chart.data = JSON.parse(JSON.stringify(data[year]));
      categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

    }, function(error) {
      // error
      console.log(error);
    });
    series.events.on("inited", function() {
      setTimeout(function() {
         play();
      }, 2000);
    });
  });
})();
