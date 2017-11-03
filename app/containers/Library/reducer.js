/**
 *
 * Library reducer
 *
 */

import lodash from 'lodash'
import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'

const initialState = fromJS({})

export default handleActions({
  'APP/LIBRARY/GET_MY_ALL_COURSES_ACTION': {
    next(state, action) {
      const libraries = lodash.get(action, 'payload.entities.libraries')
      if (libraries) {
        return state
          .set('libraries', Map(libraries))
      }
      return state
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/GET_MY_ALL_COURSE_GROUPS_ACTION': {
    next(state) {
      return state
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/GET_MY_ALL_CLASSROOMS_ACTION': {
    next(state) {
      return state
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/GET_LIBRARY_BY_LIBRARY_ID_ACTION': {
    next(state) {
      return state
    },
    throw(state) {
      return state
    },
  },
}, initialState)
