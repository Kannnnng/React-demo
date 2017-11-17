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
  copyQuestionItemToLibrary,
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

/* 初始化根据课程 ID、课程组 ID、课堂 ID 获取题目、组卷、课件的请求状态位，包括发起操作时将 */
/* 请求状态位置为 doing、操作完成时将请求状态位置为 succeed 或 failed 这两个功能 */
export const initialGetQuestionsByIdStatusAction = createAction(
  'APP/LIBRARY/INITIAL_GET_QUESTIONS_BY_ID_STATUS_ACTION',
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

/* 输入文字作为筛选条件，筛选对象是题目的题干、组卷的标题、课件的名字 */
export const filterQuestionsBySearchAction = createAction(
  'APP/LIBRARY/FILTER_QUESTIONS_BY_SEARCH_ACTION',
)

/* 显示当前所有选中的题目、组卷和课件 */
export const showAllSelectedQuestionItemsAction = createAction(
  'APP/LIBRARY/SHOW_ALL_SELECTED_QUESTIONITEMS_ACTION',
)

/* 删除某一筛选条件 */
export const deleteConditionAction = createAction(
  'APP/LIBRARY/DELETE_CONDITION_ACTION',
)

/* 选中或取消某一题目、组卷、课件 */
export const selectQuestionItemAction = createAction(
  'APP/LIBRARY/SELECT_QUESTIONITEM_ACTION',
)

/* 将当前符合筛选条件的题目、组卷、课件全部选中 */
export const selectAllQuestionItemsAction = createAction(
  'APP/LIBRARY/SELECT_ALL_QUESTIONITEMS_ACTION',
)

/* 点击某一题目、组卷开始预览，没有课件，因为点击课件以后就直接跳转到课件的预览页面 */
export const previewQuestionItemAction = createAction(
  'APP/LIBRARY/PREVIEW_QUESTIONITEM_ACTION',
)

/* 关闭预览页面 */
export const closePreviewQuestionItemAction = createAction(
  'APP/LIBRARY/CLOSE_PREVIEW_QUESTIONITEM_ACTION',
)

/* 初始化复制操作请求状态位，包括发起操作时将请求状态位置为 doing、操作完成时将请求状态位置为 */
/* succeed 或 failed 这两个功能 */
export const initialCopyQuestionItemToLibraryStatusAction = createAction(
  'APP/LIBRARY/INITIAL_COPY_QUESTIONITEM_TO_LIBRARY_STATUS_ACTION',
)

/* 将选中的题目、组卷和课件复制到指定的课程、课程组或课堂的指定章节中 */
export const copyQuestionItemToLibraryAction = createAction(
  'APP/LIBRARY/COPY_QUESTIONITEM_TO_LIBRARY_ACTION',
  copyQuestionItemToLibrary,
)
