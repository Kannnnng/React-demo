import createStore from 'redux/lib/createStore'
import applyMiddleware from 'redux/lib/applyMiddleware'
import compose from 'redux/lib/compose'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise'
import rootReducer from './reducers'

const _create = window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore  // eslint-disable-line
const create = process.env.NODE_ENV === 'production' ? createStore : _create  // eslint-disable-line

const logger = createLogger({ collapsed: true })

function configStore(initialState) {
  let store = null
  if (process.env.NODE_ENV === 'production') {
    store = create(rootReducer, initialState)
  } else {
    const createStoreWithMiddleware = compose(
      applyMiddleware(
        promiseMiddleware,
        logger,
      ),
    )(create)
    store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers')  // eslint-disable-line
        store.replaceReducer(nextRootReducer)
      })
    }
  }

  return store
}

export default configStore
