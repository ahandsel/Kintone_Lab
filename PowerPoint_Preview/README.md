# Preview PowerPoint Slides on Kintone

Here is an example Kintone Customization that enables PowerPoint slides to be previewed on Kintone Record Details page.

## Demo
Preview the PowerPoint slides on the Record Details page.

The PowerPoint slides is saved to the Record with Attachment field.
Preview images are generated automatically when the record is saved.
This takes a few seconds.

<!-- Gif here -->

## ConvertAPI Setup
We use the Convert API to convert PowerPoint files to image files.

You can use the API for free for up to 1500 seconds. One file consumes about several seconds to several tens of seconds.

1. Create an account: [Sign Up - ConvertAPI](https://www.convertapi.com/a/signup)
2. Memo the value of "Secret" on the [Authentication](https://www.convertapi.com/a/auth) page.
3. Replace the `*****` value for secrete on Example.js line 4 with your ConvertAPI Secrete value.

## Kintone App Setup

| Field name      | Field type  | Field code (element ID) | Parent element |
| --------------- | ----------- | ----------------------- | -------------- |
| PowerPoint      | Attachment | PowerPoint              |
| Image URL table | Table       | Image URL table         |
| Image URL       | Attachment  | Image URL               |                |  | Image URL table |
|                 | Space       | space                   |

## Credits
Based on [江田篤史](https://developer.cybozu.io/hc/ja/profiles/5826575706-%E6%B1%9F%E7%94%B0%E7%AF%A4%E5%8F%B2)'s post on cybozu developer network, [パワーポイントファイルをプレビュー](https://developer.cybozu.io/hc/ja/community/posts/900002839683-%E3%83%91%E3%83%AF%E3%83%BC%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E3%83%97%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC).
