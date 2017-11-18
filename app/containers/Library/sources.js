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
      result.classroomId = classroomId
      return result
    })
    .catch((error) => {throw error})
}

export function copyQuestionItemToLibrary({
  /* 标示要复制到的是课程、课程组还是课堂 */
  name,
  /* 要复制到的课程、课程组或课堂的 ID */
  targetId,
  /* 要复制到的章节的 ID */
  targetChapterId,
  /* 当前选中的要复制的题目、组卷和课件集合 */
  selectedQuestionItems,
  /* 被复制章节的具体信息 */
  sourceChapters,
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
    mapIdToCollection[value.name].push(value.id)
  })
  return (name === 'classrooms' ? (
    copyMethod === 'copyEntireChapter' ? (
      http.post(`v2/copy/${targetId}/chapter`, {
        chapters: [
          sourceChapter,
        ],
      })
    ) : (
      http.post(`v2/preparations?courseId=${targetId}`, {
        unitId: targetChapterId,
        coursewareIds,
        questionIds,
        quizIds,
      })
    )
  ) : (
    copyMethod === 'copyEntireChapter' ? (
      http.post('v2/copy/chapter', {
        libraryId: targetId,
        chapters: [
          sourceChapter,
        ],
      })
    ) : (
      http.post('v2/copy', {
        libraryId: targetId,
        chapterId: targetChapterId,
        coursewareIds,
        questionIds,
        quizIds,
      })
    )
  )).then(() => ({
    name,
    targetId,
    numbers: !sourceChapters.length ? selectedQuestionItems.length : (
      sourceChapters.reduce((result, value) => (
        result +
          value.coursewareIds.length +
          value.questionIds.length +
          value.quizIds.length
      ), selectedQuestionItems.length)
    ),
  }))
  .catch((error) => {throw error})
}
