(function () {
  "use strict";

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
  
    const domContainer = document.querySelector("#like_button_container");
    ReactDOM.render(e(LikeButton), domContainer);
  });
})();
