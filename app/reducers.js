import combineReducers from 'redux/lib/combineReducers'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import test from 'containers/Test/reducer'

const reducers = {
  form: formReducer,
  routing: routerReducer,
  test,
}

export default combineReducers(reducers)
