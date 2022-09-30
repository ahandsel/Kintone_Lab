// Add a checkbox to show & hide the Kintone header
(function () {
  'use strict';
  // Run a function when the record list page appears
  kintone.events.on('app.record.index.show', function (event) {
    // Prevent duplication of the button
    if (document.getElementById('toggle_button') != null) {
      return;
    }
    // Set a button
    const toggleButton = document.createElement('input');
    toggleButton.setAttribute('type', 'checkbox');
    toggleButton.name = 'Hi'
    toggleButton.id = 'toggle_button';
    toggleButton.style.margin = '10px';
    toggleButton.style.padding = '2px 2px';

    const toggleLabel = document.createElement('label');
    toggleLabel.htmlFor = 'toggle_button';
    toggleLabel.appendChild(document.createTextNode('Header Toggle'));

    const br = document.createElement('br');

    // Button onclick function
    toggleButton.onclick = function () {
      headerToggle();
    };

    // Retrieve the header menu space element and set the button there
    const container = kintone.app.getHeaderSpaceElement();
    container.appendChild(toggleButton);
    container.appendChild(toggleLabel);
    container.appendChild(br);

    // const record = event.record;
    function headerToggle() {
      let header = document.getElementsByClassName('gaia-argoui-app-index-toolbar')[0];
      if (header.style.display === 'none') {
        header.style.display = 'block';
        console.log('Showing the header');
        toggleButton.innerHTML = 'Show Header!';
      } else {
        header.style.display = 'none';
        console.log('Hiding the header');
        toggleButton.innerHTML = 'Hide Header!';
      }
    }
  });

})();