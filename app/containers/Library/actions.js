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

export const getMyAllCoursesAction = createAction(
  'APP/LIBRARY/GET_MY_ALL_COURSES_ACTION',
  getMyAllCourses,
)

export const getMyAllCourseGroupsAction = createAction(
  'APP/LIBRARY/GET_MY_ALL_COURSE_GROUPS_ACTION',
  getMyAllCourseGroups,
)

export const getMyAllClassroomsAction = createAction(
  'APP/LIBRARY/GET_MY_ALL_CLASSROOMS_ACTION',
  getMyAllClassrooms,
)

export const getQuestionsByCourseIdAction = createAction(
  'APP/LIBRARY/GET_QUESTIONS_BY_COURSE_ID_ACTION',
  getQuestionsByCourseId,
)

export const selectCourseAction = createAction(
  'APP/LIBRARY/SELECT_COURSE_ACTION',
)

export const pageNumberChangeAction = createAction(
  'APP/LIBRARY/PAGE_NUMBER_CHANGE_ACTION',
)
