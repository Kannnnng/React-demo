// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form'
import test from 'containers/Test/reducer'
import library from 'containers/Library/reducer'

const reducers = {
  form: formReducer,
  test,
  library,
}

export default combineReducers(reducers)
