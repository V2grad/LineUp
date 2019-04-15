
import createPersistedState from 'vuex-persistedstate'
import Vuex from 'vuex'

import auth from '@/modules/auth/store'
import home from '@/modules/home/store'
import event from '@/modules/event/store'
import user from '@/modules/user/store'
import local from '@/modules/local/store'

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  modules: {
    home,
    auth,
    user,
    event,
    local
  },
  plugins: [createPersistedState({
    reducer (state) {
      // No need to use let as the reducer itself can be immutable which do not mean that the properties
      // are not mutable (https://ponyfoo.com/articles/var-let-const)
      const reducer = Object.assign({}, state)
      // state which you don't want to persist.
      // https://github.com/robinvdvleuten/vuex-persistedstate/issues/4
      delete reducer.local

      return reducer
    }
  })]
})