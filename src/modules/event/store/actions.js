import firebase from 'firebase'
import router from '@/router'

export default {
  // title, tags
  createEvent({ commit, dispatch }, payload) {
    firebase
        .database()
        .ref('events')
        .push(payload)
        .then(r => {
          commit('updateEventId', r.key)
          dispatch('listenEvent')
          router.push({name: 'JoinEvent'})
          return true
        })
  },
  updateEvent({ commit, getters }) {
    firebase
        .database()
        .ref('events/' + getters.getEventId)
        .once('value')
        .then((snapshot) => {
          commit('updateEvent', snapshot.val())
        })
  }
}
