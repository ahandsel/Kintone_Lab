// Status: Does not work with Kintone
// Error: Target Container is not a DOM Element

// CDN URLs
// https://unpkg.com/react@17/umd/react.development.js
// https://unpkg.com/react-dom@17/umd/react-dom.development.js

(function () {
  "use strict";

  // function loadJS(src) {
  //   document.write('<script type="text/javascript" src="' + src + '"></script>');
  // }

  // // Development versions of React
  // loadJS('https://unpkg.com/react@17/umd/react.development.js');
  // loadJS('https://unpkg.com/react-dom@17/umd/react-dom.development.js');

  // Minified and optimized production versions of React
  // loadJS('https://unpkg.com/react@17/umd/react.production.min.js');
  // loadJS('https://unpkg.com/react-dom@17/umd/react-dom.production.min.js');

  kintone.events.on("app.record.index.show", function (event) {

    const e = React.createElement;

    class LikeButton extends React.Component {
      constructor(props) {
        super(props);
        this.state = { liked: false };
      }

      render() {
        if (this.state.liked) {
          return "You liked this.";
        }

        return e(
          "button",
          { onClick: () => this.setState({ liked: true }) },
          "Like"
        );
      }
    }

    // const domContainer = document.querySelector("#like_button_container");
    // ReactDOM.render(e(LikeButton), domContainer);
    ReactDOM.render(React.createElement("h1", null, "Hello, world!"), document.querySelector("#like_button_container"));
  });
})();
