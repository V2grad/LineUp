export default {
  onGoingEvent: state => {
    return state.eventId !== ''
  },
  getEvent: state => {
    return state.event
  },
  getEventId: state => {
    return state.eventId
  }
}
