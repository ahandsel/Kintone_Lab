// https://note.com/llc_luck/n/n1e3b74614c5f

(function() {
  'use strict';
  kintone.events.on('app.record.index.show', (event) => {
    const body = {
      'app': kintone.app.getId(),
    };
    kintone.api(kintone.api.url('/k/v1/app/views', true), 'GET', body, function(resp) {
      console.log(resp);
      if(resp.views.sample1.name === 'sample1') {
        const btn = document.getElementById('send');
        btn.addEventListener('click', () => {
          const text1 = document.getElementById('text1');
          console.log(text1);
          const div1 = document.getElementById('div1');
          console.log(div1);
          div1.innerHTML = '<input type="text" value="' + text1.value + '" />';
        });
      }
    }, function(error) {
      console.log(error);
    });
  });
 })();