/**
 *
 * Library reducer
 *
 */

import { fromJS } from 'immutable'
import { createSelector } from 'reselect'
import {
  immutableObjectEmpty,
  immutableArrayEmpty,
  questionPattern,
} from 'utils/constants'

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

/* 当前所有章节集合 */
const chaptersSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('chapters') || immutableObjectEmpty
)

/* 我的所有课程集合 */
const myCoursesSelector = createSelector(
  coursesSelector,
  myCourseIdsSelector,
  chaptersSelector,
  (courses, myCourseIds, chapters) => {
    if (!courses.isEmpty() && !myCourseIds.isEmpty()) {
      return myCourseIds.reduce((result, value) => (
        result
          .set(value, courses
            .get(value)
            /* 这里将 chapters 恢复成对象嵌套结构是为了页面上的复制功能能够选择到某一章节 */
            .update('chapters', (chapterIds) => chapterIds.map((chapterId) => (
              chapters.get(chapterId) || immutableObjectEmpty
            )))
          )
      ), immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 我所属的所有课程组 */
const myCourseGroupsSelector = createSelector(
  courseGroupsSelector,
  myCourseGroupIdsSelector,
  chaptersSelector,
  (courseGroups, myCourseGroupIds, chapters) => {
    if (!courseGroups.isEmpty() && !myCourseGroupIds.isEmpty()) {
      return myCourseGroupIds.reduce((result, value) => (
        result
          .set(value, courseGroups
            .get(value)
            /* 这里将 chapters 恢复成对象嵌套结构是为了页面上的复制功能能够选择到某一章节 */
            .update('chapters', (chapterIds) => chapterIds.map((chapterId) => (
              chapters.get(chapterId) || immutableObjectEmpty
            )))
          )
      ), immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 我的所有课堂集合 */
const myClassroomsSelector = createSelector(
  classroomsSelector,
  myClassroomIdsSelector,
  chaptersSelector,
  (classrooms, myClassroomIds, chapters) => {
    if (!classrooms.isEmpty() && !myClassroomIds.isEmpty()) {
      return myClassroomIds.reduce((result, value) => (
        result
          .set(value, classrooms
            .get(String(value))
            .update('chapters', (chapterIds) => chapterIds.map((chapterId) => (
              chapters.get(chapterId) || immutableObjectEmpty
            )))
          )
      ), immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
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
          return myClassrooms.isEmpty() ? immutableObjectEmpty : myClassrooms.get(Number(id))
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
    if (!chapters.isEmpty() && !selectedItems.isEmpty() && selectedItems.get('chapters')) {
      return selectedItems.get('chapters')
    }
    return immutableArrayEmpty
  }
)

/* 转换为数组结构且根据 rank 属性经过排序以后的章节信息 */
const convertChaptersToListSelector = createSelector(
  selectedCourseChaptersSelector,
  (selectedCourseChapters) => {
    return selectedCourseChapters.sort((prev, next) => {
      if (prev && next) {
        return prev.get('rank') - prev.get('rank')
      }
      return 0
    })
  }
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
      return selectedCourseChapters.find((value) => value.get('id') === selectedChapterId) || immutableObjectEmpty
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
    /* 因为复制按钮要事先知道课程、课程组和课堂中包含的章节，所以最先返回的章节信息中仅有基本信息 */
    /* 不包含有属于本章节的题目、组卷和课件，因此这里的 coursewares、questions 和 quizzes */
    /* 可能是空的，需要进行判断，只需要判断其中一个就好了，因为三个数据是同时被返回的 */
    if (!selectedChapters.isEmpty() && selectedChapters.get('coursewares')) {
      result = selectedChapters
        .get('coursewares')
        .concat(selectedChapters.get('questions'))
        .concat(selectedChapters.get('quizzes'))
        .reduce((tempResult, value) =>{
          const questionItem = result.get(value)
          if (questionItem) {
            return tempResult.set(value, questionItem)
          }
          return tempResult
        }, fromJS({}))
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

/* 当前选中的题目、组卷、课件 ID 集合 */
const selectedQuestionItemIdsSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.getIn(['others', 'selectedQuestionItemIds']) || immutableObjectEmpty
)

/* 当前已经设置的筛选条件 */
const searchConditionsSelector = createSelector(
  selectedChaptersSelector,
  searchTextSelector,
  selectedQuestionItemIdsSelector,
  (selectedChapters, searchText, selectedQuestionItemIds) => {
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
    if (!selectedQuestionItemIds.isEmpty()) {
      result.push({
        name: 'select',
        value: `手动选择(${selectedQuestionItemIds.size})`,
      })
    }
    return fromJS(result)
  }
)

/* 当前需要显示预览的题目、组卷信息 */
const previewQuestionItemSelector = createSelector(
  selectorDomain,
  questionsSelector,
  quizzesSelector,
  chaptersSelector,
  (selectorDomain, questions, quizzes, chapters) => {
    const previewQuestionItem = selectorDomain.getIn(['others', 'previewQuestionItem']) || immutableObjectEmpty
    if (!previewQuestionItem.isEmpty()) {
      const id = previewQuestionItem.get('id')
      const name = previewQuestionItem.get('name')
      switch (name) {
        case 'question':
          if (questions.getIn([id, 'pattern']) === questionPattern.group) {
            return questions
              .get(id)
              .update('labels', (value) => value.map((item) => chapters.get(item)))
              .update('subQuestions', (value) => value.map((item) => {
                const tempsubSubQuestion = questions.get(item)
                return tempsubSubQuestion.set('answer', fromJS({
                  items: tempsubSubQuestion.get('items'),
                  correctAnswer: tempsubSubQuestion.get('correctAnswer'),
                }))
              }))
          }
          return questions
            .get(id)
            .update('labels', (value) => value.map((item) => chapters.get(item)))
        case 'quiz':
          return quizzes
            .get(id)
            .set('isQuiz', true)
            .update('subQuestions', (value) => value.map((item) => {
              const question = questions.get(item)
              if (question.get('pattern') === questionPattern.group) {
                return question
                  .update('subQuestions', (subSubQestions) => subSubQestions.map((subSubQestion) => {
                    const tempsubSubQuestion = questions.get(subSubQestion)
                    return tempsubSubQuestion.set('answer', fromJS({
                      items: tempsubSubQuestion.get('items'),
                      correctAnswer: tempsubSubQuestion.get('correctAnswer'),
                    }))
                  }))
              }
              return question.set('answer', fromJS({
                items: question.get('items'),
                correctAnswer: question.get('correctAnswer'),
              }))
            }))
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
  myCoursesSelector,
  myCourseGroupsSelector,
  myClassroomsSelector,
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
    myCourses,
    myCourseGroups,
    myClassrooms,
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
    myCourses,
    myCourseGroups,
    myClassrooms,
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
