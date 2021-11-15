# React x Kintone - Search Bar

## Nov 15 - Note Reflection

```text
<script> tags
The Custom view does not support <script> tags. If <script> tags were included in the HTML code, they will be ignored when the custom view is loaded. To run JavaScript in a Custom view, the JavaScript and CSS customization settings must be used.
```

<https://developer.kintone.io/hc/en-us/articles/115002436434>

### References
  * [Configuring Views](https://get.kintone.help/k/en/user/app_settings/view/set_view.html)
  * [Custom views with pagination and filtering – Kintone Developer Program](https://developer.kintone.io/hc/en-us/articles/115002487174)
  * [Display record data in a custom view – Kintone Developer Program](https://developer.kintone.io/hc/en-us/articles/900000010623)

### Finally got a Webpack x React setup for Kintone!
* <https://github.com/ahandsel/Kintone_Customization_Webpack>

---

## Nov 13 - Note Summary

Three options of going forward:
1. All HTML method
2. HTML + JSX-free method
3. Convert JSX to JS, then upload HTML + JS file to Kintone
   1. <https://github.com/cybozudevnet/sample-kintone-webpack-for-intermediate>

  * [javascript - React Error: Target Container is not a DOM Element - Stack Overflow](https://stackoverflow.com/questions/26416334/react-error-target-container-is-not-a-dom-element/35234369)
  * [React Getting Started](https://www.w3schools.com/react/react_getstarted.asp)
  * [javascript - How to load es6, react, babel code in html with cdn? - Stack Overflow](https://stackoverflow.com/questions/43931538/how-to-load-es6-react-babel-code-in-html-with-cdn)

## Reference
  * [Create a search form in a Custom View with Vue.js – KDP](https://developer.kintone.io/hc/en-us/articles/360000514874)
  * [How to build a search bar in React · Emma Goto](https://www.emgoto.com/react-search-bar/)

## Cramming emgoto/react-search-bar into Kintone

### CDNs

  * react": "^17.0.1"
  * react-dom": "^17.0.1"
  * react-router-dom": "^5.2.0"

```text
https://unpkg.com/react@17.0.1/umd/react.development.js

https://unpkg.com/react-dom@17.0.1/umd/react-dom.development.js

https://unpkg.com/react-router-dom@5.2.0/umd/react-router-dom.js
```
