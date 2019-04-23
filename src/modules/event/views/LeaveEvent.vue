<template>
<div>
    <ShowEventCard v-if="onGoingEvent"/>
    <LeaveEventCard v-else/>
</div>
</template>

<script>
import LeaveEventCard from '../components/Cards/LeaveEventCard'
import ShowEventCard from '../components/Cards/ShowEventCard'

export default {
  name: 'LeaveEvent',
  components: {
    LeaveEventCard,
    ShowEventCard
  },
  computed: {
    onGoingEvent () {
      return this.$store.getters['event/onGoingEvent']
    }
  }
}
</script>
