(function () {
  'use strict';
  const kintoneEvents = ['app.record.create.submit', 'app.record.edit.submit', "app.record.edit.show", 'app.record.detail.show'];
  const subTotals = [];
  //choose blank case (dropdown)
  let sum_bara = 0;
  //choose normal case (dropdown)
  let sum_barb = 0;
  //choose V.I.P case (dropdown)
  let sum_barc = 0;

  kintone.events.on(kintoneEvents, function (event) {
    const rec = event.record;
    console.log(rec);
    const tableRecords = rec.Table.value;
    rec.blank.disabled = true;
    rec.normal.disabled = true;
    rec.vip.disabled = true;

    for (const element of tableRecords) {
      console.log(element);
      let category = tableRecords[element].value['typeab'].value;
      if (!subTotals[category]) {
        subTotals[category] = 0;
      }
      let price = tableRecords[i].value['price1'].value;
      subTotals[category] -= -1 * price;
    }
    sum_bara += subTotals['-----']; //how i can to get value here? this is right? or subTotals['undefined']
    sum_barb += subTotals['normal'];
    sum_barc += subTotals['vip'];

    if (event.type === 'app.record.create.submit' || event.type === 'app.record.edit.submit') {
      record.blank.value = sum_bara;
      record.normal.value = sum_barb;
      record.vip.value = sum_barc;
    }
    return event;
  });
})();