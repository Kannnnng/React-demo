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
    /* 当前课程、课程组或课堂中选定的所有题目、组卷和课件 */
    selectedAllQuestionItems: {},
    /* 当前课程、课程组或课堂中经过筛选后显示在页面上的选定的所有题目、组卷和课件 */
    selectedCurrentQuestionItems: {},
    previewQuestionItem: {},
    selectedChapterId: null,
    searchText: null,
  },
  status: {
    copyQuestionItemToLibraryStatus: 'initial',
    getQuestionsByCourseIdStatus: 'initial',
    getQuestionsByCourseGroupIdStatus: 'initial',
    getQuestionsByClassroomIdStatus: 'initial',
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
  /* 初始化根据 ID 获取详情数据请求的状态标志位 */
  'APP/LIBRARY/INITIAL_GET_QUESTIONS_BY_ID_STATUS_ACTION': {
    next(state, action) {
      const status = lodash.get(action, 'payload.status')
      const name = lodash.get(action, 'payload.name')
      const mapNameToStatus = {
        course: 'getQuestionsByCourseIdStatus',
        courseGroup: 'getQuestionsByCourseGroupIdStatus',
        classroom: 'getQuestionsByClassroomIdStatus',
      }
      return state.setIn(['status', mapNameToStatus[name]], status)
    },
    throw(state) {
      return state
    },
  },
  /* 根据课程 ID 获取详情数据 */
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
        .setIn(['status', 'getQuestionsByCourseIdStatus'], 'succeed')
    },
    throw(state) {
      return state.setIn(['status', 'getQuestionsByCourseIdStatus'], 'failed')
    },
  },
  /* 根据课程组 ID 获取详情数据 */
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
        .setIn(['status', 'getQuestionsByCourseGroupIdStatus'], 'succeed')
    },
    throw(state) {
      return state.setIn(['status', 'getQuestionsByCourseGroupIdStatus'], 'failed')
    },
  },
  /* 根据课堂 ID 获取详情数据 */
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
        .setIn(['status', 'getQuestionsByClassroomIdStatus'], 'succeed')
    },
    throw(state) {
      return state.setIn(['status', 'getQuestionsByClassroomIdStatus'], 'failed')
    },
  },
  /* 点击左侧边栏选择某一课程、课程组或课堂 */
  'APP/LIBRARY/SELECT_COURSE_OR_COURSE_GROUP_OR_CLASSROOM_ACTION': {
    next(state, action) {
      const id = lodash.get(action, 'payload.id')
      const name = lodash.get(action, 'payload.name')
      return state
        /* 在课程、课程组和课堂之间相互切换时，需要初始化与页面相关的状态标志位 */
        .mergeIn(['others'], fromJS({
          selectedCourseOrCourseGroupOrClassroom: {
            id,
            name,
          },
          currentNumber: 1,
          selectedAllQuestionItems: {},
          previewQuestionItem: {},
          selectedChapterId: null,
          searchText: null,
        }))
    },
    throw(state) {
      return state
    },
  },
  /* 翻页操作 */
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
  /* 选择指定章节作为筛选条件 */
  'APP/LIBRARY/SELECT_CHPATER_ACTION': {
    next(state, action) {
      const id = lodash.get(action, 'payload.id')
      return state
        .setIn(['others', 'selectedChapterId'], id)
        .setIn(['others', 'currentPageNumber'], 1)
        /* 因为要求可以跨章节选择，因此在指定章节作为筛选条件时，不将原来选中的内容删除 */
        // .setIn(['others', 'selectedAllQuestionItems'], fromJS({}))
    },
    throw(state) {
      return state
    },
  },
  /* 将输入的搜索内容作为筛选条件 */
  'APP/LIBRARY/FILTER_QUESTIONS_BY_SEARCH_ACTION': {
    next(state, action) {
      const searchText = lodash.get(action, 'payload.searchText')
      return state
        .setIn(['others', 'searchText'], searchText)
        .setIn(['others', 'currentPageNumber'], 1)
        /* 在指定输入内容作为筛选条件时，不将原来选中的内容删除 */
    },
    throw(state) {
      return state
    },
  },
  /* 删除某一筛选条件，可选的筛选条件有章节、搜索内容和手动选择 */
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
            .setIn(['others', 'selectedCurrentQuestionItems'], fromJS({}))
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
        if (state.getIn(['others', 'selectedAllQuestionItems']).has(id)) {
          return state
        }
        return state
          .updateIn(['others', 'selectedAllQuestionItems'], (value) => value.set(id, fromJS({
            id,
            name,
          })))
          .updateIn(['others', 'selectedCurrentQuestionItems'], (value) => value.set(id, fromJS({
            id,
            name,
          })))
      }
      return state
        .deleteIn(['others', 'selectedAllQuestionItems', id])
        .deleteIn(['others', 'selectedCurrentQuestionItems', id])
    },
    throw(state) {
      return state
    },
  },
  /* 将当前符合筛选条件的题目、组卷、课件全部选中 */
  'APP/LIBRARY/SELECT_ALL_QUESTIONITEMS_ACTION': {
    next(state, action) {
      /* allQuestionItems 已经是 immutable 对象了 */
      const allQuestionItems = lodash.get(action, 'payload.allQuestionItems')
      if (allQuestionItems.isEmpty()) {
        return state
          .updateIn(['others', 'selectedAllQuestionItems'], (value) => (
            state.getIn(['others', 'selectedCurrentQuestionItems']).reduce((result, item) => (
              result.delete(item)
            ), value)
          ))
          .setIn(['others', 'selectedCurrentQuestionItems'], allQuestionItems)
      }
      return state
        .mergeIn(['others', 'selectedAllQuestionItems'], allQuestionItems)
        .setIn(['others', 'selectedCurrentQuestionItems'], allQuestionItems)
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
  /* 初始化复制操作请求状态位 */
  'APP/LIBRARY/INITIAL_COPY_QUESTIONITEM_TO_LIBRARY_STATUS_ACTION': {
    next(state, action) {
      const status = lodash.get(action, 'payload.status')
      return state.setIn(['status', 'copyQuestionItemToLibraryStatus'], status)
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
        /* name 可以为 course、courseGroup、classroom 三个值 */
        /* targetId 可以为课程 ID、课程组 ID、课堂 ID */
        .setIn([name, targetId, 'newCopyedQuestionItemNumbers'], numbers)
        /* 清空已经选择的题目、组卷和课件集合 */
        .setIn(['others', 'selectedAllQuestionItems'], fromJS({}))
        .setIn(['others', 'selectedCurrentQuestionItems'], fromJS({}))
        .setIn(['status', 'copyQuestionItemToLibraryStatus'], 'succeed')
    },
    throw(state) {
      return state.setIn(['status', 'copyQuestionItemToLibraryStatus'], 'failed')
    },
  },
}, initialState)
