<template>
 <b-card title="Leave Confirm" sub-title="Bye!">
    <b-card-text>
      Please confirm that you are about to leave <strong>{{ eventName }}</strong>
    </b-card-text>

    <b-button @click="reset" variant="primary">Yes</b-button>
    <b-button @click="back" variant="danger">No</b-button>
  </b-card>
</template>

<script>
export default {
  name: 'JoinEventConfirm',
  computed: {
    eventName () {
      return this.$store.getters['event/getEventName']
    }
  },
  methods: {
    back () {
      this.$router.push({ name: 'AddRecord' })
    },
    reset () {
      this.$store.dispatch('event/reset')
      this.$router.push({ name: 'Home' })
    }
  },
  mounted () {
  }
}
</script>
