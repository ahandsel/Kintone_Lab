// Kintone x Sweetalert2
(function() {
  'use strict';
  var submitEvents = [
    'app.record.create.submit',
    'app.record.edit.submit',
    'app.record.index.edit.submit'
  ];
  kintone.events.on(submitEvents, function(event) {
      //confirm saving the record:
      return swal({
          title: 'Are you sure you want to save this record?',
          type: 'question',
          showCancelButton: true,
          confirmButtonText: 'Save',
      }).then(function(result) {
          if (!result.value) {
              swal({
                  position: 'center',
                  timer: 1200,
                  //confirm failed record save:
                  text: 'You did not save the record',
                  type: 'success',
                  showConfirmButton: false
              });
              return false;
          }
          return event;
      });
  });
})();