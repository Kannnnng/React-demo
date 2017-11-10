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
  Teacher,
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
        teacher: Teacher,
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
