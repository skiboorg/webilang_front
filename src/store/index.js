import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import auth from './auth'
import data from './data'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
       auth,
       data
    },
    strict: process.env.DEBUGGING
  })

  return Store
})
