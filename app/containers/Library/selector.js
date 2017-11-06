/**
 *
 * Library reducer
 *
 */

import { createSelector } from 'reselect'
import { immutableObjectEmpty } from 'utils/constants'

const selectorDomain = (state) => state.get('library')

/* 当前所有课程集合，包括我的课程集合和课程组中的课程集合 */
const coursesSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('courses') || immutableObjectEmpty
)

/* 我的所有课程 ID 集合 */
const myCourseIdsSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('myCourseIds') || immutableObjectEmpty
)

/* 我的所有课程集合 */
const myCoursesSelector = createSelector(
  coursesSelector,
  myCourseIdsSelector,
  (courses, myCourseIds) => {
    if (courses && myCourseIds) {
      return myCourseIds.reduce((result, value) => {
        return result.set(value, courses.get(value))
      }, immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 当前所有章节集合 */
const chaptersSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('chapters') || immutableObjectEmpty
)

/* 当前所有课件集合 */
const coursewaresSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('coursewares') || immutableObjectEmpty
)

/* 当前所有知识点集合 */
const labelsSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('labels') || immutableObjectEmpty
)

/* 当前所有问题集合 */
const questionsSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('questions') || immutableObjectEmpty
)

/* 当前所有组卷集合 */
const quizzesSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('quizzes') || immutableObjectEmpty
)

/* 当前被选中的课程的 ID */
const selectedCourseIdSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.getIn(['others', 'selectedCourseId']) || immutableObjectEmpty
)

/* 当前被选中的课程 */
const selectedCourseSelector = createSelector(
  myCoursesSelector,
  selectedCourseIdSelector,
  (myCourses, selectedCourseId) => {
    if (myCourses && selectedCourseId) {
      return myCourses.get(selectedCourseId)
    }
    return immutableObjectEmpty
  }
)

/* 当前被选中的课程的章节集合 */
const selectedCourseChaptersSelector = createSelector(
  chaptersSelector,
  selectedCourseSelector,
  (chapters, selectedCourse) => {
    if (chapters && selectedCourse && selectedCourse.get('chapters')) {
      return selectedCourse.get('chapters').reduce((result, value) => {
        return result.set(value, chapters.get(value))
      }, immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 当前被选中的课程的课件集合 */
const selectedCourseCoursewaresSelector = createSelector(
  coursewaresSelector,
  selectedCourseSelector,
  (coursewares, selectedCourse) => {
    if (coursewares && selectedCourse && selectedCourse.get('coursewares')) {
      return selectedCourse.get('coursewares').reduce((result, value) => {
        return result.set(value, coursewares.get(value))
      }, immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 当前所被选中的课程的识点集合 */
const selectedCourseLabelsSelector = createSelector(
  labelsSelector,
  selectedCourseSelector,
  (labels, selectedCourse) => {
    if (labels && selectedCourse && selectedCourse.get('labels')) {
      return selectedCourse.get('labels').reduce((result, value) => {
        return result.set(value, labels.get(value))
      }, immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 当前被选中的课程的问题集合 */
const selectedCourseQuestionsSelector = createSelector(
  questionsSelector,
  selectedCourseSelector,
  (questions, selectedCourse) => {
    if (questions && selectedCourse && selectedCourse.get('questions')) {
      return selectedCourse.get('questions').reduce((result, value) => {
        return result.set(value, questions.get(value))
      }, immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 当前被选中的课程的组卷集合 */
const selectedCourseQuizzesSelector = createSelector(
  quizzesSelector,
  selectedCourseSelector,
  (quizzes, selectedCourse) => {
    if (quizzes && selectedCourse && selectedCourse.get('quizzes')) {
      return selectedCourse.get('quizzes').reduce((result, value) => {
        return result.set(value, quizzes.get(value))
      }, immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 当前页码 */
const currentPageNumberSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.getIn(['others', 'currentPageNumber']) || immutableObjectEmpty
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
    myCourses,
    selectedCourseChapters,
    selectedCourseCoursewares,
    selectedCourseLabels,
    selectedCourseQuestions,
    selectedCourseQuizzes,
    currentPageNumber,
  })
)

export default selector
