import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import test from './Test'

const reducers = {
  routing: routerReducer,
  test,
}

export default combineReducers(reducers)
