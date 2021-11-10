# React CDN Only Example -> Into Kintone

## Add React in One Minute
  * [Add React in One Minute – React Doc](https://reactjs.org/docs/add-react-to-a-website.html#add-react-in-one-minute)
  * [Add React in One Minute - Gist](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)

## Kintone Version
1. Create a Custom View
   1. Insert `<div id="like_button_container"></div>`
   2. Get the **View ID**
2. Start with Kintone Customize Template

```js
(function () {
  'use strict';

  kintoneEvent

  kintone.events.on('app.record.index.show', function (event) {

  });
})();
```

Then create a React Element
* `const e = React.createElement;`
* 

## Kintone does not support jsx