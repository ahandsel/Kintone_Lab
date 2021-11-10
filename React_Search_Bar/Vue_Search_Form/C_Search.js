(function () {
  'use strict';
  // Replace with your Custom View's view ID
  var customViewID = 5526926;

  var vm = new Vue({
    data: {
      searchText: '', // Add a section for search text to the data object
      records: [],
    },
    computed: {
      // Create a function to filter
      filteredRecords: function () {
        var self = this;
        return self.records.filter(function (record) {
          return record.companyName.value.indexOf(self.searchText) !== -1;
        });
      }
    },
  });

  kintone.events.on('app.record.index.show', function (event) {
    if (event.viewId !== customViewID) return event;
    var records = event.records;

    // Mount the Vue instance on the HTML element with ID #app in the custom view
    vm.$mount('#app');

    // Set the data
    Vue.set(vm, 'records', records);
    return event;
  });
})();