// Add a button to show & hide the Kintone header
(function () {
  'use strict';
  // Run a function when the record list page appears
  kintone.events.on('app.record.index.show', function (event) {
    // Prevent duplication of the button
    if (document.getElementById('toggle_button') != null) {
      return;
    }
    // Set a button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'toggle_button';
    toggleButton.innerHTML = 'Hide Header!';

    // Button onclick function
    toggleButton.onclick = function () {
      headerToggle();
    };

    // Retrieve the header menu space element and set the button there
    kintone.app.getHeaderSpaceElement().appendChild(toggleButton);
    // const record = event.record;
    function headerToggle() {
      let header = document.getElementsByClassName('gaia-argoui-app-index-toolbar')[0];
      if (header.style.display === "none") {
        header.style.display = "block";
        console.log('Showing the header');
        toggleButton.innerHTML = 'Show Header!';
      } else {
        header.style.display = "none";
        console.log('Hiding the header');
        toggleButton.innerHTML = 'Hide Header!';
      }
    }
  });

})();