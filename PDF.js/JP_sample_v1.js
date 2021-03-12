(function () {
  "use strict";
  kintone.events.on([
    'app.record.detail.show'
  ], function (event) {
    if (!event.record.添付ファイル.value[0]) return;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', kintone.api.urlForGet('/k/v1/file', {
      fileKey: event.record.添付ファイル.value[0].fileKey
    }, true));
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.responseType = 'blob';
    xhr.addEventListener('load', function () {
      pdfjsLib.getDocument(URL.createObjectURL(xhr.response)).promise.then(function (pdf) {
        Promise.all(Array.apply(null, {
          length: pdf.numPages
        }).map(function (value, index) {
          return pdf.getPage(index + 1);
        })).then(function (pages) {
          var swiperContainer = document.createElement('div');
          var swiperWrapper = document.createElement('div');
          var swiperButtonPrev = document.createElement('div');
          var swiperButtonNext = document.createElement('div');
          swiperContainer.classList.add('swiper-container');
          swiperWrapper.classList.add('swiper-wrapper');
          swiperButtonPrev.classList.add('swiper-button-prev');
          swiperButtonNext.classList.add('swiper-button-next');
          swiperContainer.style.width = '500px'; //スライドの表示サイズ
          pages.forEach(function (page) {
            var swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide');
            var canvas = document.createElement('canvas');
            var viewport = page.getViewport({
              scale: 1
            });
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            page.render({
              canvasContext: canvas.getContext('2d'),
              viewport: viewport
            });
            swiperSlide.appendChild(canvas);
            swiperWrapper.appendChild(swiperSlide);
          });
          swiperContainer.appendChild(swiperWrapper);
          swiperContainer.appendChild(swiperButtonPrev);
          swiperContainer.appendChild(swiperButtonNext);
          kintone.app.record.getSpaceElement('space').appendChild(swiperContainer);
          new Swiper('.swiper-container', {
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
          });
        });
      });
    });
    xhr.send();
  });
})();