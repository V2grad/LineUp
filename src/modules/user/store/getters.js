export default {
  getUserId: state => {
    return state.userId
  },
  getUsername: state => {
    return state.username
  },
  isVaildUser: state => {
    return state.userId !== null
  }
}
