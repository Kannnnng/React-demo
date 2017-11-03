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
  getLibraryByLibraryId,
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

export const getLibraryByLibraryIdAction = createAction(
  'APP/LIBRARY/GET_LIBRARY_BY_LIBRARY_ID_ACTION',
  getLibraryByLibraryId,
)

