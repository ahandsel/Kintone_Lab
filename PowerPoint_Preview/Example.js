(function () {
  'use strict';

  var secret = '*****'; // Private key for Convert API authentication
  var previewWidth = '500px'; // Preview display size
  var slideField = 'PowerPoint'; // Attachment field code
  var imageTableField = 'Link_Table'; // Table field code
  var imageField = 'Image_Link'; // Image_Link field code
  var spaceField = 'Space'; // Space Element ID

  kintone.events.on([
    'app.record.create.submit.success',
    'app.record.edit.submit.success',
  ], function (event) {
    var slideValue = event.record[slideField].value[0];
    
    // Verify if a file is uploaded
    if (!slideValue) {
      return event;
    }

    console.log('slideValue');
    console.log(slideValue);

    // SweetAlert2 popup alert
    Swal.fire({
      icon: `success`,
      title: `PowerPoint file is uploaded!\n Now generating the preview...`,
      text: `Don't reload the page`,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'Done',
      didOpen: () => {
        Swal.showLoading()
      },
      allowOutsideClick: () => !Swal.isLoading()
    })

    // Declare the API client for Kintone REST API
    var client = new KintoneRestAPIClient();

    // Download the PowerPoint file
    return client.file.downloadFile({
      fileKey: slideValue.fileKey
    }).then(function (fileData) {

      // Build ConvertAPI's PPTX to PNG POST API call
      var convertApi = ConvertApi.auth({
        secret
      });
      var params = convertApi.createParams();
      params.add('File', new File([fileData], slideValue.name));

      console.log('params');
      console.log(params);

      return convertApi.convert('pptx', 'png', params);
    }).then(function (response) {

      console.log('response');
      console.log(response);

      // Save ConvertAPI download links inside Link_Table > Image_Link
      var body = {
        app: event.appId,
        id: event.recordId,
        record: {
          [imageTableField]: {
            value: response.dto.Files.map(

              function (file) {

                var a = {
                  value: {
                    [imageField]: {
                      value: file.Url
                    }
                  }
                };
                console.log('a');
                console.log(a);
                return a
              })
          }
        }
      };

      console.log('body');
      console.log(body);

      // Update Kintone Record
      return client.record.updateRecord(body);
    });
  });

  // Create the Preview
  kintone.events.on([
    'app.record.detail.show',
  ], function (event) {

    kintone.Promise.all(

      // Get the images from Link_Table > Image_Link
      event.record[imageTableField].value.map(function (row) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', row.value[imageField].value);
        xhr.responseType = 'blob';
        var promise = new kintone.Promise(function (resolve) {
          xhr.addEventListener('load', function () {
            resolve(URL.createObjectURL(xhr.response));
          });
        });
        xhr.send();
        return promise;
      })
    ).then(function (urls) {

      // Create Picture Slide with Swiper
      var swiperContainer = document.createElement('div');
      var swiperWrapper = document.createElement('div');
      var swiperButtonPrev = document.createElement('div');
      var swiperButtonNext = document.createElement('div');
      swiperContainer.classList.add('swiper-container');
      swiperWrapper.classList.add('swiper-wrapper');
      swiperButtonPrev.classList.add('swiper-button-prev');
      swiperButtonNext.classList.add('swiper-button-next');
      swiperContainer.style.width = previewWidth;
      urls.forEach(function (url) {
        var swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        var image = document.createElement('img');
        image.setAttribute('src', url);
        image.style.width = '100%';
        swiperSlide.appendChild(image);
        swiperWrapper.appendChild(swiperSlide);
      });
      swiperContainer.appendChild(swiperWrapper);
      swiperContainer.appendChild(swiperButtonPrev);
      swiperContainer.appendChild(swiperButtonNext);
      kintone.app.record.getSpaceElement(spaceField).appendChild(swiperContainer);
      new Swiper('.swiper-container', {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      });
    });
  });

  // Hide the Link_Table
  kintone.events.on([
    'app.record.detail.show',
    'app.record.create.show',
    'app.record.edit.show',
  ], function (event) {
    kintone.app.record.setFieldShown(imageTableField, false);
  });

})();