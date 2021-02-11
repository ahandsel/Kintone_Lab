(function () {
  "use strict";
  kintone.events.on(['app.record.create.submit', 'app.record.edit.submit', "app.record.edit.show", 'app.record.detail.show'], function (event) {
    var record = event.record;

    var subTotals = new Array();
    var tableRecords = event.record.table.value;


    for (var i = 0; i < tableRecords.length; i++) {
      var category = tableRecords[i].value['typeab'].value;
      if (!subTotals[category]) {
        subTotals[category] = 0;
      }
      var price = tableRecords[i].value['price1'].value;
      subTotals[category] -= -1 * price;
    }
    //choose blank case (dropdown)
    var sum_bara = 0;
    //choose normal case (dropdown)
    var sum_barb = 0;
    //choose V.I.P case (dropdown)
    var sum_barc = 0;

    event.record.blank.disabled = true;
    event.record.normal.disabled = true;
    event.record.V.I.P.disabled = true;

    sum_bara += subTotals['-----']; //how i can to get value here? this is right? or subTotals['undefined']
    sum_barb += subTotals['normal'];
    sum_barc += subTotals['V.I.P'];

    if (event.type === 'app.record.create.submit' || event.type === 'app.record.edit.submit') {
      record.blank.value = sum_bara;
      record.normal.value = sum_barb;
      record.V.I.P.value = sum_barc;
    }
    return event;
  });
})();