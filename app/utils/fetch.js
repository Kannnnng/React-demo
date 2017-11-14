import axios from 'axios'

const http = axios.create({
  baseURL: '/api/',
  timeout: 10000,
  headers: {
    'X-Custom-Header': 'foobar',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

function axiosGet(path, fetchConfig) {
  return http
    .get(path, fetchConfig)
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

function axiosPost(path, params, fetchConfig) {
  return http
    .post(path, params, fetchConfig)
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

function axiosPut(path, params, fetchConfig) {
  return http
    .put(path, params, fetchConfig)
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

function axiosDelete(path, fetchConfig) {
  return http
    .delete(path, fetchConfig)
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export default {
  get: axiosGet,
  post: axiosPost,
  put: axiosPut,
  delete: axiosDelete,
}
