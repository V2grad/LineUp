import Vue from '@/main'

export default {
  validateUser ({ getters }) {
    if (getters.isVaildUser) {
      return Vue.$axios.get('/users', {
        id: getters.getUserId
      }).then(r => {
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
    return Vue.$axois.post('/users').then(r => {
      commit('updateUserId', r.data.id)
      commit('updateUsername', r.data.id)
      return true
    })
  },
  updateUsername ({ getters, commit }, name) {
    if (getters.isVaildUser) {
      return Vue.$axios.put('/users' + getters.getUserId, {
        username: name
      }).then(r => {
        commit('updateUsername', name)
      })
    }
  }
}
