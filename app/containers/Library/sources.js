/**
 *
 * Library sources
 *
 */

import http from 'utils/fetch'
import { normalize } from 'normalizr'
import {
  Chapters,
  Classrooms,
  Coursewares,
  CourseGroup,
  CourseGroups,
  Labels,
  Courses,
  Questions,
  Quizzes,
} from 'utils/schemas'

export function getMyAllCourses() {
  return http
    .get('v2/libraries?type=mine')
    .then((response) => {
      const result = normalize(response, {
        libraries: Courses,
      })
      return result
    })
    .catch((error) => {throw error})
}

export function getMyAllCourseGroups() {
  return http
    .get('v2/groups?type=3')
    .then((response) => {
      const result = normalize(response, {
        groupList: CourseGroups,
      })
      return result
    })
    .catch((error) => {throw error})
}

export function getMyAllClassrooms() {
  return http
    .get('v2/courses')
    .then((response) => {
      const result = normalize(response, {
        courses: Classrooms,
      })
      return result
    })
}

export function getQuestionsByCourseId({
  courseId,
}) {
  return http
    .get(`v2/libraries/${courseId}`)
    .then((response) => {
      const result = normalize(response, {
        chapters: Chapters,
        coursewares: Coursewares,
        labels: Labels,
        questions: Questions,
        quizzes: Quizzes,
      })
      return result
    })
    .catch((error) => {throw error})
}

export function getQuestionsByCourseGroupId({
  courseGroupId,
}) {
  return http
    .get(`v2/groups/${courseGroupId}`)
    .then((response) => {
      const result = normalize(response, {
        chapters: Chapters,
        coursewares: Coursewares,
        group: CourseGroup,
        labels: Labels,
        questions: Questions,
        quizzes: Quizzes,
      })
      return result
    })
    .catch((error) => {throw error})
}

export function getQuestionsByClassroomId({
  classroomId,
}) {
  return http
    .get(`v2/courses/${classroomId}/units`)
    .then((response) => {
      const result = normalize(response, {
        chapters: Chapters,
        coursewares: Coursewares,
        questions: Questions,
        quizzes: Quizzes,
      })
      result.classroomId = classroomId.toString()
      return result
    })
    .catch((error) => {throw error})
}

export function copyQuestionItemToLibrary({
  /* 标示要复制到的是课程、课程组还是课堂 */
  name,
  /* 如果当前是要复制到课程组，那么 targetId 表示该课程组所对应的 library 的 ID，因此还需要 */
  /* groupId 来指明课程组 ID */
  groupId,
  /* 要复制到的课程、课程组或课堂的 ID */
  targetId,
  /* 要复制到的章节的 ID */
  targetChapterId,
  /* 当前选中的要复制的题目、组卷和课件集合 */
  selectedQuestionItems,
  /* 被复制章节的具体信息 */
  sourceChapters,
  /* 当从课堂中向课程、课程组或其他课堂复制时，需要整体复制的章节 ID 集合 */
  units,
}) {
  const coursewareIds = []
  const questionIds = []
  const quizIds = []
  const mapIdToCollection = {
    courseware: coursewareIds,
    question: questionIds,
    quiz: quizIds,
  }
  selectedQuestionItems.forEach((value) => {
    if (value) {
      mapIdToCollection[value.name].push(value.id)
    }
  })
  for (let i = 0, len = sourceChapters.length; i < len; i++) {
    sourceChapters[i].coursewareIds = sourceChapters[i].coursewares
    sourceChapters[i].questionIds = sourceChapters[i].questions
    sourceChapters[i].quizIds = sourceChapters[i].quizzes
  }
  return http
    .post(`${name === 'classrooms' ? 'v2/copy/unit/all' : 'v2/copy/all'}` , {
      [name === 'classrooms' ? 'courseId' : 'libraryId']: targetId,
      sources: !selectedQuestionItems.length ? undefined : {
        chapterId: targetChapterId,
        coursewareIds,
        questionIds,
        quizIds,
      },
      chapters: !sourceChapters.length ? undefined : sourceChapters,
      units,
    })
    .then(() => ({
      name,
      targetId: name === 'courseGroups' ? groupId : targetId,
      newCopyedQuestionItemIdsList: selectedQuestionItems
        .map((value) => value.id)
        .concat(sourceChapters.map((value) => (
          value
            .coursewareIds
            .concat(value.questionIds)
            .concat(value.quizIds)
        )))
    }))
    .catch((error) => {throw error})
}
