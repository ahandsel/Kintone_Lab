// Number_0 = Phone Units
// Number = Year
// Drop_down = firms

kintone.api(kintone.api.url('/k/v1/records', true), 'GET', body,
  function (resp) {
    // Successful API Call

    var records = resp.records;
    records.forEach(function (record) {

      if (allData.hasOwnProperty(record.Number.value)) {
        allData[record.Number.value].push({
          Manufacturer: record.Drop_down.value,
          value: record.Number_0.value
        });
        return;
      }

      allData[record.Number.value] = [{
        Manufacturer: record.Drop_down.value,
        value: record.Number_0.value
      }];
    });

    console.log('allData');
    console.log(allData);
    chart.data = JSON.parse(JSON.stringify(allData[year]));

    categoryAxis.zoom({
      start: 0,
      end: 1 / chart.data.length
    });

  },
  function (error) {
    // Error
    console.log(error);
  });