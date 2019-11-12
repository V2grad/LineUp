import Vue from '@/main'

export default {
  login ({ commit }, { name }) {
    return Vue.$axios.post('/auth', {
      name
    }).then((res) => {
      commit('setPasscode', res.data.passcode)
      commit('setUserId', res.data._id)

      Vue.$router.push({
        'name': 'DashBoard'
      })

      return true
    }).catch((err) => {
      console.log(err)

      return false
    })
  },
  reset ({
    commit
  }) {
    commit('setPasscode', null)
    commit('setUserId', null)

    Vue.$router.push({
      name: 'Login'
    })

    Vue.$toasted.error('Login Expired.')

    return true
  },
  validateUserState ({ getters, dispatch }) {
    if (getters['userId']) {
      return Vue.$axios.get('/auth').then((res) => {
        if (res.data._id !== getters['userId']) {
          console.log('Special: userID does not match current user')
          dispatch('reset') // WTF
        }

        return true
      })
    }

    return false
  }
}
