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
        username: name
      }).then(r => {
        commit('updateUsername', name)
      })
    }
  }
}
