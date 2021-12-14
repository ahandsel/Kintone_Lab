(function () {
  'use strict';

  kintone.events.on('app.record.index.show', function (event) {
    useState = require('react');
    const e = React.createElement;
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
    const filterPosts = (posts, query) => {
      if (!query) {
        return posts;
      }
      return posts.filter((post) => {
        const postName = post.name.toLowerCase();
        return postName.includes(query);
      });
    };
  const App = () => {
      // const { search } = window.location;
      const query = new URLSearchParams(search).get('s');
      const [searchQuery, setSearchQuery] = useState(query || '');
      const filteredPosts = filterPosts(posts, searchQuery);
      render() {
        if (this.state.liked) {
          return 'You liked this.';
        }

        return e(
          'div', {
            className: "App"
          }, React.createElement(Search, {
            searchQuery: searchQuery,
            setSearchQuery: setSearchQuery
          }), React.createElement("ul", null, filteredPosts.map(post => React.createElement("li", {
            key: post.id
          }, post.name)))
        );
      }
    }
    const domContainer = document.querySelector('#root');
    ReactDOM.render(e(App), domContainer);
  });
})();