<template>
<<<<<<< HEAD
<div>
    <ShowEventCard v-if="onGoingEvent"/>
    <JoinEventCard v-else/>
</div>
=======
    <JoinEventCard/>
>>>>>>> f7c10a3c252f2d4d5c5dfe839c24db5ddfbd9bf8
</template>

<script>
import JoinEventCard from '../components/Cards/JoinEventCard'
<<<<<<< HEAD
import ShowEventCard from '../components/Cards/ShowEventCard'

export default {
  name: 'JoinEvent',
  components: {
    JoinEventCard,
    ShowEventCard
  },
  computed: {
     onGoingEvent() {
        return this.$store.getters['event/onGoingEvent']
     }
  }
=======

export default {
    name: 'JoinEvent',
    components: {
        JoinEventCard
    }
>>>>>>> f7c10a3c252f2d4d5c5dfe839c24db5ddfbd9bf8
}
</script>
