import React from 'react'
import ReactDOM from 'react-dom'
import { fromJS } from 'immutable'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import InjectTapEventPlugin from 'react-tap-event-plugin'
import Routes from './routes'
import configStore from './store'

import './styles'

InjectTapEventPlugin()

/* 创建 store */
const initialState = fromJS({})
const store = configStore(initialState)

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <Component />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')  // eslint-disable-line
  )
}

render(Routes)

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(Routes)
  })
}
