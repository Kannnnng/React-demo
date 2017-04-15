import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
// import { Router, Route, hashHistory } from 'react-router'
import Profile from './containers/Profile.jsx'

require('normalize.css/normalize.css')

const _create = window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore  // eslint-disable-line
const create = process.env.NODE_ENV === 'production' ? createStore : _create  // eslint-disable-line

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Profile name="kang" age="23" />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')  // eslint-disable-line
)
