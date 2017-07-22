import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppContainer } from 'react-hot-loader'
import App from 'containers/App'

import './index.css'

injectTapEventPlugin()

if (process.env.NODE_ENV === 'production') {
  ReactDOM.render(
    <App />,
    document.getElementById('app')  // eslint-disable-line
  )
} else {
  const render = (Component) => {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById('app')  // eslint-disable-line
    )
  }

  render(App)

  if (module.hot) {
    module.hot.accept('containers/App', () => {
      render(App)
    })
  }
}
