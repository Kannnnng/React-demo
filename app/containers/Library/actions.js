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
  getQuestionsByCourseGroupId,
  getQuestionsByClassroomId,
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

/* 根据课程 ID 获取所有题目，这其中包括单题、组卷、课件 */
export const getQuestionsByCourseIdAction = createAction(
  'APP/LIBRARY/GET_QUESTIONS_BY_COURSE_ID_ACTION',
  getQuestionsByCourseId,
)

/* 根据课程组 ID 获取课程组中所有题目，这其中包括单题、组卷、课件 */
export const getQuestionsByCourseGroupIdAction = createAction(
  'APP/LIBRARY/GET_QUESTIONS_BY_COURSE_GROUP_ID_ACTION',
  getQuestionsByCourseGroupId,
)

/* 根据课堂 ID 获取课堂中所有题目，这其中包括单题、组卷、课件 */
export const getQuestionsByClassroomIdAction = createAction(
  'APP/LIBRARY/GET_QUESTIONS_BY_CLASSROOM_ID_ACTION',
  getQuestionsByClassroomId,
)

/* 点击选择某一课程 */
export const selectCourseOrCourseGroupOrClassroomAction = createAction(
  'APP/LIBRARY/SELECT_COURSE_OR_COURSE_GROUP_OR_CLASSROOM_ACTION',
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

/* 关闭预览页面 */
export const closePreviewQuestionItemAction = createAction(
  'APP/LIBRARY/CLOSE_PREVIEW_QUESTIONITEM_ACTION',
)
