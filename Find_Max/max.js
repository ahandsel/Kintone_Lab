(function () {
  'use strict';
  kintone.events.on('app.record.index.show', function (event) {
    //define a function that uses the REST API to get all the app's records:
    function fetchRecords(appId, opt_offset, opt_limit, opt_records) {
      var offset = opt_offset || 0;
      var limit = opt_limit || 100;
      var allRecords = opt_records || [];
      var params = {
        app: appId,
        query: 'limit ' + limit + ' offset ' + offset
      };
      return kintone.api('/k/v1/records', 'GET', params).then(function (resp) {
        allRecords = allRecords.concat(resp.records);
        if (resp.records.length === limit) {
          return fetchRecords(appId, offset + limit, limit, allRecords);
        }
        return allRecords;
      });
    }
    //check if the header already contains the information:
    if (document.getElementById('p1') !== null) {
      return;
    }
    //if it does not, get the header space and the app records:
    var header = kintone.app.getHeaderSpaceElement();
    fetchRecords(kintone.app.getId()).then(function (records) {
      // (1) USING THE _.max FUNCTION
      var maxNumber = _.max(records, function (record) {
        return parseInt(record.Number.value, 10);
      });

      var p1 = document.createElement("p");
      p1.id = 'p1';
      p1.innerHTML = 'The student with the highest science score is: ' + maxNumber.Name.value;
      header.appendChild(p1);
    });
  });
})();