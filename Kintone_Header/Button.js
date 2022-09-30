(function() {
  'use strict';
  // Run a function when the record list page appears
  kintone.events.on('app.record.index.show', function(event) {
    // Prevent duplication of the button
    if (document.getElementById('my_index_button') != null) {
      return;
    }
    // Set a button
    const myIndexButton = document.createElement('button');
    myIndexButton.id = 'my_index_button';
    myIndexButton.innerHTML = 'Click Me!';

    // Button onclick function
    myIndexButton.onclick = function() {
      window.alert('You clicked me!');
    };

    // Retrieve the header menu space element and set the button there
    kintone.app.getHeaderMenuSpaceElement().appendChild(myIndexButton);
  });
})();