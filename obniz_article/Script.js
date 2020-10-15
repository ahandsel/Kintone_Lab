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
          // Kintone REST API Request
          // kintone.api(pathOrUrl, method, params, opt_callback, opt_errback)

          const pathOrUrl = kintone.api.url('/k/v1/record', true);

          const method = 'POST';

          const body = {
            'app': kintone.app.getId(),
            'record': {
              'Number': {
                'value': count
              }
            }
          };

          kintone.api(pathOrUrl, method, body,
            function (resp) {
              // Successful API Call
              console.log(resp);
            },
            function (error) {
              // Error
              console.log(error);
            });
          obniz.display.print('Saved to Kintone');
        }

        // Display the current count on Obniz
        obniz.display.print(count);
      };
    };
  });
})();