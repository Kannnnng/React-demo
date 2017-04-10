import React from 'react'
import ReactDOM from 'react-dom'
import Profile from './Profile.jsx'

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <h1>Hello React!</h1>
        <h1>Hello React!</h1>
        <h1>Hello React!</h1>
        <h1>Hello React!</h1>
        <Profile name="闫守康" age="23" />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')  // eslint-disable-line
)
