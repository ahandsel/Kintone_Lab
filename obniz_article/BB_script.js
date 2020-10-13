(() => {
  'use strict';
  const obniz = new Obniz('XXXX-XXXX');
  kintone.events.on('app.record.index.show', event => {
    obniz.onconnect = async () => {
      let count = 0;
      obniz.switch.onchange = function (state) {
        obniz.display.clear();
        if (state === 'right') {
          count++;
        } else if (state === 'left') {
          count--;
        } else if (state === 'push') {
          kintone.api();
        }
        obniz.display.print(count);
      };
    };
  });
})();