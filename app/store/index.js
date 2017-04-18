import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers'

const _create = window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore  // eslint-disable-line
const create = process.env.NODE_ENV === 'production' ? createStore : _create  // eslint-disable-line

function configStore(initialState, middleware) {
  const createStoreWithMiddleware = compose(
    applyMiddleware(
      middleware,
    ),
  )(create)

  const store = createStoreWithMiddleware(reducers, initialState)
  return store
}

export default configStore
