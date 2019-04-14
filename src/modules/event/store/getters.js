export default {
    getEventName: state => state.eventName,
    getEventId: state => state.eventId,
    getUserType: state => state.userType,
    getTags: state => state.tags,
    isValidEvent: state => {
        return state.eventId && state.eventName && state.userType && state.tags
    }
}