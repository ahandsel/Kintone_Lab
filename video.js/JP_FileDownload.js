(function () {
  "use strict";

  var test;
  // レコード一覧の表示時に発行日が本日であれば文字色、フィールドの背景色を変更する
  // Change the text color and background color of the field if the issue date is today when displaying the record list
  kintone.events.on("app.record.index.show", function (event) {
    //レコード番号n番のレコードの添付ファイルのファイルキーを取得
  //Get the file key of the attached file of record number n
    var AppMain_ID = kintone.app.getId();
    var recId = 1;

    kintone.api(
      "/k/v1/record",
      "GET", {
        app: AppMain_ID,
        id: recId,
      },
      function (resp) {
        var record = resp.record;
        var fileKey = record["attachment"]["value"][0]["fileKey"];
        var title = record["title"]["value"];
        filedownload(title, fileKey);
      }
    );
  });

  //ファイルダウンロード＆リンク生成
  function filedownload(title, filekey) {
    var apiurl = "/k/v1/file.json?fileKey=" + filekey;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", apiurl, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); //これが無いとIE,FFがNG
    xhr.responseType = "blob";
    var blob = xhr.responseType;

    xhr.onload = function () {
      //blobからURL生成
      var blob = xhr.response;
      var url = window.URL || window.webkitURL;
      var image = url.createObjectURL(blob);

      //タイトルの要素生成
      var youso = document.createElement("b");
      youso.innerHTML = "タイトル：" + escapeHtml(title);

      $(youso).appendTo("#title");
      $('<a><img src="' + image + '" width="10%" height="10%" /></a>').appendTo(
        "#file"
      );
    };
    xhr.send();
  }

  //エスケープ用関数
  function escapeHtml(str) {
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#39;");
    return str;
  }
})();