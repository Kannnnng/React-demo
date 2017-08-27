import axios from 'axios'

const http = axios.create({
  baseURL: '/api/',
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

function axiosGet(path, fetchConfig) {
  return http
    .get(path, fetchConfig)
    .then(response => response.data)
    .catch((error) => {
      console.log(error)  // eslint-disable-line
    })
}

function axiosPost(path, params, fetchConfig) {
  return http
    .post(path, params, fetchConfig)
    .then(response => response.data)
    .catch((error) => {
      console.log(error)  // eslint-disable-line
    })
}

function axiosPut(path, params, fetchConfig) {
  return http
    .put(path, params, fetchConfig)
    .then(response => response.data)
    .catch((error) => {
      console.log(error)  // eslint-disable-line
    })
}

function axiosDelete(path, fetchConfig) {
  return http
    .delete(path, fetchConfig)
    .then(response => response.data)
    .catch((error) => {
      console.log(error)  // eslint-disable-line
    })
}

export default {
  get: axiosGet,
  post: axiosPost,
  put: axiosPut,
  delete: axiosDelete,
}
