// Add a checkbox to show & hide the Kintone header
(function () {
  'use strict';
  // Run a function when the record list page appears
  kintone.events.on('app.record.index.show', function (event) {
    // Prevent duplication of the button
    if (document.getElementById('toggle') !== null) { return; }

    // Label for the switch
    const toggleLabel = document.createElement('label');
    toggleLabel.htmlFor = 'toggle';
    // toggleLabel.appendChild(document.createTextNode('Header Toggle'));

    // Set the switch
    const toggleButton = document.createElement('input');
    toggleButton.setAttribute('type', 'checkbox');
    toggleButton.id = 'toggle';
    toggleButton.style.margin = '10px';
    toggleButton.style.padding = '2px 2px';
    // toggleButton.style.display = 'none';
    toggleButton.appendChild(document.createTextNode('Header Toggle'));


    // Toggle Wrapper span
    const toggleDiv = document.createElement('div');
    toggleDiv.class = 'toggle-wrapper';
    toggleDiv.style.position = 'relative';
    toggleDiv.style.width = '120px';
    toggleDiv.style.height = '60px';
    toggleDiv.style.backgroundColor = '#eaeaea';
    toggleDiv.style.borderRadius = '999px';
    toggleDiv.style.margin = 'auto';
    toggleDiv.style.cursor = 'pointer';
    toggleDiv.style.pointerEvents = 'all';

    // Toggle selector
    const toggleSpan = document.createElement('span');
    toggleSpan.class = 'selector';
    toggleSpan.style.width = '40px';
    toggleSpan.style.height = '40px';
    toggleSpan.style.position = 'absolute';
    toggleSpan.style.top = '50%';
    toggleSpan.style.left = '10px';
    toggleSpan.style.transform = 'translateY(-50%)';
    toggleSpan.style.backgroundColor = '#3957ee';
    toggleSpan.style.transition = 'left 0.25s ease';
    toggleSpan.style.borderRadius = '50%';
    // Button onclick function
    toggleButton.onclick = function () {
      headerToggle();
    };

    // Retrieve the header menu space element and set the button there
    const container = kintone.app.getHeaderSpaceElement();
    container.appendChild(toggleLabel);
    toggleLabel.appendChild(toggleButton);
    toggleLabel.appendChild(toggleDiv);
    toggleDiv.appendChild(toggleSpan);

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
        toggleDiv.style.left = 'calc(100% - 50px)';
        toggleDiv.style.backgroundColor = '#ee5f39';
        toggleSpan.style.left = 'calc(100% - 50px)';
        toggleSpan.style.backgroundColor = '#ee5f39';
      }
    }
  });

})();