(function($) {
  'use strict';
  var customViewID = 5526926;

  // Create a new Vue instance
  var vm = new Vue({
    data: {
      customers: []
    },
  });

  kintone.events.on('app.record.index.show', function(event) {
    if (event.viewId !== customViewID) return event; // Replace the ID number with the ID of the created custom view
    var customers = [
      {companyName: 'Company A', phoneNumber: '123-XXX-0000'},
      {companyName: 'Company B', phoneNumber: '123-XXX-1111'},
      {companyName: 'Company C', phoneNumber: '123-XXX-2222'},
      {companyName: 'Company D', phoneNumber: '123-XXX-3333'}
    ];
    // Mount the Vue instance on the HTML element with ID #app in the custom view
    vm.$mount('#app');

    // Set the data
    Vue.set(vm, 'customers', customers);
    return event;
  });
})();
