import firebase from 'firebase'
import router from '@/router'
import Vue from '@/main'

export default {
  userLogin ({ commit }, { email, password }) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        commit('setUser', user)
        commit('setIsAuthenticated', true)
        router.push({ name: 'DashBoard' })
      })
      .catch(() => {
        commit('setUser', null)
        commit('setIsAuthenticated', false)
        Vue.$toasted.error('Login Failed')
        return false
      })
  },
  userAnonymousSignin ({ commit }) {
    firebase
      .auth()
      .signInAnonymously()
      .then(user => {
        commit('setUser', user)
        commit('setIsAuthenticated', true)
        return true
      })
      .catch((error) => {
        Vue.$toasted.error(error.message)
        return false
      })
  },
  userJoin ({ commit }, { email, password }) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        commit('setUser', user)
        commit('setIsAuthenticated', true)
        router.push({ name: 'Login' })
      })
      .catch(() => {
        commit('setUser', null)
        commit('setIsAuthenticated', false)
        Vue.$toasted.error('Register Failed')
      })
  },
  userSignOut ({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit('setUser', null)
        commit('setIsAuthenticated', false)
        Vue.$toasted.success('Logout Successfully.')
      })
      .catch(() => {
        commit('setUser', null)
        commit('setIsAuthenticated', false)
        router.push({ name: 'Home' })
      })
  }
}
