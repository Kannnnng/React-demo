/**
 *
 * Library reducer
 *
 */

import lodash from 'lodash'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initialState = fromJS({})

export default handleActions({
  'APP/LIBRARY/GET_MY_ALL_COURSES_ACTION': {
    next(state, action) {
      const courses = lodash.get(action, 'payload.entities.courses')
      const myCourseIds = lodash.get(action, 'payload.result.courses')
      return state
        .set('courses', fromJS(courses))
        .set('myCourseIds', fromJS(myCourseIds))
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/GET_MY_ALL_COURSE_GROUPS_ACTION': {
    next(state, action) {
      const groups = lodash.get(action, 'payload.entities.groups')
      return state
        .set('groups', fromJS(groups))
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
  'APP/LIBRARY/GET_QUESTIONS_BY_COURSE_ID_ACTION': {
    next(state, action) {
      const chapters = lodash.get(action, 'payload.entities.chapters')
      const coursewares = lodash.get(action, 'payload.entities.coursewares')
      const labels = lodash.get(action, 'payload.entities.labels')
      const questions = lodash.get(action, 'payload.entities.questions')
      const quizzes = lodash.get(action, 'payload.entities.quizzes')
      return state
        .set('chapters', fromJS(chapters))
        .set('coursewares', fromJS(coursewares))
        .set('labels', fromJS(labels))
        .set('questions', fromJS(questions))
        .set('quizzes', fromJS(quizzes))
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/SELECT_COURSE_ACTION': {
    next(state, action) {
      const courseId = lodash.get(action, 'payload.courseId')
      return state
        .setIn(['others', 'selectedCourseId'], courseId)
    },
    throw(state) {
      return state
    },
  },
}, initialState)
