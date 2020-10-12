:: white_check_mark :: The part where there is this mark,**immediately available codein thecopy and paste** there is
(I think that I found as soon as using a search of the kintone

# browser!)1.environment of how to obtain

usually You cannot use it unless you have a paid contract of 1500 yen per user.

> ▼ kintone fee structure
> <Https://kintone.cybozu.co.jp/price/>

But, I'm disgusting Toka pay money to use in hackathons (which is I also hate)

such you to kintone**developer license !!kintone

**development You can use kintone for **free** with a personal license.
`Userisnot up to 5 people / production operationas` there a limit such is not a problem if hackathons use.

## How to get a developer license

You can apply from the cybozu developer network (devnet).

> cybozu developer network
> <https://developer.cybozu.io/hc/ja>

<img width= "1122" alt= "screenshot

Get a kintone developer license" on the top page of the, so you can apply here.

** You can't just register on the cybozu developer network! !! **
Be sure to press the ** "Get kintone developer license" ** button to apply!

# 2. Basic operation of

kintone Apply for the kintone environment, and when the access URL arrives at your e-mail address, you will be able to use kintone.
First, `browser we will play around with kintone inoperation`.

## Creating an app In

kintone, one table **app** is called a.
The general usage is to create multiple apps and build various DBs on kintone.

How to make an app,

1. the right side of the `+` Create a new app fromonapp
2. `Willcreatedfrom the the`Select
3. the required field`` to place
4. publication ofapplication

proceed in steps, such as thebeginning.Field`` is okay if Moraere think that the column of the table.
img_here
Drag and drop this field into the area on the right. That's commonly used fields in hackathons,

- string (one line)
- numeric value
- the creation date and time ※ value is entered automatically
- Radio buttons / drop-down (pull-down)
- check box
- attachments.

it is Toka  It's easy to fix it later, so it's a good idea to place a minimal number of fields and try it first.
top right cornerscreen of the`theof theapp`Creating If you click onafter,it is the only other completion of the DB table in it! Explosive speed!

## Register / edit / delete data using GUI

### Record registration The

operation is also easy when operating the data from the browser. After creating the app,the `listscreen` it will transition to, so from`+` add data (record).

### Record editing To edit a

registered record, open the record you want to edit once`penmark` and switch to edit mode from.

<img alt= "Button when editing record" 

### Delete record I

don't use it very often, butthe right of the pen mark `・ ・ ・` select delete record fromto.

---

This is the basic function.
To be honest, this is a difficult place to handle in a hackathon, but the next step is the true value of kintone.
Describes data manipulation by API.

kintonekintone 3.API

#also are prepared kintoneAPIkintone

- REST
- API,JavaScript

There is aAPI.The commonly used in hackathons by far `REST istheAPI`!

## kintone REST API This is the

so-called Restful API. It is possible to operate kintone data (fields, records, apps, etc.) from the outside.

The method get / add / update /`` offers adelete.

### How to check

Data can be manipulated by writing a header and body for a specific URL of kintone and sending a request.

The documentation is important from here on, and all the information you need to do the REST API can be found on the [cybozu developer network] (https://developer.cybozu.io/hc/en
).

### 

kintonecommon specification REST`of If you confirm aAPI,required. header``header` You can check

> Common specifications of kintone REST API
> <https://developer.cybozu.io/hc/ja/articles/201941754>

### Authentication When

operating kintone data from outside, authentication is required.
Two large for authentication

- password authentication
- API token

There are two authentication ofauthentication,recommended API token`` istheauthentication.

Issuing method of the token,

- open the configuration screen of the application
- from  Settings tab `APItoken` openthe
- generate`` To generate a token by clicking on the
   -  access rights`required` to set the
- Save and `appupdate` to:

warning: welllast of the app Please notebecause forget the update

if it is theAPI tokenof,how to write a header

```json
{
 "X-Cybozu-API-Token": "XXXXXXXXXXXX",
 "Content-Type": "application / json", // For POST, PUT, DELETE
}
`` ``

.

### URL /

kintoneREST API`body` By checking thelist,the required `URL/method`, by looking at the details page from there `parameterbody` it can be confirmed.

> Kintone REST API list
> <Https://developer.cybozu.io/hc/ja/articles/360000313406>

For example, `recordthe registration ofimg_here if you want to

one`,

- URL
   - https: // (sub-domain name) .cybozu.com / k / v1 / record.json
 Method
   - POST
- request body
   - app,record.

you can verify that

## kintone JavaScript API

It is an API that allows you to tamper with the kintone screen itself. You can place buttons and embed maps.
kintone rather than just a a`DB  there is also  front`that isa pretty big feature is thatDB.
It is also a big advantage that you can easily check whether the data is included in the browser (demo shine!)

However, since it is not used so much in the, I will omit it this time m (_ _) m)
hackathon(Charts.jsThere are times when the graph is displayed richly with, but it doesn't have to be on kintone? There is also a feeling w)

# 4. Sample

1. Let's make an app
2. Register data via a browser Let's tryLet's
3. issue an API tokenLet's get
4. the data registered in 2. with the curl commandLet's
5. register the text data with
6. Node.jsImage file with Node.js Let's uploadLet's
7. register text data withLet's
8. Pythonupload anLet's try
9. image file with Pythondownloading an image file with Python

! !!
(There are many, but each one is easy, so it will be over soon!)

: Warning: The PC to be used will be explained on Mac.

## 1. Let's makelet

an app First,'s create a basic app. I mentioned in the description of the above, butone to after login pageto `app` the next to the `+` to create a new fromkintone.

<img alt= "Create new app" 

Then scratch`Create fromto create` selectthe form.

Field,

- a string (one line)
- Radio button
- the attached
- creation date and time

to place thefile.

<img alt= "field to use" 

If this is left as it is, there are some parts that are a little difficult to handle from the program, sosettings `fieldfieldcode` change theto Roman characters in the.

<img alt= "Change field code" 

- string (one line)
 --- `Text`
- radio button
 --- `Radio`
- Attachments
 --- `File`
- creation date and time
 --- `Changetime`.

the Toka

After that,publicof the application`` the creation of the app by clicking on theis complete.
<img alt= "Publish App" 

## 2. Let's register data via a browser

on the right side of the screen `+` You can register a new record from. That's all.

img_here

## 3.Let's make sure you / app ID'll issue the API token

when working with data from an externalis `API required to issue atoken`.
The right `togearmark` open the Settings from theapp,`Settingstab`Roh`APIclick thetoken`.

<img alt= "Issuing API token" 

`Clickgeneratedthe` on  isto generate the token.
the initial value of access `view` Sincerights,such onlyrecord, the``checkall.

: warning: generated API token because the later **copy and pasteimg_here please sure you

**

`appID` isthe serial numberidentifies the table one by oneuse.
You can check the app ID from the URL.
(Each person has a different value, so please check each number.)

`Https` :← 〇〇 is the app ID

<//XXXXX.cybozu.com/k/〇〇/img alt= "app ID" 

## 4. Use the curl command to get the data registered in 2.

`` `bash
$ curl -X'GET'' https://SUB_DOMAIN.cybozu.com/k/v1/record.json?app = 〇 〇 & id = 1'-H' X-Cybozu-API-Token: YOUR_TOKEN'
```

If you get a response like this, you are successful.

`` `bash
{" record ": {" record number ": {" type ":" RECORD_NUMBER "," value ":" 1 "}," updater ": {" type ":" MODIFIER "," value " : {"code": "bb", "name": "BB"}}, "Creator": {"type": "CREATOR", "value": {"code": "bb", "name" : "BB"}}, "Attachment": {"type": "FILE", "value": [{"fileKey": "20190913144323BA448ED7625348ED8FE863DCEBF40A41132", "name": "Screenshot 2019-08-13 11.42.50" .png "," contentType ":" image / png "," size ":" 2581653 "}]}," Radio button ": {" type ":" RADIO_BUTTON "," value ":" sample2 "}," text ": {" type ":" SINGLE_LINE_TEXT "," value ":" Hackathon "}," $ revision ": {" type ":" __ REVISION__ "," value ":" 1 "}," Updated date ": {" type ":" UPDATED_TIME "," value ":" 2019-09-13T14: 43: 00Z "}," Creation date ": {" type ":" CREATED_TIME "," value ":" 2019-09-13T14: 43 : 00Z "}," $ id ": {" type ":" __ID__ "," value ":" 1 "}}}% 
`` `

[jq command] (https://stedolan.github.io/jq/) You can use theto clean it up.


 `` `Bash $ curl -X ' 'https://SUB_DOMAIN.cybozu.com/k/v1/record.json?app=〇〇&id=1' -H 'X-Cybozu-API-Token: YOUR_TOKEN'  | jq
```

` `json
{
 "record": {
   "Record number": {
     "type": "RECORD_NUMBER",
     "value": "1"
   },
   "Updater": {
     "type": "MODIFIER",
     "value": {
       "code": "bb",
       "name": "BB"
     }
   },
   "Creator": {
     "type": "CREATOR",
     "value": {
       "code": "bb",
       "name": "BB"
     }
   },
   "Attachment": {
     "type": "FILE",
     "value": [
       {
         "fileKey": "20190913144323BA448ED7625348ED8FE863DCEBF40A41132",
         "name": "Screenshot 2019-08-13 11.42.50.png",
         "contentType": "image / png",
         "size": "2581653"
       }
     ]
   },
   "Radio button": {
     "type": "RADIO_BUTTON",
     "value": "sample2"
   },
   "text": {
     "type": "SINGLE_LINE_TEXT",
     "value": "Hackathon"
   },
   "$ revision": {
     "type": "____ REVISION__",
     "value": "1"
   },
   "Update date": {
     "type": "UPDATED_TIME",
     "value": "2019-09-13T14: 43: 00Z"
   },
   "Created date": {
     "type": "CREATED_TIME",
     "value": "2019-09-13T14: 43: 00Z"
   },
   "$ id": {
     "type": "__ID__",
     "value": "1"
   }
 }
}
``` You

can get it in JSON format, just play with it in any programming language!

## 5. Let's register text data with: white_check_mark:

Node.jsSDK for Node.js [@ kintone / rest-api-client] (https://www.npmjs.com/package/@kintone/rest-api-client) Since there is, it is easy to use this.

・ Create repository & move

`` `bash
$ mkdir kin-hack; cd $_
```

・ (If you don't have Node.js) Install Nodebrew / Node.js`

``bash
$ brew install nodebrew

$ nodebrew install-binary stable
```

・ Create package.json`

`bash
$


npm init `` `· kintone-installation`


`` bash $ npm i --save


program the creation

```bash
$ touch index.js
of```

・ Contents of the program

`` `javascript: index.js

const { KintoneRestAPIClient } = = require('@ kintone / rest-api-client');
const client = = new KintoneRestAPIClient
 ({baseUrl: 'https://YOUR_SUB_DOMAIN.cybozu.com',
 auth: {
   apiToken: 'YOR_API_TOKEN'
 }
});

(async () => {
 const app = = 'YOR_APP_ID';
 const record = = {
   text: {
     value: 'Text you want to add'
   }
 };

 // Add Record
 try {
   const resp = =  .. await client record addRecord ({ 
   
 }  
   . catch (err) {console log
 };
}) ();

```

・ Execute

Node.js` ``bash
$ node index.js
```

・ Responseresponse
If there is alike this, it is successful.


  `` `Bash {id: '  


 Let's upload the image file in Node.js: white_check_mark:

The following arerather than  text an imagefile` `isuploada..

contents

```-Programjavascript: index.js
const { KintoneRestAPIClient } = = require('@ kintone / rest-api-client');
const client = = new KintoneRestAPIClient
 ({baseUrl: 'https://YOUR_SUB_DOMAIN.cybozu.com',
 auth: {
   apiToken: 'YOR_API_TOKEN'
 }
});

(async () => {
 const app = = 'YOR_APP_ID';
 const file = = {
   path: 'File path you want to add',
 };
 try {
   const resp = =  .. await client file uploadFile ({
   const res = =  .. await client record addRecord ({
     
      
       {File: {
         value: [{
           fileKey: resp.FileKey
         }]]
       }
     }
   
   });. Console log (res
 }  
   . catch (err) {console log
 }
}) ();
``` The

response itself has the same format as before.
I think that somehow can be seen if you look at the code, but when you upload a file in kintone

- first to upload a file itself to kintone
- `Receivefile of thekey` the
-  the`key file`of thatregisters theto

it will flow record.You're running the API twice!
(I think it works with copy and paste, so you can copy and paste this code in the future!)

## 7. Let's register text data with Python: white_check_mark:hackathons

Next is the method with Python that is very often used in. (Proceed on the assumption that Python is already included)

・ Create Python file

`` `bash
$ touch sample.py`
``

・ Program contents

`` `python
#! / Usr / bin / python
# _ * _ coding

: utf-8 _ * _ import 


hundred
API_TOKEN="YOUR_API_TOKEN"
PARAMS={
 "app":APPID,
 "record": {
   "text": {
     "value": "text you want to add in Python"
   }
 }
}

def post_kintone(url,api_token,params):
   "Kintone""registers one record in thefunction"
   
   "" headers =. { ""record.json",json=params,headers=headers)

    

 return resp if __name__ == "__main__"
   

   print(RESP.Text)
```

・ Python execution`

``bash
# python2 series
$ python

sample.py # python3 series
$ python3 sample.py
```

## 8. Let's upload an image file with Python: white_check_mark :

Uploading an image file in Python.
IRegister photos taken with Raspberry Pi to kintone`,` often hear scenarios such asso this can be used quite well ~

` ``python
#! / usr / bin / python
# _ * _ coding: utf-8 _ * _

 
 

import requests import json URL = "https://SUB_DOMAIN.cybozu.com/k/v1/
hundred
API_TOKEN="YOUR_API_TOKEN"

def post_file(url,api_token):
   "" "Function to upload files to kintone" ""
   headers={"X-Cybozu-API-Token":api_token,'X-Requested-With':'XMLHttpRequest'}
   image=open('./hoge.jpg
   ',' rb ') files =
   )
   return resp

def post_record(url,api_token,params):
   "Kintone""registers one record in thefunction"
   
   "" headers =. { "'record.json',json=params,headers=headers)

    

 return resp if __name__ == "__main__"
    
   
   
     "app":APPID,
     "record": {
       "file": {
         "value": [{
           "type": "FILE",
           "fileKey":RSP["fileKey"]
         }]
       }
     }
   }
   RP=post_record(URL,API_TOKEN,PARAMS)
   print(RP.text)

```

## 9. Let's download the image file with: white_check_mark:

PythonDownload the image file with Python.


`` `Python # / usr /


 
 


hundred
RECORDID=XX
API_TOKEN="YOR_API_TOKEN"

def get_file(url,api_token,filekey):
   "" "Function to download files to kintone" ""
   headers={"X-Cybozu-API-Token":api_token,'X-Requested-With':'XMLHttpRequest'}
   resp=requests.get(url+""file.json "+ '? fileKey ='
   
   

 get_record(url,api_token,app,id):
   "" "Function to get one record of kintone" ""
   headers={"X-Cybozu-API-Token":api_token}
   resp=requests.get(url+'record.json'+'? app ='+str(app)+'& id ='+str(id),headers=headers)

    . return json loads (. resp text

 
   RECORDID)
   RSP=get_file(URL,API_TOKEN,RESP)
   Theprint(RSP)
```

`download.png` image will be generated in the same directory as.

# 

reference>kintone How to use  ▼(database
ed.)> 

<Https://qiita.com/RyBB/items/daabb9b60d804ee2242f>>> ▼ for kintone REST API (GET
ed.)> 

<Https://qiita.com/RyBB/items/08cf511f1dbce6cf76bf>>> ▼ for kintone REST API (POST
ed.)> <https://qiita.com/RyBB/items/94c13ca56887558bb227>