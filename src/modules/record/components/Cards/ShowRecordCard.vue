<template>
<b-card
    title="Your Request"
    sub-title="Please be patient..."
    footer-tag="footer">
    <b-card-text>
        We have received your request, and we will be with you shortly.
    </b-card-text>

    <div v-if="spin" class="text-center mb-3 d-flex justify-content-between">
      <b-spinner
        variant="primary"
      ></b-spinner>
    </div>

    <b-progress :value="100" :variant="color" :animated="true" class="mt-3"></b-progress>

    <b-card-text>
        Section: {{ section }} | Status: {{ status }}
    </b-card-text>

    <em slot="footer">Updating in {{ second }}s</em>
</b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ShowRecordCard',
  data () {
    return {
      origin: 5,
      second: 5,
      interval: null
    }
  },
  watch: {
    second: function (newv, oldv) {
      if (newv === -1) {
        this.update()
        this.second = this.origin
      }
    }
  },
  computed: {
    ...mapGetters('record', {
      section: 'getTag',
      status: 'getRecordStatus'
    }),
    spin () {
      return this.status === 'Waiting'
    },
    color () {
      return this.spin ? 'primary' : 'success'
    }
  },
  methods: {
    update () {
      this.$store.dispatch('record/updateStatus')
    },
    start () {
      this.interval = setInterval(() => { this.second-- }, 1000)
    }
  },
  mounted () {
    this.start()
  }
}
</script>
