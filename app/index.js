import React from 'react'
import ReactDOM from 'react-dom'
import Provider from 'react-redux/lib/components/Provider'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Routes from './routes'
import configStore from './store'

import './styles'

/* 修复 material-ui 中 onTouch 事件的 BUG */
injectTapEventPlugin()

/* 创建 store */
const initialState = {}
const store = configStore(initialState)

/* material-ui 所需属性 */
const muiTheme = getMuiTheme({})

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

render(Routes)

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(Routes)
  })
}
