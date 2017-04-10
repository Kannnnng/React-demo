import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <h1>Hello React!</h1>
        <h1>Hello React!</h1>
        <h1>Hello React!</h1>
        <h1>Hello React!</h1>
      </div>
    )
  }
}

const app = document.getElementById('app')  // eslint-disable-line
document.body.appendChild(app)  // eslint-disable-line
ReactDOM.render(<App />, app)
