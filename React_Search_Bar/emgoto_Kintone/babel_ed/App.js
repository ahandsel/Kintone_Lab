"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
useState = require('react');
BrowserRouter = require('react-router-dom');
Search = require('./search'); // import { useState } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import Search from './search';

const posts = [{
  id: '1',
  name: 'This first post is about React'
}, {
  id: '2',
  name: 'This next post is about Preact'
}, {
  id: '3',
  name: 'We have yet another React post!'
}, {
  id: '4',
  name: 'This is the fourth and final post'
}];

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
  return /*#__PURE__*/React.createElement(BrowserRouter, null, /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement(Search, {
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery
  }), /*#__PURE__*/React.createElement("ul", null, filteredPosts.map(post => /*#__PURE__*/React.createElement("li", {
    key: post.id
  }, post.name)))));
};

var _default = App;
exports.default = _default;