# Preview PowerPoint Slides on Kintone

Here is an example Kintone Customization that enables PowerPoint slides to be previewed on Kintone Record Details page as images.

## Demo
Preview the PowerPoint slides on the Record Details page.

The PowerPoint slides is saved to the Record with Attachment field.
Preview images are generated automatically when the record is saved.
This takes a few seconds.

<!-- Gif here -->

## ConvertAPI Setup
Convert API is used to convert PowerPoint slides to images.
You can use the API for free for up to 1500 seconds of conversion time.
A file can take from a few seconds to tens of seconds depending on the slide count.

1. Create an account: [Sign Up - ConvertAPI](https://www.convertapi.com/a/signup)
2. Memo the value of "Secret" on the [Authentication](https://www.convertapi.com/a/auth) page.
3. Replace the `*****` value for secrete on **Example.js** line 4 with your ConvertAPI Secrete value.

## Kintone App Setup

### App Fields

| Field name      | Field type | Field code (element ID) |
| --------------- | ---------- | ----------------------- |
| PowerPoint      | Attachment | PowerPoint              |
| Image URL Table | Table      | Image URL table         |
| Image URL       | Link (Type: URL) | Image URL               |
|                 | Space      | space                   |

Place the **Image URL** Link field inside the **Image URL Table** field.
A Table field is required since Image **Image URL** Link field will be created to per slide.

### JavaScript
Add the following CDN Links under the **Upload JavaScript for PC** section:
1. <https://unpkg.com/@kintone/rest-api-client@1.1.0/umd/KintoneRestAPIClient.min.js>
2. <https://unpkg.com/convertapi-js/lib/convertapi.js>
3. <https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/js/swiper.min.js>
4. <https://js.kintone.com/sweetalert2/v10.15.5/sweetalert2.min.js>

Then upload the **Example.js** file

### CSS
Add the following CDN Links under the **Upload CSS File for PC** section:
1. <https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/css/swiper.min.css>
2. <https://js.kintone.com/sweetalert2/v10.15.5/sweetalert2.min.css>

## ⚠️ Debugging
  * Order of the CDN Links and JS/CSS files do matter. Verify that the **JavaScript and CSS Customization** have all the required links and file in the order as listed above.

## Credits
Based on [江田篤史](https://developer.cybozu.io/hc/ja/profiles/5826575706-%E6%B1%9F%E7%94%B0%E7%AF%A4%E5%8F%B2)'s post on cybozu developer network, [パワーポイントファイルをプレビュー](https://developer.cybozu.io/hc/ja/community/posts/900002839683-%E3%83%91%E3%83%AF%E3%83%BC%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E3%83%97%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC).

[rest-api-client](https://github.com/kintone/js-sdk/tree/master/packages/rest-api-client#references)

[SweetAlert2 - a beautiful, responsive, customizable and accessible (WAI-ARIA) replacement for JavaScript's popup boxes](https://sweetalert2.github.io/)
