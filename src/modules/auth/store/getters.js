export default {
  isAuthenticated(state) {
    return state.user !== null && state.user !== undefined;
  },
  getUserId(state) {
    return state.user ? state.user.user.uid : null
  },
  getUser(state) {
    return state.user
  }
};
