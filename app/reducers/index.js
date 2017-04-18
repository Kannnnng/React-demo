import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

const reducers = {
  router: routerReducer,
}

export default combineReducers(reducers)
