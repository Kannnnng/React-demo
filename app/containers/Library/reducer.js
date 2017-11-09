/**
 *
 * Library reducer
 *
 */

import lodash from 'lodash'
import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

const initialState = fromJS({
  others: {
    selectedCourseId: null,
    currentPageNumber: 1,
    selectedQuestionItemIds: [],
    previewQuestionItem: {},
  },
})

export default handleActions({
  'APP/LIBRARY/GET_MY_ALL_COURSES_ACTION': {
    next(state, action) {
      const courses = lodash.get(action, 'payload.entities.courses')
      const myCourseIds = lodash.get(action, 'payload.result.libraries')
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
      const courseGroups = lodash.get(action, 'payload.entities.courseGroups')
      return state
        .set('courseGroups', fromJS(courseGroups))
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/GET_MY_ALL_CLASSROOMS_ACTION': {
    next(state, action) {
      const classrooms = lodash.get(action, 'payload.entities.classrooms')
      const myClassroomIds = lodash.get(action, 'payload.result.courses')
      const teacher = lodash.get(action, 'payload.entities.teacher')
      return state
        .set('classrooms', fromJS(classrooms))
        .set('myClassroomIds', fromJS(myClassroomIds))
        .set('mine', fromJS(teacher))
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
      const course = lodash.get(action, 'payload.result.library')
      return state
        .mergeIn(['chapters'], fromJS(chapters))
        .mergeIn(['coursewares'], fromJS(coursewares))
        .mergeIn(['labels'], fromJS(labels))
        .mergeIn(['questions'], fromJS(questions))
        .mergeIn(['quizzes'], fromJS(quizzes))
        .mergeIn(['courses'], fromJS({
          [course.id]: course,
        }))
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
        .setIn(['others', 'currentPageNumber'], 1)
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/PAGE_NUMBER_CHANGE_ACTION': {
    next(state, action) {
      const number = lodash.get(action, 'payload.number')
      return state
        .setIn(['others', 'currentPageNumber'], number)
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/SELECT_CHPATER_ACTION': {
    next(state, action) {
      const id = lodash.get(action, 'payload.id')
      return state
        .setIn(['others', 'selectedChapterId'], id)
        .setIn(['others', 'currentPageNumber'], 1)
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/FILTER_QUESTIONS_BY_SEARCH_ACTION': {
    next(state, action) {
      const searchText = lodash.get(action, 'payload.searchText')
      return state
        .setIn(['others', 'searchText'], searchText)
        .setIn(['others', 'currentPageNumber'], 1)
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/DELETE_CONDITION_ACTION': {
    next(state, action) {
      const name = lodash.get(action, 'payload.name')
      switch (name) {
        case 'chapter':
          return state
            .deleteIn(['others', 'selectedChapterId'])
            .setIn(['others', 'currentPageNumber'], 1)
        case 'search':
          return state
            .deleteIn(['others', 'searchText'])
            .setIn(['others', 'currentPageNumber'], 1)
        case 'select':
          return state
            .deleteIn(['others', 'select'])
            .setIn(['others', 'currentPageNumber'], 1)
        default:
          return state
      }
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/SELECT_QUESTIONITEM_ACTION': {
    next(state, action) {
      const id = lodash.get(action, 'payload.id')
      const isChecked = lodash.get(action, 'payload.isChecked')
      if (isChecked && !state.getIn(['others', 'selectedQuestionItemIds']).includes(id)) {
        return state.updateIn(['others', 'selectedQuestionItemIds'], (value) => value.push(id))
      }
      const index = state.getIn(['others', 'selectedQuestionItemIds']).findIndex((value) => value === id)
      if (index !== -1) {
        return state.deleteIn(['others', 'selectedQuestionItemIds', index])
      }
      return state
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/PREVIEW_QUESTIONITEM_ACTION': {
    next(state, action) {
      const id = lodash.get(action, 'payload.id')
      const name = lodash.get(action, 'payload.name')
      return state
        .setIn(['others', 'previewQuestionItem'], fromJS({
          id,
          name,
        }))
    },
    throw(state) {
      return state
    },
  },
}, initialState)
