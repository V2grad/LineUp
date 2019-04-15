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
        username: name
      }).then(r => {
        commit('updateUsername', name)
        return true
      })
  }
}
