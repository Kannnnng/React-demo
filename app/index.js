import 'normalize.css/normalize.css'

import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { MuiThemeProvider } from 'material-ui'
import { getMuiTheme } from 'material-ui/styles'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configStore from 'store'
import routes from './router'

import './index.css'

injectTapEventPlugin()

const initialState = {}
const store = configStore(initialState)

const muiTheme = getMuiTheme({})

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <BrowserRouter basename="/">
            {routes}
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')  // eslint-disable-line
)
