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
    selectedCourseOrCourseGroupOrClassroom: {},
    currentPageNumber: 1,
    selectedQuestionItems: {},
    previewQuestionItem: {},
    selectedChapterId: null,
    searchText: null,
  },
  status: {
    copyQuestionItemToLibraryStatus: 'initial',
  },
})

export default handleActions({
  'APP/LIBRARY/GET_MY_ALL_COURSES_ACTION': {
    next(state, action) {
      const courses = lodash.get(action, 'payload.entities.courses')
      const chapters = lodash.get(action, 'payload.entities.chapters')
      const myCourseIds = lodash.get(action, 'payload.result.libraries')
      return state
        .mergeIn(['courses'], fromJS(courses))
        .mergeIn(['chapters'], fromJS(chapters))
        .set('myCourseIds', fromJS(myCourseIds))
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/GET_MY_ALL_COURSE_GROUPS_ACTION': {
    next(state, action) {
      const courseGroups = lodash.get(action, 'payload.entities.courseGroups')
      const chapters = lodash.get(action, 'payload.entities.chapters')
      const myCourseGroupIds = lodash.get(action, 'payload.result.groupList')
      return state
        .mergeIn(['courseGroups'], fromJS(courseGroups))
        .mergeIn(['chapters'], fromJS(chapters))
        .set('myCourseGroupIds', fromJS(myCourseGroupIds))
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/GET_MY_ALL_CLASSROOMS_ACTION': {
    next(state, action) {
      const classrooms = lodash.get(action, 'payload.entities.classrooms')
      const chapters = lodash.get(action, 'payload.entities.chapters')
      const myClassroomIds = lodash.get(action, 'payload.result.courses')
      const teacher = lodash.get(action, 'payload.result.teacher')
      return state
        .mergeIn(['classrooms'], fromJS(classrooms))
        .mergeIn(['chapters'], fromJS(chapters))
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
      const subQuestions = lodash.get(action, 'payload.entities.subQuestions')
      const quizzes = lodash.get(action, 'payload.entities.quizzes')
      const course = lodash.get(action, 'payload.result.library')
      return state
        .mergeIn(['chapters'], fromJS(chapters))
        .mergeIn(['coursewares'], fromJS(coursewares))
        .mergeIn(['labels'], fromJS(labels))
        .mergeIn(['questions'], fromJS(questions))
        .mergeIn(['questions'], fromJS(subQuestions))
        .mergeIn(['quizzes'], fromJS(quizzes))
        .mergeIn(['courses'], fromJS({
          [course.id]: course,
        }))
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/GET_QUESTIONS_BY_COURSE_GROUP_ID_ACTION': {
    next(state, action) {
      const chapters = lodash.get(action, 'payload.entities.chapters')
      const coursewares = lodash.get(action, 'payload.entities.coursewares')
      const courseGroup = lodash.get(action, 'payload.entities.courseGroup')
      const labels = lodash.get(action, 'payload.entities.labels')
      const questions = lodash.get(action, 'payload.entities.questions')
      const subQuestions = lodash.get(action, 'payload.entities.subQuestions')
      const quizzes = lodash.get(action, 'payload.entities.quizzes')
      return state
        .mergeIn(['chapters'], fromJS(chapters))
        .mergeIn(['coursewares'], fromJS(coursewares))
        .mergeIn(['labels'], fromJS(labels))
        .mergeIn(['questions'], fromJS(questions))
        .mergeIn(['questions'], fromJS(subQuestions))
        .mergeIn(['quizzes'], fromJS(quizzes))
        .mergeIn(['courseGroups'], fromJS(courseGroup))
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/GET_QUESTIONS_BY_CLASSROOM_ID_ACTION': {
    next(state, action) {
      const chapters = lodash.get(action, 'payload.entities.chapters')
      const coursewares = lodash.get(action, 'payload.entities.coursewares')
      const labels = lodash.get(action, 'payload.entities.labels')
      const questions = lodash.get(action, 'payload.entities.questions')
      const subQuestions = lodash.get(action, 'payload.entities.subQuestions')
      const quizzes = lodash.get(action, 'payload.entities.quizzes')
      const result = lodash.get(action, 'payload.result')
      const classroomId = lodash.get(action, 'payload.classroomId')
      return state
        .mergeIn(['chapters'], fromJS(chapters))
        .mergeIn(['coursewares'], fromJS(coursewares))
        .mergeIn(['labels'], fromJS(labels))
        .mergeIn(['questions'], fromJS(questions))
        .mergeIn(['questions'], fromJS(subQuestions))
        .mergeIn(['quizzes'], fromJS(quizzes))
        .mergeDeepIn(['classrooms'], fromJS({
          [classroomId]: result,
        }))
    },
    throw(state) {
      return state
    },
  },
  'APP/LIBRARY/SELECT_COURSE_OR_COURSE_GROUP_OR_CLASSROOM_ACTION': {
    next(state, action) {
      const id = lodash.get(action, 'payload.id')
      const name = lodash.get(action, 'payload.name')
      return state
        .mergeIn(['others'], fromJS({
          selectedCourseOrCourseGroupOrClassroom: {
            id,
            name,
          },
          currentNumber: 1,
          selectedQuestionItems: {},
          previewQuestionItem: {},
          selectedChapterId: null,
          searchText: null,
        }))
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
            .setIn(['others', 'selectedQuestionItems'], fromJS({}))
            .setIn(['others', 'currentPageNumber'], 1)
        default:
          return state
      }
    },
    throw(state) {
      return state
    },
  },
  /* 选中某一道题目、组卷、课件 */
  'APP/LIBRARY/SELECT_QUESTIONITEM_ACTION': {
    next(state, action) {
      const id = lodash.get(action, 'payload.id')
      const name = lodash.get(action, 'payload.name')
      const isChecked = lodash.get(action, 'payload.isChecked')
      if (isChecked) {
        if (state.getIn(['others', 'selectedQuestionItems']).has(id)) {
          return state
        }
        return state.updateIn(['others', 'selectedQuestionItems'], (value) => value.set(id, fromJS({
          id,
          name,
        })))
      }
      return state.deleteIn(['others', 'selectedQuestionItems', id])
    },
    throw(state) {
      return state
    },
  },
  /* 打开题目或组卷的预览界面 */
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
  /* 关闭预览界面 */
  'APP/LIBRARY/CLOSE_PREVIEW_QUESTIONITEM_ACTION': {
    next(state) {
      return state.setIn(['others', 'previewQuestionItem'], fromJS({}))
    },
    throw(state) {
      return state
    },
  },
  /* 复制选择的题目、组卷和课件到指定的课程、课程组和课堂中去 */
  'APP/LIBRARY/COPY_QUESTIONITEM_TO_LIBRARY_ACTION': {
    next(state, action) {
      const name = lodash.get(action, 'payload.name')
      const targetId = lodash.get(action, 'payload.targetId')
      const numbers = lodash.get(action, 'payload.numbers')
      return state
        .setIn([name, targetId, 'newCopyedQuestionItemNumbers'], numbers)
        .setIn(['others', 'selectedQuestionItems'], fromJS({}))
    },
    throw(state) {
      return state.setIn(['status', 'copyQuestionItemToLibraryStatus'], 'failed')
    },
  },
}, initialState)
