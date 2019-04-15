<template>
<b-form v-if="show">
     <b-form-group label="User Type">
      <b-form-radio-group
        id="btn-radios-2"
        v-model="selected"
        :options="options"
        buttons
        button-variant="outline-primary"
        size="sm"
        name="radio-btn-outline"
      ></b-form-radio-group>
    </b-form-group>

      <b-form-group id="input-group-2" label="Event Code:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="code"
          required
          placeholder="Six digit code"
        ></b-form-input>
      </b-form-group>

    <b-button @click="doSubmit" variant="primary">Submit</b-button>
    <b-button @click="onReset" variant="danger">Reset</b-button>
</b-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'JoinEventForm',
  props: {
    submit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    submit: function (newValue, oldValue) {
      if (newValue) {
        this.doSubmit()
      }
    }
  },
  data () {
    return {
      show: true,
      options: [
        { text: 'User', value: 'user' },
        { text: 'Instructor', value: 'instructor' }
      ]
    }
  },
  computed: {
    code: {
      get () {
        return this.$store.getters['event/getEventId']
      },
      set (value) {
        this.$store.commit('event/updateEventId', value)
      }
    },
    selected: {
      get () {
        return this.$store.getters['event/getUserType']
      },
      set (value) {
        this.$store.commit('event/updateUserType', value)
      }
    }
  },
  methods: {
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.code = ''
      this.selected = ''
      // Trick to reset/clear native browser form validation state
      this.$nextTick(() => {
        this.show = true
      })
    },
    doSubmit () {
      if (this.code && this.selected) {
        this.$store.dispatch('event/validateEvent').then(r => {
          if (r) {
            this.$router.push({ name: 'JoinEventConfirm' })
          } else {
            this.$toasted.error('Event No Found, Please double check your info')
          }
        })
      } else {
        this.$toasted.error('Please fill in all fields')
      }
    }
  }
}
</script>
