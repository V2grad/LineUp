export default {
    updateEventId(state, id) {
        state.eventId = id
    },
    updateEventTitle(state, name) {
        state.eventName = name
    },
    updateUserType(state, type) {
        state.userType = type
    },
    updateTags(state, tags) {
        state.tags = tags
    }
}