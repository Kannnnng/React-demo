/**
 *
 * Library reducer
 *
 */

import { fromJS } from 'immutable'
import { createSelector } from 'reselect'
import { immutableObjectEmpty, immutableArrayEmpty } from 'utils/constants'

const selectorDomain = (state) => state.get('library')

/* 当前教师的个人信息 */
const myInfomationSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('mine') || immutableObjectEmpty
)

/* 当前所有课程集合，包括我的课程集合和课程组中的课程集合 */
const coursesSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('courses') || immutableObjectEmpty
)

/* 当前所有课程组集合 */
const courseGroupsSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('courseGroups') || immutableObjectEmpty
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

/* 我的所有课程组 ID 集合 */
const myCourseGroupIdsSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('myCourseGroupIds') || immutableArrayEmpty
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
      return myCourseIds.reduce((result, value) => (
        result.set(value, courses.get(value))
      ), immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 我所属的所有课程组 */
const myCourseGroupsSelector = createSelector(
  courseGroupsSelector,
  myCourseGroupIdsSelector,
  (courseGroups, myCourseGroupIds) => {
    if (!courseGroups.isEmpty() && !myCourseGroupIds.isEmpty()) {
      return myCourseGroupIds.reduce((result, value) => (
        result.set(value, courseGroups.get(value))
      ), immutableObjectEmpty)
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
      return myClassroomIds.reduce((result, value) => (
        result.set(value, classrooms.get(String(value)))
      ), immutableObjectEmpty)
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

/* 当前被选中的课程、课程组或课堂 */
const selectedCourseOrCourseGroupOrClassroomSelector = createSelector(
  selectorDomain,
  myCoursesSelector,
  myCourseGroupsSelector,
  myClassroomsSelector,
  (selectorDomain, myCourses, myCourseGroups, myClassrooms) => {
    if (!selectorDomain.isEmpty()) {
      const id = selectorDomain.getIn(['others', 'selectedCourseOrCourseGroupOrClassroom', 'id'])
      const name = selectorDomain.getIn(['others', 'selectedCourseOrCourseGroupOrClassroom', 'name'])
      switch (name) {
        case 'course':
          return myCourses.isEmpty() ? immutableObjectEmpty : myCourses.get(id)
        case 'courseGroup':
          return myCourseGroups.isEmpty() ? immutableObjectEmpty : myCourseGroups.get(id)
        case 'classroom':
          return myClassrooms.isEmpty() ? immutableObjectEmpty : myClassrooms.get(id)
        default:
          return immutableObjectEmpty
      }
    }
    return immutableObjectEmpty
  }
)

/* 当前被选中的课程的章节集合 */
const selectedCourseChaptersSelector = createSelector(
  chaptersSelector,
  selectedCourseOrCourseGroupOrClassroomSelector,
  (chapters, selectedItems) => {
    console.log(selectedItems.toJS(), 123)
    if (!chapters.isEmpty() && !selectedItems.isEmpty() && selectedItems.get('chapters')) {
      return selectedItems.get('chapters').reduce((result, value) => {
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
  selectedCourseOrCourseGroupOrClassroomSelector,
  (labels, selectedItems) => {
    if (!labels.isEmpty() && !selectedItems.isEmpty() && selectedItems.get('labels')) {
      return selectedItems.get('labels').reduce((result, value) => {
        return result.set(value, labels.get(value))
      }, immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 当前被选中的课程的课件集合 */
const selectedCourseCoursewaresSelector = createSelector(
  coursewaresSelector,
  selectedCourseOrCourseGroupOrClassroomSelector,
  (coursewares, selectedItems) => {
    if (!coursewares.isEmpty() && !selectedItems.isEmpty() && selectedItems.get('coursewares')) {
      return selectedItems.get('coursewares').reduce((result, value) => {
        return result.set(value, coursewares.get(value).set('isCourseware', true))
      }, immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 当前被选中的课程的题目集合 */
const selectedCourseQuestionsSelector = createSelector(
  questionsSelector,
  selectedCourseOrCourseGroupOrClassroomSelector,
  (questions, selectedItems) => {
    if (!questions.isEmpty() && !selectedItems.isEmpty() && selectedItems.get('questions')) {
      return selectedItems.get('questions').reduce((result, value) => {
        return result.set(value, questions.get(value))
      }, immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 当前被选中的课程的组卷集合 */
const selectedCourseQuizzesSelector = createSelector(
  quizzesSelector,
  selectedCourseOrCourseGroupOrClassroomSelector,
  (quizzes, selectedItems) => {
    if (!quizzes.isEmpty() && !selectedItems.isEmpty() && selectedItems.get('quizzes')) {
      return selectedItems.get('quizzes').reduce((result, value) => {
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

/* 当前需要显示预览的题目、组卷信息 */
const previewQuestionItemSelector = createSelector(
  selectorDomain,
  questionsSelector,
  quizzesSelector,
  (selectorDomain, questions, quizzes) => {
    const previewQuestionItem = selectorDomain.getIn(['others', 'previewQuestionItem']) || immutableObjectEmpty
    if (!previewQuestionItem.isEmpty()) {
      const id = previewQuestionItem.get('id')
      const name = previewQuestionItem.get('name')
      switch (name) {
        case 'question':
          return questions.get(id)
        case 'quiz':
          return quizzes
            .get(id)
            .set('isQuiz', true)
            .update('subs', (value) => value.map((item) => questions.get(item)))
        default:
          return immutableObjectEmpty
      }
    }
    return immutableObjectEmpty
  }
)

/* 导出最终的数据 */
const selector = createSelector(
  myInfomationSelector,
  myClassroomsSelector,
  myCoursesSelector,
  myCourseGroupsSelector,
  convertChaptersToListSelector,
  selectedCourseLabelsSelector,
  pagedSelectedQuestionsAndQuizzesAndCoursewaresSelector,
  searchConditionsSelector,
  totalPagesSelector,
  currentPageNumberSelector,
  selectedQuestionItemIdsSelector,
  previewQuestionItemSelector,
  (
    myInfomation,
    myClassrooms,
    myCourses,
    myCourseGroups,
    selectedCourseChapters,
    selectedCourseLabels,
    questionItems,
    searchConditions,
    totalPages,
    currentPageNumber,
    selectedQuestionItemIds,
    previewQuestionItem,
  ) => ({
    myInfomation,
    myClassrooms,
    myCourses,
    myCourseGroups,
    selectedCourseChapters,
    selectedCourseLabels,
    questionItems,
    searchConditions,
    totalPages,
    currentPageNumber,
    selectedQuestionItemIds,
    previewQuestionItem,
  })
)

export default selector
