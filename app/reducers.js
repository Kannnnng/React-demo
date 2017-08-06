import combineReducers from 'redux/lib/combineReducers'
import { routerReducer } from 'react-router-redux'
import test from 'containers/Test/reducer'

const reducers = {
  routing: routerReducer,
  test,
}

export default combineReducers(reducers)
