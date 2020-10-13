(() => {
  'use strict';

  // Instantiate Obniz with Obniz ID & set callback function
  const obniz = new Obniz('XXXX-XXXX');
  kintone.events.on('app.record.index.show', event => {
    obniz.onconnect = async () => {
      let count = 0;

      // Gets the input from the built-in black switch
      // Switch's 4 states: "none", "push", "left", "right"
      obniz.switch.onchange = function (state) {
        obniz.display.clear();
        if (state === 'right') {
          count++;
        } else if (state === 'left') {
          count--;
        } else if (state === 'push') {
          kintone.api();
        }
        // Display the current count on Obniz
        obniz.display.print(count);
      };
    };
  });
})();