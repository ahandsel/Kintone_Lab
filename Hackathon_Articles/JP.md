---
title: ハッカソンでつかえるkintoneカスタマイズ手順
tags: kintone ハッカソン hackathon Python Node.js
author: RyBB
url: https://qiita.com/RyBB/items/290c7f4ea5a45da5b650
---
# はじめに

ハッカソンは時間との勝負です。フロントの開発に注力したいはずです。
データベースとかデータの格納方法とかは、ちゃちゃっと済ませたいはずです。

そんなあなたに **kintone!!**

kintoneを使えばデータベースが <font color="red">**爆速**</font> で作成できます。
REST APIもあるので外部からデータの抜き出しも簡単にできます。

<br/>

これはもう、kintone使うしかないですよね・・・・！？！？
ということで、この記事ではハッカソンで即使えるkintoneについて説明します。

:white_check_mark: このマークがある部分には、**コピペで即利用できるコード** があります
（ブラウザの検索を使うとすぐに見つかると思います！）

# 1. kintone環境の入手方法

通常は1ユーザー1500円の有料契約をしないと使えません。

> ▼ kintone 料金体系
> <https://kintone.cybozu.co.jp/price/>

でも、ハッカソンで使うのにお金払うとか嫌ですよね（僕も嫌です）

そんなあなたに **kintone 開発者ライセンス!!**

kintone 開発者ライセンスを使えばkintoneが <font color="red">**無償**</font> で利用できます。
`ユーザーは5名まで / 本番運用はしない` などの制限はありますがハッカソン利用であれば問題ありません。

## 開発者ライセンスの取得方法

cybozu developer network (devnet)から申請が可能です。

> cybozu developer network
> <https://developer.cybozu.io/hc/ja>

<img width="1122" alt="スクリーンショット 2019-09-13 12.43.36.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/153051/459ee342-a42b-a067-b275-4ee4aae3bdac.png">

トップページに「kintone開発者ライセンスを取得」があるのでこちらから申請が可能です。

<font color="gold">**cybozu developer network に登録するだけではダメです！！**</font>
<font color="red">必ず**「kintone開発者ライセンスを取得」**ボタンを押して申し込みをしてください！</font>

# 2. kintoneの基本操作

kintone環境を申請して、メールアドレス宛にアクセスURLが届いたらkintoneを使うことができるようになります。
まずは `ブラウザ操作` でkintoneをいじっていきます。

## アプリの作成

kintoneでは、一つのテーブルを **アプリ** と呼びます。
このアプリを複数作って、さまざまなDBをkintone上に構築するのが一般的な使い方です。

アプリの作り方ですが、

1. アプリの右側の `+` よりアプリを新規作成
2. `はじめから作成` を選択
3. 必要な `フィールド` を配置する
4. アプリの公開

のような手順で進めます。`フィールド` はテーブルのカラムにと思ってもらえれば大丈夫です。
<img src="https://docs.google.com/drawings/d/e/2PACX-1vSWpzpd802oJ9psA7_xPqopK2Lg59zLKS1yDFynY2ASJ6_YGi06ZPVkWg-3tdhdkjbP-REe5u8rwVm0/pub?w=955&amp;h=572">
このフィールドを右のエリアにドラッグ&ドロップで配置していきます。ハッカソンでよく使われるフィールドだと、

- 文字列（１行）
- 数値
- 作成日時 ※値は自動で入る
- ラジオボタン / ドロップダウン（プルダウン）
- チェックボックス
- 添付ファイル

とかですね。あとで修正することも簡単なので、とりあえず最小限のフィールドを配置してまずやってみることをおすすめします。
あとは画面右上の `アプリの作成` をクリックすれば、それだけでもうDBテーブルの完成です！爆速！

## GUIによるデータの登録・編集・削除

### レコード登録

ブラウザからデータを操作する場合も操作は簡単です。アプリの作成後、 `一覧画面` に遷移するので、そこで `+` よりデータ（レコード）を追加します。

### レコード編集

登録したレコードを編集する場合は、一度その編集したいレコードを開き、`ペンマーク` より編集モードへ切り替えます。

<img alt="レコード編集時のボタン" src="https://docs.google.com/drawings/d/e/2PACX-1vROL2vEVGTcgkibxINj6lTQOaNKbF9jzofY6BQALf7JXgBFzWJ0ajWowqvlxW64FFqfGJAPuNUaJr5j/pub?w=960&amp;h=504">

### レコード削除

あまり使うことはないですが、ペンマークの右にある `・・・` より、レコード削除を選択します。

---

ここまでが基本機能です。
これだけだと、正直ハッカソンでは扱いにくいところなのですが、次からがkintoneの真骨頂です。
APIによるデータ操作について説明します。

# 3. kintone API

kintoneはAPIも用意されており、

- kintone REST API
- kintone JavaScript API

があります。ダントツでハッカソンでよく使われるのは `REST API` です！

## kintone REST API

いわゆるRestfulなAPIです。kintoneのデータ（フィールドやレコード、アプリなど）を外部から操作することが可能です。

メソッドとしては `取得 / 追加 / 更新 / 削除` が用意されています。

### 調べ方

kintoneの特定のURLに対してヘッダーとボディを書いてリクエストを投げることでデータの操作が可能です。

ここらへんからドキュメントが大事になり、REST APIをやるために必要な情報は全て [cybozu developer network](https://developer.cybozu.io/hc/ja
) に記載されています。

### ヘッダー

`kintone REST APIの共通仕様` を確認すれば、必要な `ヘッダー` が確認できます。

> kintone REST APIの共通仕様
> <https://developer.cybozu.io/hc/ja/articles/201941754>

### 認証

外部からkintoneのデータを操作する場合、認証が必要になります。
認証には大きく２つ

- パスワード認証
- APIトークン認証

の２つの認証があり、おすすめは `APIトークン認証` です。

トークンの発行方法は、

- アプリの設定画面を開く
- 設定タブから `APIトークン` を開く
- `生成する` をクリックしてトークンを生成する
    - 必要な `アクセス権` を設定する
- 保存して `アプリを更新` する

:warning: よく最後の アプリの更新 をし忘れるので注意してください

APIトークンの場合、ヘッダーの書き方は

```json
{
  "X-Cybozu-API-Token": "XXXXXXXXXXXX",
  "Content-Type": "application/json", // POST, PUT, DELETEの場合
}
```

となります。

### URL/ボディ

`kintone REST API一覧` を確認すれば、必要な `URL/メソッド` 、そこから詳細ページを見ることで `パラメータ・ボディ` が確認できます。

> kintone REST API 一覧
> <https://developer.cybozu.io/hc/ja/articles/360000313406>

例えば、 `レコード１件の登録` をしたい場合は、

<img src="https://docs.google.com/drawings/d/e/2PACX-1vTNTgnkiOfSlUhfUr1lz4yt75Q2y5C0tNsQ_IHW-39LWEbsV8sJeqTRqj_aD2NYaJiCBlK_mfmTwDda/pub?w=960&amp;h=720">

- URL
    - https://(サブドメイン名).cybozu.com/k/v1/record.json
- メソッド
    - POST
- リクエストボディ
    - app, record

だと確認ができます。

## kintone JavaScript API

kintoneの画面自体をいじることができるAPIです。ボタンを配置したり、地図を埋め込んだりできます。
kintoneは、ただのDBではなく `フロントもあるDB` というのが結構大きな特徴です。
データが入ってるかどうかブラウザで簡単に確認できるのも大きなメリットです （デモ映え！）

ただ、ハッカソンではそこまで使われることはないので、今回は割愛します m(_ _)m
（Charts.jsでグラフをリッチにして表示する、とかはたまにありますね。でもそれkintone上じゃなくても良くね？感もありますw）

# 4. サンプル

1. アプリを作ってみよう
2. ブラウザ経由でデータを登録してみよう
3. APIトークンを発行してみよう
4. curlコマンドで、2. で登録したデータを取得してみよう
5. Node.js でテキストデータを登録してみよう
6. Node.js で画像ファイルをアップロードしてみよう
7. Python でテキストデータを登録してみよう
8. Python で画像ファイルをアップロードしてみよう
9. Python で画像ファイルをダウンロードしてみよう

とかやってみましょう！！
（数は多いですが、一個一個が簡単なのですぐ終わります！）

:warning: 使用するPCはMacで説明します。

## 1．アプリを作ってみよう

まずは基本のアプリの作成です。上の説明でも触れましたが、kintoneにログイン後のページにある `アプリ` の横にある `＋` から新規作成します。

<img alt="アプリの新規作成" src="https://docs.google.com/drawings/d/e/2PACX-1vTxREEsuIp39x3jkjETl2G_9WsZJc4FhhanTsq_L18Ji9FaEkh4mZtOChvBrHdmQba_1A0ntqV7cuGi/pub?w=955&amp;h=637">

その後、 `はじめから作成` を選択して、フォームを作成していきます。

フィールドは、

- 文字列（１行）
- ラジオボタン
- 添付ファイル
- 作成日時

を配置します。

<img alt="使うフィールド" src="https://docs.google.com/drawings/d/e/2PACX-1vRJ-qBXYVCCXksshFp-0iz64l2NxG2jYyJh-gSM4PFgq3TalrNjoG_ZNFyWAGClmAl-oQAuIHvf-IV9/pub?w=921&amp;h=642">

このままだと、プログラムから扱う際にちょっと扱いにくい部分があるので、フィールドの設定で `フィールドコード` をローマ字に変更していきます。

<img alt="フィールドコードの変更" src="https://docs.google.com/drawings/d/e/2PACX-1vTiM_0_7IBQeOfmnIK4BCN9CiybON8Lj-1-50bKmwEj1S0d536VJKDnPerDfDY7Ji9kl6zrLBM0LLNI/pub?w=889&amp;h=669">

- 文字列（１行）
  - `text`
- ラジオボタン
  - `radio`
- 添付ファイル
  - `file`
- 作成日時
  - `time`

とかに変更します。

その後、`アプリの公開` をクリックしてアプリの作成は完了です。
<img alt="アプリの公開" src="https://docs.google.com/drawings/d/e/2PACX-1vSzGeY_ie5axmHsjKm0lFxpfCsuOnk2jYPZ2h2M0aCqVGP4mu_Ru-jmdHM6TlLx_cLSCjTdKeekMjIM/pub?w=927&amp;h=538">

## 2. ブラウザ経由でデータを登録してみよう

画面の右にある `+` からレコードを新規登録できます。それだけです。

<img src="https://docs.google.com/drawings/d/e/2PACX-1vRJKUpVrBE_d4wCn-3QghZhu6uWebw4pIgNcGUApV12ADNSFaWk0SGE-MKbbJiSAnGSzEXKArtI7Y-_/pub?w=928&amp;h=537">

## 3. APIトークンを発行してみよう / アプリIDを確認してみよう

外部からデータを操作する場合には `APIトークン` の発行が必要です。
右にある `歯車マーク` からアプリの設定を開き、`設定タブ`の`APIトークン`をクリックします。

<img alt="APIトークンの発行" src="https://docs.google.com/drawings/d/e/2PACX-1vTMc4s_x0dCp3vk9zbRX4oWvYPLT8rMMQBETunHAGgC0cMd74DgPdQROwIgLbe8Gr-tTmH6Wzu8M0CH/pub?w=928&amp;h=535">

`生成する` をクリックしてトークンを生成します。
初期値ではアクセス権は `レコード閲覧` のみなので、 `全てにチェック`をつけます。

:warning: 生成したAPIトークンはのちほど利用するので **コピペ** しておいてください

<img src="https://docs.google.com/drawings/d/e/2PACX-1vSdYbZyT6NxJUNYk32z2PxSoaozWAEXieNUixR2dDy0TfUId0QucySOn8XSGC_vPJecRK--vKxQy5UL/pub?w=928&amp;h=534">

`アプリID` はテーブル一つ一つを識別する通し番号です。
アプリIDはURLから確認ができます。
（ひとりひとり値は違うのでそれぞれの数字を確認してください）

`https://XXXXX.cybozu.com/k/〇〇/` ← 〇〇がアプリIDです

<img alt="アプリID" src="https://docs.google.com/drawings/d/e/2PACX-1vTraH8BBjUN_WwAe5c6Idvp25nnNB-2nP8M3OMgIiOqOhP0LHwHEvQ21Gd6fDmfikjrvhdK1AuFFD7o/pub?w=929&amp;h=537">

## 4. curlコマンドで、2. で登録したデータを取得してみよう

```bash
$ curl -X 'GET' 'https://SUB_DOMAIN.cybozu.com/k/v1/record.json?app=〇〇&id=1' -H 'X-Cybozu-API-Token: YOUR_TOKEN' 
```

こんな感じのレスポンスがあれば成功です。

```bash
{"record":{"レコード番号":{"type":"RECORD_NUMBER","value":"1"},"更新者":{"type":"MODIFIER","value":{"code":"bb","name":"BB"}},"作成者":{"type":"CREATOR","value":{"code":"bb","name":"BB"}},"添付ファイル":{"type":"FILE","value":[{"fileKey":"20190913144323BA448ED7625348ED8FE863DCEBF40A41132","name":"スクリーンショット 2019-08-13 11.42.50.png","contentType":"image/png","size":"2581653"}]},"ラジオボタン":{"type":"RADIO_BUTTON","value":"sample2"},"text":{"type":"SINGLE_LINE_TEXT","value":"ハッカソン"},"$revision":{"type":"__REVISION__","value":"1"},"更新日時":{"type":"UPDATED_TIME","value":"2019-09-13T14:43:00Z"},"作成日時":{"type":"CREATED_TIME","value":"2019-09-13T14:43:00Z"},"$id":{"type":"__ID__","value":"1"}}}%  
```

[jqコマンド](https://stedolan.github.io/jq/) を使うと、きれいに整形できます。

```bash
$ curl -X 'GET' 'https://SUB_DOMAIN.cybozu.com/k/v1/record.json?app=〇〇&id=1' -H 'X-Cybozu-API-Token: YOUR_TOKEN'  | jq
```

```json
{
  "record": {
    "レコード番号": {
      "type": "RECORD_NUMBER",
      "value": "1"
    },
    "更新者": {
      "type": "MODIFIER",
      "value": {
        "code": "bb",
        "name": "BB"
      }
    },
    "作成者": {
      "type": "CREATOR",
      "value": {
        "code": "bb",
        "name": "BB"
      }
    },
    "添付ファイル": {
      "type": "FILE",
      "value": [
        {
          "fileKey": "20190913144323BA448ED7625348ED8FE863DCEBF40A41132",
          "name": "スクリーンショット 2019-08-13 11.42.50.png",
          "contentType": "image/png",
          "size": "2581653"
        }
      ]
    },
    "ラジオボタン": {
      "type": "RADIO_BUTTON",
      "value": "sample2"
    },
    "text": {
      "type": "SINGLE_LINE_TEXT",
      "value": "ハッカソン"
    },
    "$revision": {
      "type": "__REVISION__",
      "value": "1"
    },
    "更新日時": {
      "type": "UPDATED_TIME",
      "value": "2019-09-13T14:43:00Z"
    },
    "作成日時": {
      "type": "CREATED_TIME",
      "value": "2019-09-13T14:43:00Z"
    },
    "$id": {
      "type": "__ID__",
      "value": "1"
    }
  }
}
```

JSON形式で取得できるのであとは任意のプログラミング言語でいじるだけです！

## 5. Node.jsでテキストデータを登録してみよう :white_check_mark:

Node.js用のSDK [@kintone/rest-api-client](https://www.npmjs.com/package/@kintone/rest-api-client) があるので、こちらを利用すると楽です

・ リポジトリ作成 & 移動

```bash
$ mkdir kin-hack; cd $_
```

・ （Node.jsがない方は） Nodebrew / Node.js のインストール

```bash
$ brew install nodebrew

$ nodebrew install-binary stable
```

・ package.json の作成

```bash
$ npm init
```

・ kintone-js-sdk のインストール

```bash
$ npm i --save-dev @kintone/rest-api-client
```

・ プログラムの作成

```bash
$ touch index.js
```

・ プログラムの中身

```javascript:index.js

const { KintoneRestAPIClient } = require('@kintone/rest-api-client');
const client = new KintoneRestAPIClient({
  baseUrl: 'https://YOUR_SUB_DOMAIN.cybozu.com',
  auth: {
    apiToken: 'YOUR_API_TOKEN'
  }
});

(async () => {
  const app = 'YOUR_APP_ID';
  const record = {
    text: {
      value: '追加したいテキスト'
    }
  };

  // Add Record
  try {
    const resp = await client.record.addRecord({app, record});
    console.log(rsep);
  } catch(err) {
    console.log(err);
  };
})();

```

・ Node.jsの実行

```bash
$ node index.js
```

・ レスポンス
こんな感じのレスポンスがあれば成功です。

```bash
{ id: '2', revision: '1' }
```

## 6. Node.js で画像ファイルをアップロードしてみよう :white_check_mark:

次はテキストではなく `画像ファイル` のアップロードです。

・ プログラムの中身

```javascript:index.js
const { KintoneRestAPIClient } = require('@kintone/rest-api-client');
const client = new KintoneRestAPIClient({
  baseUrl: 'https://YOUR_SUB_DOMAIN.cybozu.com',
  auth: {
    apiToken: 'YOUR_API_TOKEN'
  }
});

(async () => {
  const app = 'YOUR_APP_ID';
  const file = {
    path: '追加したいファイルパス',
  };
  try {
    const resp = await client.file.uploadFile({file});
    const res = await client.record.addRecord({
      app,
      record: {
        file: {
          value: [{
            fileKey: resp.fileKey
          }]
        }
      }
    });
    console.log(res);
  } catch(err) {
    console.log(err);
  }
})();
```

レスポンス自体は先ほどと同じ形式になります。
コードを見ればなんとなくわかるとは思いますが、kintoneでファイルをアップロードする際は

- まずファイル自体をkintoneにアップロードする
- `ファイルのキー` を受け取る
- その `ファイルのキー` をレコードに登録する

という流れになります。２回APIを実行していることになります！
（コピペで動くと思うので、今後はこのコードをコピペすればOK!）

## 7. Pythonでテキストデータを登録してみよう :white_check_mark:

次はハッカソンで非常によく使われるPythonでのやり方です。（Pythonはすでに入っている前提で進めます）

・ Pythonファイルの作成

```bash
$ touch sample.py
```

・ プログラムの中身

```python
#!/usr/bin/python
# _*_ coding: utf-8 _*_

import requests

URL="https://SUB_DAMIN.cybozu.com/k/v1/"
APPID=〇〇
API_TOKEN="YOUR_API_TOKEN"
PARAMS={
  "app":APPID,
  "record":{
    "text":{
      "value":"Pythonで追加したいテキスト"
    }
  }
}

def post_kintone(url,api_token,params):
    """kintoneにレコードを1件登録する関数"""
    headers={"X-Cybozu-API-Token":api_token,"Content-Type":"application/json"}
    resp=requests.post(url+"record.json",json=params,headers=headers)

    return resp

if __name__=="__main__":
    RESP=post_kintone(URL,API_TOKEN,PARAMS)

    print(RESP.text)
```

・ Python実行

```bash
# python2系
$ python sample.py

# python3系
$ ｐｙthon3 sample.py
```

## 8. Pythonで画像ファイルをアップロードしてみよう :white_check_mark:

Pythonで画像ファイルのアップロードです。
`ラズパイで撮影した写真をkintoneへ登録` などのシナリオはよく聞くので、これは結構使えますよ〜

```python
#!/usr/bin/python
# _*_ coding: utf-8 _*_

import requests
import json

URL="https://SUB_DOMAIN.cybozu.com/k/v1/"
APPID=〇〇
API_TOKEN="YOUR_API_TOKEN"

def post_file(url,api_token):
    """kintoneにファイルをアップロードする関数"""
    headers={"X-Cybozu-API-Token":api_token,'X-Requested-With':'XMLHttpRequest'}
    image=open('./hoge.jpg','rb')
    files={'file':('image.png',image,'image/png')}
    resp=requests.post(url+"file.json",files=files,headers=headers)
    return resp

def post_record(url,api_token,params):
    """kintoneにレコードを1件登録する関数"""
    headers={"X-Cybozu-API-Token":api_token,"Content-Type":"application/json"}
    resp=requests.post(url+'record.json',json=params,headers=headers)

    return resp

if __name__=="__main__":
    RESP=post_file(URL, API_TOKEN)
    RSP=json.loads(RESP.text)
    PARAMS={
      "app":APPID,
      "record":{
        "file":{
          "value":[{
            "type":"FILE",
            "fileKey":RSP["fileKey"]
          }]
        }
      }
    }
    RP=post_record(URL,API_TOKEN,PARAMS)
    print(RP.text)

```

## 9. Pythonで画像ファイルをダウンロードしてみよう :white_check_mark:

Pythonで画像ファイルのダウンロードです。

```python
#!/usr/bin/python
# _*_ coding: utf-8 _*_

import requests
import json

URL="https://SUB_DOMAIN.cybozu.com/k/v1/"
APPID=〇〇
RECORDID=××
API_TOKEN="YOUR_API_TOKEN"

def get_file(url,api_token,filekey):
    """kintoneにファイルをダウンロードする関数"""
    headers={"X-Cybozu-API-Token":api_token,'X-Requested-With':'XMLHttpRequest'}
    resp=requests.get(url+"file.json"+'?fileKey='+filekey,headers=headers)
    f=open("download.png",'bw')
    f.write(resp.content)

def get_record(url,api_token,app,id):
    """kintoneのレコードを1件取得する関数"""
    headers={"X-Cybozu-API-Token":api_token}
    resp=requests.get(url+'record.json'+'?app='+str(app)+'&id='+str(id),headers=headers)

    return json.loads(resp.text)["record"]["file"]["value"][0]["fileKey"]

if __name__=="__main__":
    RESP=get_record(URL,API_TOKEN,APPID,RECORDID)
    RSP=get_file(URL,API_TOKEN,RESP)
    print(RSP)
```

`download.png` として同じディレクトリ内に画像が生成されます。

# 参考

> ▼ kintoneの使い方 (データベース編)
> <https://qiita.com/RyBB/items/daabb9b60d804ee2242f>
>
> ▼ kintone REST API について (GET編)
> <https://qiita.com/RyBB/items/08cf511f1dbce6cf76bf>
>
> ▼ kintone REST API について (POST編)
> <https://qiita.com/RyBB/items/94c13ca56887558bb227>