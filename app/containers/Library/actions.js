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
