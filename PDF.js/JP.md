# 添付したPDFをスライド風表示
  * 元の投稿: [添付したPDFをスライド風表示 – cybozu developer network](https://developer.cybozu.iohttps://developer.cybozu.io/hc/ja/community/posts/360058388652)
  * 作成者: [江田篤史](https://developer.cybozu.iohttps://developer.cybozu.io/hc/ja/profiles/5826575706)
  * 作成日時: 2020年03月10日 15:43

添付したPowerPointをkintoneで表示出来たらいいなと感じている人は多いかと思います。 PowerPointは困難だったので、今回はPDFをスライド風に表示するサンプルを紹介します。

## サンプル

添付したPDFをスライド風に表示します。

![Demo Gif](https://developer.cybozu.io/hc/user_images/eVMEeVgQE46mrYNswbeAkg.gif)

### フォーム設定

| フィールド名 | フィールドタイプ | フィールドコード / 要素ID |
| ------------ | ---------------- | ------------------------- |
| 添付ファイル | 添付ファイル     | 添付ファイル              |
|              | スペース         | space                     |

### コード
[PDF.js](https://mozilla.github.io/pdf.js/)および[swiper](https://swiperjs.com/)を利用しています。 下記JavaScriptとCSSを読み込んでください。

### JavaScript
  * <https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/build/pdf.min.js>
  * <https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/js/swiper.min.js>

### CSS
  * <https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/css/swiper.min.css>

また、JavaScriptについては下記「sample.js」を追加で読み込んでください。  
※スライドの表示サイズは、「`swiperContainer.style.width`」の値で調整してください。

### sample.js
| Version                      | Notes               |
| ---------------------------- | ------------------- |
| [Version 1](JP_sample_v1.js) | Supports only 1 PDF |
| [Version 2](JP_sample_v2.js) | ???                 |
