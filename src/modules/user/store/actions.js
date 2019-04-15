<<<<<<< HEAD
import firebase from 'firebase'

export default {
  updateUser ({ commit, rootGetters }) {
    firebase
      .database()
      .ref('users/' + rootGetters['auth/getUserId'])
      .once('value', (snapshot) => {
        commit('updateUsername', snapshot.val().username)
      })
  },
  updateUsername ({ commit, rootGetters }, name) {
    return firebase
      .database()
      .ref('users/' + rootGetters['auth/getUserId'])
      .set({
=======
import axios from '@/config/axios'

export default {
  validateUser ({ getters }) {
    if (getters.isVaildUser) {
      return axios.get('/users/' + getters.getUserId).then(r => {
        if (r.data.length !== 0) {
          return true
        }
        return false
      })
    } else {
      return false
    }
  },
  createUser ({ commit }) {
    return axios.post('/users').then(r => {
      commit('updateUserId', r.data._id)
      commit('updateUsername', r.data.display_name)
      return true
    })
  },
  updateUsername ({ getters, commit }, name) {
    if (getters.isVaildUser) {
      return axios.put('/users/' + getters.getUserId, {
>>>>>>> f7c10a3c252f2d4d5c5dfe839c24db5ddfbd9bf8
        username: name
      }).then(r => {
        commit('updateUsername', name)
        return true
      })
  }
}
