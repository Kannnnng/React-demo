import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui'
import { getMuiTheme } from 'material-ui/styles'
import configStore from 'app/store'
import routes from 'app/router'

const initialState = {}
const store = configStore(initialState)

const muiTheme = getMuiTheme({})

const Router = process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Router basename="/">
            {routes}
          </Router>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
