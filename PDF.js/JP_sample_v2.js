(function () {
  "use strict";
  kintone.events.on([
    'app.record.detail.show'
  ], function (event) {
    var fieldCode = '添付ファイル';
    var spaceId = 'space';
    if (!event.record[fieldCode].value.length) return;

    var dropdown = new kintoneUIComponent.Dropdown({
      items: event.record[fieldCode].value.map(function (file, index) {
        return {
          label: file.name,
          value: index
        }
      }),
      value: 0
    });
    var containerChunk = document.createElement('div');
    kintone.app.record.getSpaceElement(spaceId).appendChild(dropdown.render());
    kintone.app.record.getSpaceElement(spaceId).appendChild(containerChunk);
    var switchFile = function (index) {
      var containers = containerChunk.childNodes;
      [].forEach.call(containers, function (container) {
        container.style.display = 'none';
      });
      containers[index].style.display = 'block';
    }
    dropdown.on('change', switchFile);

    kintone.Promise.all(
      event.record[fieldCode].value.map(function (file) {
        var swiperContainer = document.createElement('div');
        swiperContainer.classList.add('swiper-container');
        containerChunk.appendChild(swiperContainer);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', kintone.api.urlForGet('/k/v1/file', {
          fileKey: file.fileKey
        }, true));
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.responseType = 'blob';
        xhr.send();
        return new kintone.Promise(function (resolve) {
          xhr.addEventListener('load', resolve);
        }).then(function () {
          return pdfjsLib.getDocument(URL.createObjectURL(xhr.response)).promise;
        }).then(function (pdf) {
          return Promise.all(Array.apply(null, {
            length: pdf.numPages
          }).map(function (value, index) {
            return pdf.getPage(index + 1);
          }));
        }).then(function (pages) {
          var swiperWrapper = document.createElement('div');
          var swiperButtonPrev = document.createElement('div');
          var swiperButtonNext = document.createElement('div');
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
          new Swiper('.swiper-container', {
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
          });
        });
      })
    ).then(function () {
      switchFile(0);
    });

  });
})();