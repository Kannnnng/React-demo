import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import test from 'containers/Test/reducer'

const reducers = {
  routing: routerReducer,
  test,
}

export default combineReducers(reducers)
