/**
 *
 * Library reducer
 *
 */

import moment from 'moment'
import { fromJS } from 'immutable'
import { createSelector } from 'reselect'
import {
  immutableArrayEmpty,
  immutableObjectEmpty,
  questionPattern,
} from 'utils/constants'

const selectorDomain = (state) => state.get('library')

/* 当前教师的个人信息 */
const myInfomationSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('mine') || immutableObjectEmpty
)

/* 当前所有课程集合 */
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
              chapters.get(chapterId)
            )))
          )
      ), immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
)

/* 我参与的所有课程组 */
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
              chapters.get(chapterId)
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
            /* 真是莫名其妙，课堂接口返回的数据中 ID 竟然是数字类型，需要将其转换为字符串类型 */
            /* 才能通过 get 方法获取数据 */
            .get(String(value))
            /* 这里将 chapters 恢复成对象嵌套结构是为了页面上的复制功能能够选择到某一章节 */
            .update('chapters', (chapterIds) => chapterIds.map((chapterId) => (
              chapters.get(chapterId)
            )))
          )
      ), immutableObjectEmpty)
    }
    return immutableObjectEmpty
  }
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
      /* name 表示当前选中的是课程、课程组还是课堂 */
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

/* 当前被选中的课程、课程组或课堂的名称 */
const selectedCourseOrCourseGroupOrClassroomNameSelector = createSelector(
  selectedCourseOrCourseGroupOrClassroomSelector,
  (selectedCourseOrCourseGroupOrClassroom) => (
    selectedCourseOrCourseGroupOrClassroom.get('name') ||
    selectedCourseOrCourseGroupOrClassroom.get('groupName')
  )
)

/* 当前被选中的课程、课程组或课堂中的章节集合 */
/* 因为在前面的 selector 中已经将课程、课程组和课堂中的章节恢复了，因此在这里不必要在使用 */
/* chaptersSelector */
/* 因为要求按照指定顺序显示，因此需要按照章节中的 rank 属性排序 */
const selectedCourseChaptersSelector = createSelector(
  selectedCourseOrCourseGroupOrClassroomSelector,
  (selectedItems) => {
    if (!selectedItems.isEmpty() && selectedItems.get('chapters')) {
      return selectedItems.get('chapters').sort((prev, next) => {
        if (prev && next) {
          return prev.get('rank') - prev.get('rank')
        }
        return 0
      })
    }
    return immutableArrayEmpty
  }
)

/* 当前所被选中的课程的知识点集合 */
/* 当前被选中的课程、课程组或课堂中的知识点没有恢复，因此需要借助 labelsSelector 恢复知识点信息  */
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
/* 因为被选为筛选条件的章节一定是当前被选中的课程、课程组或课堂中所包含的章节，因此可以直接使用 */
/* selectedCourseChaptersSelector */
const selectedChapterSelector = createSelector(
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

/* 当前设置的项目类型筛选条件，默认全部显示，即题目、组卷和课件 */
const selectedQuestionItemTypesSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.getIn(['others', 'selectedQuestionItemTypes']) || immutableObjectEmpty
)

/* 当前课程、课程组或课堂中选定的所有题目、组卷和课件集合，每个对象存有其 ID 和 name 属性 */
const selectedAllQuestionItemsSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.getIn(['others', 'selectedAllQuestionItems']) || immutableObjectEmpty
)

/* 仅显示当前所有选中的题目、组卷和课件的状态标志位 */
const isShowAllSelectedQuestionItemsSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.getIn(['others', 'isShowAllSelectedQuestionItems']) || false
)

/* 经过筛选后显示在页面上的当前被选中课程的题目、组卷、课件集合 */
const selectedQuestionsAndQuizzesAndCoursewaresSelector = createSelector(
  selectedCourseCoursewaresSelector,
  selectedCourseQuestionsSelector,
  selectedCourseQuizzesSelector,
  selectedChapterSelector,
  searchTextSelector,
  selectedQuestionItemTypesSelector,
  isShowAllSelectedQuestionItemsSelector,
  selectedAllQuestionItemsSelector,
  (
    tempCoursewares,
    tempQuestions,
    tempQuizzes,
    selectedChapter,
    searchText,
    selectedQuestionItemTypes,
    isShowAllSelectedQuestionItems,
    selectedAllQuestionItems,
  ) => {
    const coursewares = selectedQuestionItemTypes.get('courseware') ? tempCoursewares : immutableObjectEmpty
    const questions = selectedQuestionItemTypes.get('question') ? tempQuestions : immutableObjectEmpty
    const quizzes = selectedQuestionItemTypes.get('quiz') ? tempQuizzes : immutableObjectEmpty
    let result
    /* 如果要求仅显示当前选中的题目、组卷和课件，则章节筛选条件和搜索筛选条件均不生效 */
    if (isShowAllSelectedQuestionItems) {
      /* 如果当前没有选中任何题目、组卷和课件，则直接返回空 Map */
      if (selectedAllQuestionItems.isEmpty()) {
        return immutableObjectEmpty.toOrderedMap()
      }
      result = selectedAllQuestionItems.reduce((tempResultresult, value, key) => {
        /* 根据当前选中的项目类型，分别从题目、组卷和课件集合中获取各自的数据 */
        const questionItem = (
          (value.get('name') === 'courseware' && coursewares.get(key)) ||
          (value.get('name') === 'quiz' && quizzes.get(key)) ||
          (value.get('name') === 'question' && questions.get(key))
        )
        /* 如果获取到了有效数据，则放入结果中 */
        if (questionItem) {
          return tempResultresult.set(key, questionItem)
        }
        /* 没有获取到有效数据，直接返回原有结果 */
        return tempResultresult
      }, immutableObjectEmpty)
    } else {
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
      if (!selectedChapter.isEmpty() && selectedChapter.get('coursewares')) {
        result = selectedChapter
          .get('coursewares')
          .concat(selectedChapter.get('questions'))
          .concat(selectedChapter.get('quizzes'))
          .reduce((tempResult, value) =>{
            /* value 是当前被选中作为筛选条件的章节中所包含的题目、组卷或课件的 ID，如果能够从 */
            /* 当前被选中的课程、课程组或课堂中获取到该 ID 所对应的题目、组卷或课件的数据，那么 */
            /* 就说明该 ID 所对应的题目、组卷或课件隶属于当前被选中作为筛选条件的章节中 */
            const questionItem = result.get(value)
            if (questionItem) {
              return tempResult.set(value, questionItem)
            }
            return tempResult
          }, immutableObjectEmpty)
      }
    }
    /* 如果题目、组卷、课件存在创建时间 createTime 这个字段，则按照降序排序，最近创建的在最前面 */
    /* 没有 createTime 字段的数据在最后面 */
    return result.sort((prev, next) => {
      if (prev && next) {
        const prevCreateTime = prev.get('createTime')
        const nextCreateTime = next.get('createTime')
        if (!prevCreateTime && !nextCreateTime) {
          return 0
        } else if (prevCreateTime && !nextCreateTime) {
          return -1
        } else if (!prevCreateTime && nextCreateTime) {
          return 1
        }
        return moment(prevCreateTime).isAfter(nextCreateTime) ? -1 : 1
      }
      return 0
    })
  }
)

/* 当前课程、课程组或课堂中经过筛选后显示在页面上的被选中的所有题目、组卷和课件集合 */
const selectedCurrentQuestionItemsSelector = createSelector(
  selectedAllQuestionItemsSelector,
  selectedQuestionsAndQuizzesAndCoursewaresSelector,
  (selectedAllQuestionItems, selectedQuestionsAndQuizzesAndCoursewares) => {
    if (!selectedAllQuestionItems.isEmpty() && !selectedQuestionsAndQuizzesAndCoursewares.isEmpty()) {
      return selectedQuestionsAndQuizzesAndCoursewares.reduce((result, value, key) => (
        !selectedAllQuestionItems.has(key) ? result : result.set(key, selectedAllQuestionItems.get(key))
      ), immutableObjectEmpty)
    }
    return immutableObjectEmpty
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
  (selectorDomain) => selectorDomain.getIn(['others', 'currentPageNumber']) || 1
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
  selectedChapterSelector,
  searchTextSelector,
  selectedAllQuestionItemsSelector,
  (selectedChapter, searchText, selectedAllQuestionItems) => {
    const result = []
    if (!selectedChapter.isEmpty()) {
      result.push({
        /* 按照整个章节复制时需要知道被复制章节的 ID */
        id: selectedChapter.get('id'),
        name: 'chapter',
        value: selectedChapter.get('name'),
        /* 在 CurrentChoice 组件中，需要得知当前被选中作为筛选条件的章节中所包含的题目、组卷 */
        /* 课件的总数，然后与当前用于选中的题目、组卷、课件数量做比较，如果相同，则提示用户是否 */
        /* 需要将整个章节（包含章节信息和章节中题目信息）全部复制， */
        /* 章节信息中可能不包含题目、组卷、课件信息，因此获取各自的 size 时需要判断一下 */
        number: (
          ((selectedChapter.get('coursewares') && selectedChapter.get('coursewares').size) || 0) +
          ((selectedChapter.get('questions') && selectedChapter.get('questions').size) || 0) +
          ((selectedChapter.get('quizzes') && selectedChapter.get('quizzes').size) || 0)
        ),
      })
    }
    if (searchText) {
      result.push({
        name: 'search',
        value: searchText,
      })
    }
    if (!selectedAllQuestionItems.isEmpty()) {
      result.push({
        name: 'select',
        value: selectedAllQuestionItems.size,
      })
    }
    return fromJS(result)
  }
)

/* 当前需要显示预览的题目、组卷信息 */
/* 这部分比较麻烦，需要恢复题目、组卷、课件的知识点、题目中的题组、组卷、组卷中的题组它们各自的 */
/* 单题也恢复出来 */
/* 另外，题目预览组件中需要的 answer 数据在后端返回的数据结构中是没有的，因此需要自行拼凑起来 */
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

/* 获取异步请求的状态标志位 */
const statusSelector = createSelector(
  selectorDomain,
  (selectorDomain) => selectorDomain.get('status') || immutableObjectEmpty
)

/* 计算出用户需要确定哪些章节将整体拷贝（带章节信息） */
const needDecideCopyEntireChapterMapSelector = createSelector(
  selectedAllQuestionItemsSelector,
  selectedCourseChaptersSelector,
  (selectedAllQuestionItems, selectedCourseChapters) => (
    selectedCourseChapters.reduce((result, value) => {
      /* 点击某一课程、课程组或章节时，会有很小一段时间中章节里没有题目、组卷和课件的信息，因此 */
      /* 需要进行判断 */
      if (value.get('coursewares')) {
        return value
          .get('coursewares')
          .concat(value.get('questions'))
          .concat(value.get('quizzes'))
          .every((item) => selectedAllQuestionItems.has(item)) ? (
            result.set(value.get('id'), fromJS({
              id: value.get('id'),
              name: value.get('name'),
            }))
          ) : result
      }
      return result
    }, immutableObjectEmpty)
  )
)

/* 当前用户决定整体复制的章节信息集合 */
/* selectedCourseChaptersSelector 中的章节信息已经恢复为嵌套对象形式 */
/* selectedCourseChaptersSelector 是 List 结构 */
const decidedCopyEntireChapterIdsMapSelector = createSelector(
  selectorDomain,
  selectedCourseChaptersSelector,
  (selectorDomain, selectedCourseChapters) => (
    selectorDomain.getIn(['others', 'decidedCopyEntireChapterIdsList']).reduce((result, value) => (
      result.set(value, selectedCourseChapters.find((item) => item.get('id') === value))
    ), immutableObjectEmpty)
  )
)

/* 计算出用户确定哪些章节需要整体复制以后，是否还有单个的题目、组卷或课件剩余 */
const singleQuestionItemNeedCopySelector = createSelector(
  selectedAllQuestionItemsSelector,
  needDecideCopyEntireChapterMapSelector,
  decidedCopyEntireChapterIdsMapSelector,
  (selectedAllQuestionItems, needDecideCopyEntireChapterMap, decidedCopyEntireChapterIdsMap) => {
    /* 如果当前没有要整体复制的章节，或者用户没有选择要整体复制的章节，则直接返回当前选择的所有项目 */
    if (
      needDecideCopyEntireChapterMap.isEmpty() ||
      decidedCopyEntireChapterIdsMap.isEmpty()
    ) {
      return selectedAllQuestionItems
    }
    /* 当前用户决定整体复制的章节中所包含的所有题目、组卷和课件 ID 集合 */
    const questionItemIdsInEntireChapter = decidedCopyEntireChapterIdsMap.reduce((result, value) => (
      result
        .concat(value.get('coursewares'))
        .concat(value.get('questions'))
        .concat(value.get('quizzes'))
    ), immutableArrayEmpty)
    /* 如果当前被选中的题目、组卷或课件 ID 存在于 questionItemIdsInEntireChapter 中 */
    /* 则返回 undefined，不存在则说明该项目 ID 所在章节没有被选择为带章节复制，也就是说 */
    /* 该项目属于单项 */
    return selectedAllQuestionItems.reduce((result, value, key) => (
      questionItemIdsInEntireChapter.includes(key) ? result : result.set(key, value)
    ), immutableObjectEmpty)
  }
)

/* 导出最终的数据 */
const selector = createSelector(
  myInfomationSelector,
  myCoursesSelector,
  myCourseGroupsSelector,
  myClassroomsSelector,
  selectedCourseOrCourseGroupOrClassroomNameSelector,
  selectedCourseChaptersSelector,
  selectedCourseLabelsSelector,
  selectedQuestionsAndQuizzesAndCoursewaresSelector,
  pagedSelectedQuestionsAndQuizzesAndCoursewaresSelector,
  searchConditionsSelector,
  selectedQuestionItemTypesSelector,
  totalPagesSelector,
  currentPageNumberSelector,
  selectedAllQuestionItemsSelector,
  selectedCurrentQuestionItemsSelector,
  previewQuestionItemSelector,
  statusSelector,
  needDecideCopyEntireChapterMapSelector,
  decidedCopyEntireChapterIdsMapSelector,
  singleQuestionItemNeedCopySelector,
  (
    myInfomation,
    myCourses,
    myCourseGroups,
    myClassrooms,
    selectedCourseOrCourseGroupOrClassroomName,
    selectedCollectionChapters,
    selectedCollectionLabels,
    selectedCollectionAllQuestionItems,
    selectedCollectionQuestionItems,
    filterConditions,
    selectedQuestionItemTypes,
    totalPages,
    currentPageNumber,
    selectedAllQuestionItems,
    selectedCurrentQuestionItems,
    previewQuestionItem,
    status,
    needDecideCopyEntireChapterMap,
    decidedCopyEntireChapterIdsMap,
    singleQuestionItemNeedCopy,
  ) => ({
    myInfomation,
    myCourses,
    myCourseGroups,
    myClassrooms,
    selectedCourseOrCourseGroupOrClassroomName,
    selectedCollectionChapters,
    selectedCollectionLabels,
    selectedCollectionAllQuestionItems,
    selectedCollectionQuestionItems,
    filterConditions,
    selectedQuestionItemTypes,
    totalPages,
    currentPageNumber,
    selectedAllQuestionItems,
    selectedCurrentQuestionItems,
    previewQuestionItem,
    status,
    needDecideCopyEntireChapterMap,
    decidedCopyEntireChapterIdsMap,
    singleQuestionItemNeedCopy,
  })
)

export default selector
