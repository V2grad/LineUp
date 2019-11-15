import Vue from '@/main'

export default {
  getProfile({ dispatch, rootGetters }) {
    Vue.$axios.get('/user').then(res => {
      
    })
  }
}
