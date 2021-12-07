<template>
  <h1>Create an event</h1>

  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <label>Select a category: </label>
      <select v-model="event.category">
        <option
          v-for="option in categories"
          :value="option"
          :key="option"
          :selected="option === event.category"
          >{{ option }}</option
        >
      </select>

      <h3>Name & describe your event</h3>

      <label>Title</label>
      <input v-model="event.title" type="text" placeholder="Title" />

      <label>Description</label>
      <input
        v-model="event.description"
        type="text"
        placeholder="Description"
      />

      <h3>Where is your event?</h3>

      <label>Location</label>
      <input v-model="event.location" type="text" placeholder="Location" />

      <h3>When is your event?</h3>
      <label>Date</label>
      <input v-model="event.date" type="text" placeholder="Date" />

      <label>Time</label>
      <input v-model="event.time" type="text" placeholder="Time" />

      <button type="submit">Submit</button>
    </form>
    <!-- <div>{{ $store.state.events }}</div> -->
    <!-- this is just for debugging purpose -->
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
// commented in lesson 4 below code is moved to action in store folder
// import EventService from '@/services/EventService.js'

export default {
  data() {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ],
      event: {
        id: '',
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: '' //Sync to Vuex state.
      }
    }
  },
  methods: {
    onSubmit() {
      const event = {
        ...this.event, //Object spread operator, this.event all element 를 모두 copy 하여 clone 하고, 밑의 command 를 실행한다.
        id: uuidv4(),
        //access our user state by writing this.$store.state.user.
        organizer: this.$store.state.user
      }
      this.$store
        .dispatch('createEvent', event)
        // commented in lesson 4 below code is moved to action
        // EventService.postEvent(event)
        //   .then(() => {
        //     //add event to Vuex state
        //     //'ADD_EVENT' is mutation, event is payload
        //     this.$store.commit('ADD_EVENT', event)
        //   })
        //   .catch(error => {
        //     console.log(error)
        //   })
        .then(() => {
          //add dynamic routing in lesson5
          this.$router.push({
            name: 'EventDetails',
            params: { id: event.id }
          })
        })
        .catch(error => {
          this.$router.push({
            name: 'ErrorDisplay',
            params: { error: error } // error is fed into ErrorDispay as a prop
          })
        })
    }
  }
}
</script>
