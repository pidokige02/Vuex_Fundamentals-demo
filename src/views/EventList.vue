<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
// import EventService from '@/services/EventService.js'
export default {
  name: 'EventList',
  components: {
    EventCard
  },
  // data() { // comment out in lesson 4. it's moved to compute
  //   return {
  //     events: null
  //   }
  // },
  created() {
    this.$store.dispatch('fetchEvents') //commiting the fetchEvent in action.
    // commented out in lesson4
    // EventService.getEvents()
    //   .then(response => {
    //     this.events = response.data
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  },
  computed: {
    events() {
      //will always return the most current events
      return this.$store.state.events
    }
  }
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
