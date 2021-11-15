// https://qiita.com/sy250f/items/9a71300662512d2f5bec
(function () {
  "use strict";
  kintone.events.on("app.record.index.show", function (event) {

    if (document.getElementById('my_index_button') !== null) {
      return;
    }

    let myIndexButton = document.createElement('button');
    myIndexButton.id = 'my_index_button';
    myIndexButton.innerText = '印刷';

    let query = kintone.app.getQuery();
    console.log(query);

    let views = {};
    let fields = [];
    let body = {
      'app': kintone.app.getId()
    };
    kintone.api(kintone.api.url('/k/v1/app/views', true), 'GET', body, function (resp) {
      // success
      console.log(resp);
      views = resp;
      console.log(views.views['自分が作成したもの'].fields);
      fields = views.views['自分が作成したもの'].fields;
    }, function (error) {
      // error
      console.log(error);
    });

    let objFields = {};
    kintone.api(kintone.api.url('/k/v1/app/form/fields', true), 'GET', body, function (resp) {
      // success
      console.log(resp);
      objFields = resp;
    }, function (error) {
      // error
      console.log(error);
    });

    // ボタンクリック時の処理
    myIndexButton.onclick = function () {
      let printJson = [];
      let body = {
        "app": kintone.app.getId(),
        "query": query,
        "fields": fields
      };
      kintone.api(kintone.api.url('/k/v1/records', true), 'GET', body, function (resp) {
        // success
        console.log(resp);
        console.log(objFields.properties[fields[1]].label);
        for (let i = 0, rowCount = resp.records.length; i < rowCount; i++) {
          printJson.push({
            [objFields.properties[fields[1]].label]: resp.records[i][fields[1]].value,
            [objFields.properties[fields[2]].label]: resp.records[i][fields[2]].value,
            [objFields.properties[fields[3]].label]: resp.records[i][fields[3]].value
          });
        }
        console.log(printJson);
        printJS({
          printable: printJson,
          properties: [objFields.properties[fields[1]].label,
            objFields.properties[fields[2]].label,
            objFields.properties[fields[3]].label
          ],
          type: 'json'
        });
      }, function (error) {
        // error
        console.log(error);
      });
    };
    kintone.app.getHeaderMenuSpaceElement().appendChild(myIndexButton);
  });
})();