import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

const reducers = {
  routing: routerReducer,
}

export default combineReducers(reducers)
