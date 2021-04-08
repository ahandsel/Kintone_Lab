/*
 * This sample plug-in automatically adds row numbers to table rows each time the record is saved.
 * Copyright (c) 2018 Cybozu
 *
 * Licensed under the MIT License
 */
(function($, PLUGIN_ID) {
  'use strict';

  var CONFIG = kintone.plugin.app.getConfig(PLUGIN_ID); // Get plug-in configuration settings
  var TABLEFIELD, NUMBERFIELD, disableEvents;
  // Disable number fields in table at these events
  var numberEvents, row;
  var sortEvents, BUTTONFIELD, SORT_BY, ORDER_BY;
  // Get each setting
  if (!CONFIG) {
    return false;
  }

  TABLEFIELD = CONFIG.table; // Field code of the table
  NUMBERFIELD = CONFIG.number; // Field code of number field in the table
  disableEvents = [
    'app.record.edit.show',
    'app.record.create.show',
    'app.record.edit.change.' + TABLEFIELD,
    'app.record.create.change.' + TABLEFIELD
  ];

  kintone.events.on(disableEvents, function(event) {
    var record = event.record;
    // Disable number fields in table rows
    var count = record[TABLEFIELD].value.length;
    for (row = 0; row < count; row++) {
      record[TABLEFIELD].value[row].value[NUMBERFIELD].disabled = true;
    }
    return event;
  });

  // Number table rows at these events
  numberEvents = [
    'app.record.create.submit',
    'app.record.edit.submit'
  ];
  kintone.events.on(numberEvents, function(event) {
    var record = event.record;

    // Auto-number the table rows
    var count = record[TABLEFIELD].value.length;
    for (row = 0; row < count; row++) {
      record[TABLEFIELD].value[row].value[NUMBERFIELD].value = row + 1;
    }

    return event;
  });

  // sort
  sortEvents = [
    'app.record.edit.show',
    'app.record.create.show',
  ];
  BUTTONFIELD = CONFIG.button;
  SORT_BY = CONFIG.sortBy;
  ORDER_BY = CONFIG.sortOrder;

  function sorting() {
    var obj = kintone.app.record.get();

    // テーブルの値をソートする
    obj.record[TABLEFIELD].value.sort(function(a, b) {
      if (ORDER_BY === 'asc') {
        if (a.value[SORT_BY].value < b.value[SORT_BY].value) return -1;
        if (a.value[SORT_BY].value > b.value[SORT_BY].value) return 1;
      }

      if (ORDER_BY === 'desc') {
        if (a.value[SORT_BY].value < b.value[SORT_BY].value) return 1;
        if (a.value[SORT_BY].value > b.value[SORT_BY].value) return -1;
      }
      return 0;
    });
    kintone.app.record.set(obj);
  }

  kintone.events.on(sortEvents, function(event) {
    // ボタンクリック時の処理
    var $button = kintone.app.record.getSpaceElement(BUTTONFIELD);
    $('<input>').attr({type: 'button', value: 'sort', id: 'sort'}).appendTo($button);
    $('#sort').click(sorting);

    return event;
  });
})(jQuery, kintone.$PLUGIN_ID);
