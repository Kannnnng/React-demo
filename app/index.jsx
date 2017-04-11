import React from 'react'
import ReactDOM from 'react-dom'
import Profile from './Profile.jsx'

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
