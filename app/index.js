import 'style-loader!css-loader!normalize.css/normalize.css'  // eslint-disable-line

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import configStore from './store'
import routes from './router.js'

const initialState = {}
const store = configStore(initialState)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter basename="/">
          <div>
            {routes}
          </div>
        </HashRouter>
      </Provider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')  // eslint-disable-line
)
