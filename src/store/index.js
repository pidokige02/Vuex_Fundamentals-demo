import { createStore } from 'vuex'

export default createStore({
  state: {
    user: 'Adam Jahr',
    events: []
  },
  mutations: {
    //Mutation can update/mutate Vuex State.
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {},
  modules: {}
})
