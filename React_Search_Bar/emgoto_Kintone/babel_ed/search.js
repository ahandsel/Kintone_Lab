"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// import { useHistory } from 'react-router-dom';
useHistory = require('react-router-dom');

const SearchBar = ({
  searchQuery,
  setSearchQuery
}) => {
  const history = useHistory();

  const onSubmit = e => {
    history.push(`?s=${searchQuery}`);
    e.preventDefault();
  };

  return /*#__PURE__*/React.createElement("form", {
    action: "/",
    method: "get",
    autoComplete: "off",
    onSubmit: onSubmit
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "header-search"
  }, /*#__PURE__*/React.createElement("span", {
    className: "visually-hidden"
  }, "Search blog posts")), /*#__PURE__*/React.createElement("input", {
    value: searchQuery,
    onInput: e => setSearchQuery(e.target.value),
    type: "text",
    id: "header-search",
    placeholder: "Search blog posts",
    name: "s"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Search"));
};

var _default = SearchBar;
exports.default = _default;