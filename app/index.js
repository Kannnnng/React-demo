import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { MuiThemeProvider } from 'material-ui'
import { getMuiTheme } from 'material-ui/styles'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './app'
import configStore from './store'

import './styles'

/* material-ui Tap Event Bug */
injectTapEventPlugin()

/* 创建 store */
const initialState = {}
const store = configStore(initialState)

/* material-ui 所需属性 */
const muiTheme = getMuiTheme({})

if (process.env.NODE_ENV === 'production') {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')  // eslint-disable-line
  )
} else {
  const render = (Component) => {
    ReactDOM.render(
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppContainer>
            <Component />
          </AppContainer>
        </MuiThemeProvider>
      </Provider>,
      document.getElementById('app')  // eslint-disable-line
    )
  }

  render(App)

  if (module.hot) {
    module.hot.accept('./app', () => {
      render(App)
    })
  }
}
