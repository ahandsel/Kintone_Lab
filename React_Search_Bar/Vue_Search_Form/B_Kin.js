(function () {
  'use strict';
  // Replace with your Custom View's view ID
  var customViewID = 5526926;

  var vm = new Vue({
    data: {
      records: []
    },
  });

  kintone.events.on('app.record.index.show', function (event) {
    if (event.viewId !== customViewID) return event;
    var records = event.records;

    // Mount the Vue instance on the HTML element with ID #app in the custom view
    vm.$mount('#app');

    // Set the data
    Vue.set(vm, 'records', records); // Use the array of Kintone records as is
    return event;
  });
})();