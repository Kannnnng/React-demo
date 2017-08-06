import React from 'react'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import HashRouter from 'react-router-dom/HashRouter'
import routes from './routes'

const Router = process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter

class App extends React.Component {
  render() {
    return (
      <Router basename="/">
        {routes}
      </Router>
    )
  }
}

export default App
