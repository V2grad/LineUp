import Vue from '@/main'

export default {
    validateEvent({ commit, getters }) {
        return Vue.$axios.get('/events/' + getters.getEventId).then(r => {
            if (r.data) {
                commit('updateEventTitle', r.data.title)
                commit('updateTags', r.data.tags)
                return true
            } else {
                return false
            }
        })
    },
    reset({ commit }) {
        commit('updateEventId', '')
        commit('updateEventName', '')
        commit('updateTags', [])
        commit('userType', '')
    },
    createEvent() {

    }
}