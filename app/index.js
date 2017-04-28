import 'style-loader!css-loader!normalize.css/normalize.css'  // eslint-disable-line
import 'style-loader!css-loader!font-awesome/css/font-awesome.min.css'  // eslint-disable-line

import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from 'material-ui'
import { getMuiTheme } from 'material-ui/styles'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import configStore from 'store'
import routes from './router'

injectTapEventPlugin()

const initialState = {}
const store = configStore(initialState)

const muiTheme = getMuiTheme({})

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <HashRouter basename="/">
            {routes}
          </HashRouter>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')  // eslint-disable-line
)
