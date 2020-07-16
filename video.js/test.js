(function () {
  'use strict';

  // // Download the attached video file to Kintone
  // function getFile(url) {
  //   var df = new $.Deferred();
  //   var xhr = new XMLHttpRequest();

  //   xhr.open('GET', url, true);
  //   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  //   xhr.responseType = 'blob';

  //   xhr.onload = function (e) {
  //     if (this.status === 200) {
  //       df.resolve(this.response);
  //     }
  //   };

  //   xhr.send();
  //   console.log(df.promise());
  //   return df.promise();
  // }

  // File download & link generation
  function fileDownload(fileKey) {
    var apiURL = '/k/v1/file.json?fileKey=' + fileKey;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiURL, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); //これが無いとIE,FFがNG
    xhr.responseType = 'blob';
    var blob = xhr.responseType;
    xhr.onload = function () {
      // URL generation from blob
      var blob = xhr.response;
      var url = window.URL || window.webkitURL;
      var image = url.createObjectURL(blob);

      //Append the element
      $('<a><img src="' + image + '" width="10%" height="10%" /></a>').appendTo(
        "#file"
      );
    };
    xhr.send();
  }

  kintone.events.on('app.record.detail.show', function (event) {
    // Delete once the map is already displayed
    // if ($('div#map').length > 0) {
    //   $('div#map').remove();
    // }
    // Kintone API
    var appID = event.appid; // Event Object's App ID property
    var recordID = event.recordid; // Event Object's record ID property
    var record = event.record; // Record object
    var fileKey = record.Attachment.value.fileKey; // Video file's fileKey
    var fileUrl = '/k/v1/file.json?fileKey=' + fileKey;
    // getFile(fileUrl);
    const videoHTML = document.createElement('body');
    videoHTML.innerHTML = '<videoid="my-video" class="video-js" controls preload="auto" width="640" height="264" poster="https://github.com/ahandsel/Kintone_Lab/raw/master/videoPoster.png" data-setup="{}" > <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" type="video/mp4" /> <source src="MY_VIDEO.webm" type="video/webm" /> <p class="vjs-no-js"> To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="https://videojs.com/html5-video-support/" target="_blank" >supports HTML5 video</a > </p> </videoid=><script src="https://vjs.zencdn.net/7.8.3/video.js"></script>';
    kintone.app.record.getSpaceElement('videoSpace').appendChild(videoHTML);
  });
})();