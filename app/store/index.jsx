import { createStore } from 'redux'
import reducers from '../reducers/index.jsx'

const _create = window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore  // eslint-disable-line
const create = process.env.NODE_ENV === 'production' ? createStore : _create  // eslint-disable-line

const store = create(reducers, {})

export default store
