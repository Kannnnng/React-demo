/**
 *
 * Library actions
 *
 */

import { createAction } from 'redux-actions'
import {
  getMyAllCourses,
  getMyAllCourseGroups,
  getMyAllClassrooms,
  getQuestionsByCourseId,
} from './sources'

/* 获取个人所有课程 */
export const getMyAllCoursesAction = createAction(
  'APP/LIBRARY/GET_MY_ALL_COURSES_ACTION',
  getMyAllCourses,
)

/* 获取个人所有课程组 */
export const getMyAllCourseGroupsAction = createAction(
  'APP/LIBRARY/GET_MY_ALL_COURSE_GROUPS_ACTION',
  getMyAllCourseGroups,
)

/* 获取个人所有课堂 */
export const getMyAllClassroomsAction = createAction(
  'APP/LIBRARY/GET_MY_ALL_CLASSROOMS_ACTION',
  getMyAllClassrooms,
)

/* 获取课程 ID 获取所有题目，这其中也包括组卷、课件 */
export const getQuestionsByCourseIdAction = createAction(
  'APP/LIBRARY/GET_QUESTIONS_BY_COURSE_ID_ACTION',
  getQuestionsByCourseId,
)

/* 点击选择某一课程或课堂，课程可能是个人课程，也可能是课程组内的课程 */
export const selectCourseAction = createAction(
  'APP/LIBRARY/SELECT_COURSE_ACTION',
)

/* 翻页操作 */
export const pageNumberChangeAction = createAction(
  'APP/LIBRARY/PAGE_NUMBER_CHANGE_ACTION',
)

/* 选择某一章节作为筛选条件 */
export const selectChpaterAction = createAction(
  'APP/LIBRARY/SELECT_CHPATER_ACTION',
)

/* 输入文字作为筛选条件，筛选对象是题目的题干 */
export const filterQuestionsBySearchAction = createAction(
  'APP/LIBRARY/FILTER_QUESTIONS_BY_SEARCH_ACTION',
)

/* 删除某一筛选条件 */
export const deleteConditionAction = createAction(
  'APP/LIBRARY/DELETE_CONDITION_ACTION',
)

/* 选中或取消某一题目、组卷、课件 */
export const selectQuestionItemAction = createAction(
  'APP/LIBRARY/SELECT_QUESTIONITEM_ACTION',
)

/* 点击某一题目、组卷开始预览，没有课件，因为点击课件以后就直接跳转到课件的预览页面 */
export const previewQuestionItemAction = createAction(
  'APP/LIBRARY/PREVIEW_QUESTIONITEM_ACTION',
)
