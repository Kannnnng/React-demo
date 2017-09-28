import { fromJS } from 'immutable'  // eslint-disable-line
import { handleActions } from 'redux-actions'

const initialState = fromJS({
  message: '这是一段测试代码',
})

export default handleActions({
  TEST_ACTION: {
    next(state) {
      const next = state
        .set('message', '现在已经发出 Action 了')
      return next
    },
    throw(state) {
      return state
    },
  },
}, initialState)
