// https://drive.google.com/uc?export=view&id=151Liot9LQoC0H5Npi1ry-3nn4HSNXodV

(function () {
  'use strict';

  var secret = 'UFcQN4KGrl5brNT3'; // Private key for Convert API authentication
  var previewWidth = '500px'; // Preview display size
  var powerPointField = 'パワーポイント'; // PowerPoint field field code
  var imageTableField = '画像URLテーブル'; // Field code for the image URL table field
  var imageField = '画像URL'; // Field code for the image URL field
  var spaceField = 'space'; // Element ID of the space

  kintone.events.on([
    'app.record.create.submit.success',
    'app.record.edit.submit.success',
  ], function (event) {
    var powerPointRecordValue = event.record[powerPointField].value[0];

    // Verify if a file is uploaded to the attachment field
    if (!powerPointRecordValue) {
      return event;
    }

    console.log('powerPointRecordValue');
    console.log(powerPointRecordValue);

    Swal.fire({
      icon: `success`,
      title: `PowerPoint file is uploaded!\n Now generating the preview...`,
      text: `Don't reload the page`,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    var client = new KintoneRestAPIClient();
    return client.file.downloadFile({
      fileKey: powerPointRecordValue.fileKey
    }).then(function (fileData) {
      var convertApi = ConvertApi.auth({
        secret
      });
      var params = convertApi.createParams();
      params.add('File', new File([fileData], powerPointRecordValue.name));

      console.log('params');
      console.log(params);

      return convertApi.convert('pptx', 'png', params);
    }).then(function (response) {

      console.log('response');
      console.log(response);

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

      return client.record.updateRecord(body);
    });
  });

  // Create the Preview
  kintone.events.on([
    'app.record.detail.show',
  ], function (event) {
    kintone.Promise.all(
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

  // Hide the Image Table
  // kintone.events.on([
  //   'app.record.detail.show',
  //   'app.record.create.show',
  //   'app.record.edit.show',
  // ], function (event) {
  //   kintone.app.record.setFieldShown(imageTableField, false);
  // });

})();