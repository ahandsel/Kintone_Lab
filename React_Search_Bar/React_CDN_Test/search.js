(function () {
  "use strict";
  useState = require('react');

  const posts = [{
      id: '1',
      name: 'This first post is about React'
    },
    {
      id: '2',
      name: 'This next post is about Preact'
    },
    {
      id: '3',
      name: 'We have yet another React post!'
    },
    {
      id: '4',
      name: 'This is the fourth and final post'
    },
  ];

  kintone.events.on("app.record.index.show", function (event) {
    // var records = event.records;

    const SearchBar = ({
      searchQuery,
      setSearchQuery
    }) => {
      return React.createElement("form", {
        action: "/",
        method: "get",
        autoComplete: "off",
        onSubmit: onSubmit
      }, React.createElement("label", {
        htmlFor: "header-search"
      }, React.createElement("span", {
        className: "visually-hidden"
      }, "Search blog posts")), React.createElement("input", {
        value: searchQuery,
        onInput: e => setSearchQuery(e.target.value),
        type: "text",
        id: "header-search",
        placeholder: "Search blog posts",
        name: "s"
      }), React.createElement("button", {
        type: "submit"
      }, "Search"));
    };

    const filterPosts = (posts, query) => {
      if (!query) {
        return posts;
      }

      return posts.filter(post => {
        const postName = post.name.toLowerCase();
        return postName.includes(query);
      });
    };

    const App = () => {
      const {
        search
      } = window.location;
      const query = new URLSearchParams(search).get('s');
      const [searchQuery, setSearchQuery] = useState(query || '');
      const filteredPosts = filterPosts(posts, searchQuery);
      return React.createElement(BrowserRouter, null, React.createElement("div", {
        className: "App"
      }, React.createElement(Search, {
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery
      }), React.createElement("ul", null, filteredPosts.map(post => React.createElement("li", {
        key: post.id
      }, post.name)))));
    };

    const e = React.createElement;

    class LikeButton extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          liked: false
        };
      }

      render() {
        if (this.state.liked) {
          return "You liked this.";
        }

        return e(
          "button", {
            onClick: () => this.setState({
              liked: true
            })
          },
          "Like"
        );
      }
    }

    const domContainer = document.querySelector("#like_button_container");
    // ReactDOM.render(e(LikeButton), domContainer);
    ReactDOM.render(React.createElement("h1", null, "Hello, world!"), document.querySelector("#like_button_container"));
  });
})();