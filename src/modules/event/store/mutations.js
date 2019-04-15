export default {
  updateEventId (state, id) {
    state.eventId = id
  },
  updateEvent (state, data) {
    state.event = data
  },
  updateEventListener (state, listener) {
    state.listener = listener
  }
}
