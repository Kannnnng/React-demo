/**
 *
 * Library reducer
 *
 */

import { fromJS } from 'immutable'
import { createSelector } from 'reselect'
import { immutableObjectEmpty, immutableArrayEmpty } from 'utils/constants'

const selectorDomain = (state) => state.get('library')

/* 当前所有课程集合，包括我的课程集合和课程组中的课程集合 */
const coursesSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('courses') || immutableObjectEmpty
)

/* 当前所有课堂集合，因为课程组中不包含课堂，因此当前所有课堂理论上来说应该全部都是我的 */
const classroomsSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('classrooms') || immutableObjectEmpty
)

/* 我的所有课程 ID 集合 */
const myCourseIdsSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('myCourseIds') || immutableArrayEmpty
)

/* 我的所有课堂 ID 集合 */
const myClassroomIdsSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('myClassroomIds') || immutableArrayEmpty
)

/* 我的所有课程集合 */
const myCoursesSelector = createSelector(
  coursesSelector,
  myCourseIdsSelector,
  (courses, myCourseIds) => {
    if (!courses.isEmpty() && !myCourseIds.isEmpty()) {
      return myCourseIds.reduce((result, value) => {
        return result.set(value, courses.get(value))
      }, immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 我的所有课堂集合 */
const myClassroomsSelector = createSelector(
  classroomsSelector,
  myClassroomIdsSelector,
  (classrooms, myClassroomIds) => {
    if (!classrooms.isEmpty() && !myClassroomIds.isEmpty()) {
      return myClassroomIds.reduce((result, value) => {
        return result.set(value, classrooms.get(String(value)))
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
  (selectorDomain) => selectorDomain.getIn(['others', 'selectedCourseId']) || null
)

/* 当前被选中的课程 */
const selectedCourseSelector = createSelector(
  myCoursesSelector,
  selectedCourseIdSelector,
  (myCourses, selectedCourseId) => {
    if (!myCourses.isEmpty() && selectedCourseId) {
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
    if (!chapters.isEmpty() && !selectedCourse.isEmpty() && selectedCourse.get('chapters')) {
      return selectedCourse.get('chapters').reduce((result, value) => {
        return result.set(value, chapters.get(value))
      }, immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 转换为数组结构且根据 rank 属性经过排序以后的章节信息 */
const convertChaptersToListSelector = createSelector(
  selectedCourseChaptersSelector,
  (selectedCourseChapters) => selectedCourseChapters.toList().sort((prev, next) => {
    if (prev && next) {
      return prev.get('rank') - prev.get('rank')
    }
    return 0
  })
)

/* 当前所被选中的课程的知识点集合 */
const selectedCourseLabelsSelector = createSelector(
  labelsSelector,
  selectedCourseSelector,
  (labels, selectedCourse) => {
    if (!labels.isEmpty() && !selectedCourse.isEmpty() && selectedCourse.get('labels')) {
      return selectedCourse.get('labels').reduce((result, value) => {
        return result.set(value, labels.get(value))
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
    if (!coursewares.isEmpty() && !selectedCourse.isEmpty() && selectedCourse.get('coursewares')) {
      return selectedCourse.get('coursewares').reduce((result, value) => {
        return result.set(value, coursewares.get(value).set('isCourseware', true))
      }, immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 当前被选中的课程的题目集合 */
const selectedCourseQuestionsSelector = createSelector(
  questionsSelector,
  selectedCourseSelector,
  (questions, selectedCourse) => {
    if (!questions.isEmpty() && !selectedCourse.isEmpty() && selectedCourse.get('questions')) {
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
    if (!quizzes.isEmpty() && !selectedCourse.isEmpty() && selectedCourse.get('quizzes')) {
      return selectedCourse.get('quizzes').reduce((result, value) => {
        return result.set(value, quizzes.get(value).set('isQuiz', true))
      }, immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 当前被选中作为筛选条件的章节 */
const selectedChaptersSelector = createSelector(
  selectorDomain,
  selectedCourseChaptersSelector,
  (selectorDomain, selectedCourseChapters) => {
    if (!selectorDomain.isEmpty() && !selectedCourseChapters.isEmpty()) {
      const selectedChapterId = selectorDomain.getIn(['others', 'selectedChapterId'])
      return selectedCourseChapters.get(selectedChapterId) || immutableObjectEmpty
    }
    return immutableObjectEmpty
  }
)

/* 当前搜索的内容 */
const searchTextSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.getIn(['others', 'searchText']) || null
)

/* 经过筛选后显示在页面上的当前被选中课程的题目、组卷、课件集合 */
const selectedQuestionsAndQuizzesAndCoursewaresSelector = createSelector(
  selectedCourseCoursewaresSelector,
  selectedCourseQuestionsSelector,
  selectedCourseQuizzesSelector,
  selectedChaptersSelector,
  searchTextSelector,
  (coursewares, questions, quizzes, selectedChapters, searchText) => {
    let result
    if (searchText) {
      result = coursewares
        .filter((value) => value.get('name').includes(searchText))
        .merge(questions.filter((value) => value.getIn(['content', 'html']).includes(searchText)))
        .merge(quizzes.filter((value) => value.get('title').includes(searchText)))
    } else {
      result = coursewares.merge(questions).merge(quizzes)
    }
    if (!selectedChapters.isEmpty()) {
      result = result.filter((value) => selectedChapters.get('id') === value.get('chapterId'))
    }
    return result
  }
)

/* 按照每页显示 10 个条目的规则所计算出的所有的页数 */
const totalPagesSelector = createSelector(
  selectedQuestionsAndQuizzesAndCoursewaresSelector,
  (selectedQuestionsAndQuizzesAndCoursewares) => {
    /* 至少应该显示一页 */
    return Math.ceil(selectedQuestionsAndQuizzesAndCoursewares.size / 10) || 1
  }
)

/* 当前页码 */
const currentPageNumberSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.getIn(['others', 'currentPageNumber']) || null
)

/* 经过分页以后显示在页面上的当前被选中课程的题目、组卷、课件集合 */
const pagedSelectedQuestionsAndQuizzesAndCoursewaresSelector = createSelector(
  selectedQuestionsAndQuizzesAndCoursewaresSelector,
  currentPageNumberSelector,
  (selectedQuestionsAndQuizzesAndCoursewares, currentPageNumber) => {
    const begin = (currentPageNumber - 1) * 10
    const end = begin + 10
    return selectedQuestionsAndQuizzesAndCoursewares.slice(begin, end)
  }
)

/* 当前已经设置的筛选条件 */
const searchConditionsSelector = createSelector(
  selectedChaptersSelector,
  searchTextSelector,
  (selectedChapters, searchText) => {
    const result = []
    if (!selectedChapters.isEmpty()) {
      result.push({
        name: 'chapter',
        value: selectedChapters.get('name'),
      })
    }
    if (searchText) {
      result.push({
        name: 'search',
        value: searchText,
      })
    }
    return fromJS(result)
  }
)

/* 当前选中的题目、组卷、课件 ID 集合 */
const selectedQuestionItemIdsSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.getIn(['others', 'selectedQuestionItemIds']) || immutableArrayEmpty
)

/* 导出最终的数据 */
const selector = createSelector(
  myClassroomsSelector,
  myCoursesSelector,
  convertChaptersToListSelector,
  selectedCourseLabelsSelector,
  pagedSelectedQuestionsAndQuizzesAndCoursewaresSelector,
  searchConditionsSelector,
  totalPagesSelector,
  currentPageNumberSelector,
  selectedQuestionItemIdsSelector,
  (
    myClassrooms,
    myCourses,
    selectedCourseChapters,
    selectedCourseLabels,
    questionItems,
    searchConditions,
    totalPages,
    currentPageNumber,
    selectedQuestionItemIds,
  ) => ({
    myClassrooms,
    myCourses,
    selectedCourseChapters,
    selectedCourseLabels,
    questionItems,
    searchConditions,
    totalPages,
    currentPageNumber,
    selectedQuestionItemIds,
  })
)

export default selector
