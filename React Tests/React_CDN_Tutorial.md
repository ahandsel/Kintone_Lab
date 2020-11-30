# React Using CDN URL

## React Tutorial (with Redux) by The Net Ninja
https://www.youtube.com/playlist?list=PL4cUxeGkcC9ij8CfkAY2RAGb-tmkNwQHG

## Notes

### Overview of React's process

- React takes a Virtual DOM and applies it to the actual DOM
- When we want to make a change to a component (e.g., Search box), React creates a New Virtual DOM in the background and compares the New Virtual DOM from the Old. Then React only updates the difference.

Virtual DOM (VDOM)
- programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM
- You tell React what state you want the UI to be in, and it makes sure the DOM matches that state. 
- This abstracts out the attribute manipulation, event handling, & manual DOM updating that you would otherwise have to use to build your app.

### Components
- Components look like HTML templates BUT actually [JSX](https://reactjs.org/docs/introducing-jsx.html) (syntax extension to JavaScript).
- Contains the 'state' (date or UI state)
- Contain JS for functionality

### CDN Links
- React CDN - https://reactjs.org/docs/cdn-links.html
- `https://unpkg.com/react@17/umd/react.development.js` React layer
- `https://unpkg.com/react-dom@17/umd/react-dom.development.js` React DOM layer that acts the glue between React & DOM

### JSX
- Always have one root `div` tag
- `class` cannot be used; use `className` instead
- Dynamic content is enclosed with curly brackets:
  - `<HTML_TAG>{ Dynamic_Content_Here }</HTML_TAG>`

### Babel-standalone
```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
  <!-- JSX here--->
</script>
```

### Component State
- JS Object
- Describes the component's current state
- Can be updated over time: data change
- Whenever a component state is changed, React will output that new state to the DOM

### Button & Functions
e.g., onClick
- create a handelClick(e) function
- render() function
  - create a root div tag
  - create a button with onClick
  - wrap the onClick's function in {curly brackets}
```html
  <script type="text/babel">
    class App extends React.Component {
      handleClick(e){
        console.log(e.target);
      }
      render() {
        return ( // JSX here
          <div className="app-content">
            <button onClick={this.handleClick}>Click Me</button>
          </div>
        )
      }
    }
    ReactDOM.render(<App />, document.getElementById('app'));
  </script>
```

### Changing State & `this`
* [Complete React Tutorial (& Redux) #8 - Changing State (and 'this') Video](https://youtu.be/XJzDF9bj368)