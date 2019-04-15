<template>
<b-card
  text-variant="black"
  title="Join an existing Event"
  sub-title="Choose a type and enter Event Code"
>
  <JoinEventForm :submit="submit"/>
</b-card>
</template>

<script>
import JoinEventForm from '../Form/JoinEventForm'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'JoinEventCard',
  components: {
    JoinEventForm
  },
  data () {
    return {
      submit: false
    }
  },
  methods: {
    ...mapMutations('event', [
      'updateUserType',
      'updateEventId'
    ])
  },
  mounted () {
    // Get Info from uri
    let { type, code } = this.$route.query
    if (type) {
      this.updateUserType(type)
    }

    if (code) {
      this.updateEventId(code)
    }

    if (code && type) {
      this.submit = true
    }
  }
}
</script>
