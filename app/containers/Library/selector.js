/**
 *
 * Library reducer
 *
 */

import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

const selectorDomain = (state) => state.library

/* 当前所有课程集合，包括我的课程集合和课程组中的课程集合 */
const coursesSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('courses') || null
)

/* 我的所有课程 ID 集合 */
const myCourseIdsSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('myCourseIds') || null
)

/* 我的所有课程集合 */
const myCoursesSelector = createSelector(
  coursesSelector,
  myCourseIdsSelector,
  (courses, myCourseIds) => {
    if (courses && myCourseIds) {
      return myCourseIds.reduce((result, value) => {
        return result.set(value, courses.get(value))
      }, fromJS({}))
    }
    return null
  }
)

/* 当前所有章节集合 */
const chaptersSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('chapters') || null
)

/* 当前所有课件集合 */
const coursewaresSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('coursewares') || null
)

/* 当前所有知识点集合 */
const labelsSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('labels') || null
)

/* 当前所有问题集合 */
const questionsSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('questions') || null
)

/* 当前所有组卷集合 */
const quizzesSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('quizzes') || null
)

/* 当前被选中的课程的 ID */
const selectedCourseIdSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.getIn(['others', 'selectedCourseId']) || null
)

/* 当前被选中的课程 */
const selectedCourseSelector = createSelector(
  myCoursesSelector,
  selectedCourseIdSelector,
  (myCourses, selectedCourseId) => {
    if (myCourses && selectedCourseId) {
      return myCourses.get(selectedCourseId)
    }
    return null
  }
)

/* 当前被选中的课程的章节集合 */
const selectedCourseChaptersSelector = createSelector(
  chaptersSelector,
  selectedCourseSelector,
  (chapters, selectedCourse) => {
    if (chapters && selectedCourse) {
      return selectedCourse.get('chapters').reduce((result, value) => {
        return result.set(value, chapters.get(value))
      }, fromJS({}))
    }
    return null
  }
)

/* 当前被选中的课程的课件集合 */
const selectedCourseCoursewaresSelector = createSelector(
  coursewaresSelector,
  selectedCourseSelector,
  (coursewares, selectedCourse) => {
    if (coursewares && selectedCourse) {
      return selectedCourse.get('coursewares').reduce((result, value) => {
        return result.set(value, coursewares.get(value))
      }, fromJS({}))
    }
    return null
  }
)

/* 当前所被选中的课程的识点集合 */
const selectedCourseLabelsSelector = createSelector(
  labelsSelector,
  selectedCourseSelector,
  (labels, selectedCourse) => {
    if (labels && selectedCourse) {
      return selectedCourse.get('labels').reduce((result, value) => {
        return result.set(value, labels.get(value))
      }, fromJS({}))
    }
    return null
  }
)

/* 当前被选中的课程的问题集合 */
const selectedCourseQuestionsSelector = createSelector(
  questionsSelector,
  selectedCourseSelector,
  (questions, selectedCourse) => {
    if (questions && selectedCourse) {
      return selectedCourse.get('questions').reduce((result, value) => {
        return result.set(value, questions.get(value))
      }, fromJS({}))
    }
    return null
  }
)

/* 当前被选中的课程的组卷集合 */
const selectedCourseQuizzesSelector = createSelector(
  quizzesSelector,
  selectedCourseSelector,
  (quizzes, selectedCourse) => {
    if (quizzes && selectedCourse) {
      return selectedCourse.get('quizzes').reduce((result, value) => {
        return result.set(value, quizzes.get(value))
      }, fromJS({}))
    }
    return null
  }
)

/* 当前页码 */
const currentPageNumberSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.getIn(['others', 'currentPageNumber']) || null
)

/* 导出最终的数据 */
const selector = createSelector(
  myCoursesSelector,
  selectedCourseChaptersSelector,
  selectedCourseCoursewaresSelector,
  selectedCourseLabelsSelector,
  selectedCourseQuestionsSelector,
  selectedCourseQuizzesSelector,
  currentPageNumberSelector,
  (
    myCourses,
    selectedCourseChapters,
    selectedCourseCoursewares,
    selectedCourseLabels,
    selectedCourseQuestions,
    selectedCourseQuizzes,
    currentPageNumber,
  ) => ({
    myCourses: myCourses ? myCourses.toJS() : null,
    selectedCourseChapters: selectedCourseChapters ? selectedCourseChapters.toJS() : null,
    selectedCourseCoursewares: selectedCourseCoursewares ? selectedCourseCoursewares.toJS() : null,
    selectedCourseLabels: selectedCourseLabels ? selectedCourseLabels.toJS() : null,
    selectedCourseQuestions: selectedCourseQuestions ? selectedCourseQuestions.toJS() : null,
    selectedCourseQuizzes: selectedCourseQuizzes ? selectedCourseQuizzes.toJS() : null,
    currentPageNumber,
  })
)

export default selector
