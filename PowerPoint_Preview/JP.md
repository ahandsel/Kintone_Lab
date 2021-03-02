# パワーポイントファイルをプレビュー
元の投稿: [パワーポイントファイルをプレビュー](https://developer.cybozu.io/hc/ja/community/posts/900002839683)
作成者: [江田篤史](https://developer.cybozu.io/hc/ja/profiles/5826575706-%E6%B1%9F%E7%94%B0%E7%AF%A4%E5%8F%B2)
作成日時: 2020年12月22日 17:28

レコード詳細画面でパワーポイントファイルをプレビューするサンプルを作成しました.

## デモ
レコード詳細画面でパワーポイントファイルをプレビューします.

![PowerPoint x Kintone gif](https://developer.cybozu.io/hc/user_images/BCZQNLsNP0cy9De5HNGFrQ.gif)

プレビュー用の画像はレコード保存時に自動作成します.
画像の作成には数秒から数十秒の時間がかかります.

## ConvertAPIの準備
パワーポイントファイルを画像ファイルに変換するために，[ConvertAPI](https://www.convertapi.com/)を利用しています.
まず，[ユーザ登録](https://www.convertapi.com/a/signup)を行います.
APIを1500秒まで無料で利用できます. 1ファイルでおよそ数秒から数十秒消費します.

登録後，[認証情報ページ](https://www.convertapi.com/a/auth)で「Secret」の値を確認してメモします.

## kintoneフォーム設定

| フィールド名   | フィールドタイプ   | フィールドコード (要素ID) | 親要素          |
| ------------| ----------------| ------------------------- | --------------- |
| パワーポイント  | 添付ファイル     | パワーポイント            |
| 画像URLテーブル | テーブル        | 画像URLテーブル           |
| 画像URL       | リンク     | 画像URL                   | 画像URLテーブル |
|               | スペース        | space                     |

## コード

### JavaScript
下記を順に読み込みます.
  - <https://unpkg.com/@kintone/rest-api-client@1.1.0/umd/KintoneRestAPIClient.min.js>
  - <https://unpkg.com/convertapi-js/lib/convertapi.js>
  - <https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/js/swiper.min.js>
  - sample.js

### sample.js
3行目の「ConvertAPIの認証用の秘密キー」は，[認証情報ページ](https://www.convertapi.com/a/auth)でメモした値を用います.
アプリ閲覧者は秘密キーも閲覧できるので，取り扱いにはご注意ください.

### CSS
下記を読み込みます
  - <https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/css/swiper.min.css>
