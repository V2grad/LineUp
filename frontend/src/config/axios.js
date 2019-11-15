import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import v from '@/main'

axios.interceptors.request.use((config) => {
  config.baseURL = store.getters['home/API']
  let user_id = store.getters['auth/userId']
  let passcode = store.getters['auth/token']
  if (token) {
    // Authentication Authorization
    config.headers.common['user_id'] = user_id
    config.headers.common['passcode'] = passcode
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  if (error.response.status === 401) {
    // Token expired
    // Clear out and redirect to login
    store.dispatch('auth/reset')
  }

  // error displaying
  let err = error.response.data.message
  if (err) {
    v.$toasted.error(err)
  }

  return Promise.reject(error)
})

Vue.prototype.$axios = axios
