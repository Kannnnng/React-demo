import 'style-loader!css-loader?importLoaders=1!normalize.css/normalize.css'  // eslint-disable-line

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import configStore from './store'
import routes from './router.js'

const initialState = {}
const store = configStore(initialState, routerMiddleware(browserHistory))
const history = syncHistoryWithStore(browserHistory, store)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')  // eslint-disable-line
)
