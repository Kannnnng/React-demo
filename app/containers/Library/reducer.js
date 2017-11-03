/**
 *
 * Library reducer
 *
 */

import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initialState = fromJS({})

export default handleActions({
  APP/LIBRARY/DEFAULT_ACTION: {
    next(state) {
      return state
    },
    throw(state) {
      return state
    },
  },
}, initialState)
