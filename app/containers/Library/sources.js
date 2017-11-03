/**
 *
 * Library sources
 *
 */

import http from 'utils/fetch'
import { normalize } from 'normalizr'
import {
  Libraries,
} from 'utils/schemas'

export function getMyAllCourses() {
  return http
    .get('v2/libraries?type=mine')
    .catch(() => {
      throw '获取个人所有课程出错'
    })
    .then((response) => {
      const result = normalize(response, {
        libraries: Libraries,
      })
      return result
    })
    .catch(() => {
      throw '数据转换出错'
    })
}

export function getMyAllCourseGroups() {
  return http
    .get('v2/groups?type=2')
    .then((response) => {
      const result = response
      console.log(result, 456)
      return result
    })
}

export function getMyAllClassrooms() {
  return http
    .get('v2/request')
    .then((response) => {
      const result = response
      return result
    })
}

export function getLibraryByLibraryId({
  libraryId,
}) {
  return http
    .get(`v2/libraries/${libraryId}`)
    .then((response) => {
      const result = response
      console.log(result, 789)
      return result
    })
}
