import http from 'utils/fetch'

export function test(params) {
  return http.get(`test?${params}`)
    .then((response) => {
      const result = response
      return result
    })
}
