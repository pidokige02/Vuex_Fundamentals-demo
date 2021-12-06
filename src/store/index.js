import { createStore } from 'vuex'
import EventService from '@/services/EventService.js'

export default createStore({
  state: {
    user: 'Adam Jahr',
    events: [],
    event: {}
  },
  mutations: {
    //Mutation can update/mutate Vuex State.
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_EVENTS(state, events) {
      state.events = events
    }
  },
  actions: {
    createEvent({ commit }, event) {
      //commit : part of context object
      EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event) // commiting the mutation code
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchEvents({ commit }) {
      EventService.getEvents()
        .then(response => {
          commit('SET_EVENTS', response.data) // commiting the mutation code
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchEvent({ commit, state }, id) {
      // for performance improvement
      const existingEvent = state.events.find(event => event.id === id)
      if (existingEvent) {
        commit('SET_EVENT', existingEvent)
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  modules: {}
})
