# Play videos from Attachment field within Kintone Record

## References
- [Sample plug-in: YouTube Embed Plug-in](https://github.com/kintone-samples/SAMPLE-YouTube-embed-plug-in)
- [Video.js Getting Started](https://videojs.com/getting-started/#videojs-cdn)
- [レコードに登録された添付ファイルをカスタマイズビューに表示してみよう](https://developer.cybozu.io/hc/ja/articles/203126440)
- [添付ファイル](https://jp.cybozu.help/k/ja/user/app_settings/form/form_parts/attachment.html)
- [ファイルダウンロードで必須となる2つの手順](https://developer.cybozu.io/hc/ja/articles/200814380)

## Code Breakdown
1. Get the record information and get the fileKey of the video file in the Attachment field.
2. Create a query statement based on fileKey and download the file from kintone.
3. Provide it to Video.js as the video source
4. Output the video.js rendering of the video into the blank space

## Kintone App
* Blank space field with Element ID = `videoSpace`
* Attachment field with field code = `Attachment`
* Video.js CDN
  * JavaScript = `https://vjs.zencdn.net/7.8.3/video.js`
  * CSS = `https://vjs.zencdn.net/7.8.3/video-js.css`
* 