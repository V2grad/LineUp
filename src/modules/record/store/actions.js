import Vue from '@/main'

export default {
  createRecord ({ commit, rootGetters }, tag) {
    return Vue.$axios.post('/records', {
      event_id: rootGetters['event/getEventId'],
      tag
    }).then(r => {
      commit('updateRecordId', r.data._id)
      commit('updateTag', tag)
      commit('updateStatus', r.data.status)
      return true
    }).catch(e => {
      return false
    })
  },
  updateStatus ({ commit, getters }) {
    return Vue.$axios.get('/records/' + getters['getRecordId']).then(r => {
      commit('updateStatus', r.data.status)
      return true
    }).catch(e => {
      return false
    })
  }
}
