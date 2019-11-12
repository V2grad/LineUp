<template>
  <b-card title="Login"
          sub-title="So close to the dashboard..."
          footer-tag="footer">
          <b-form>
             </b-form-group>
              <b-form-group id="NameGroup"
                label="Name"
                label-for="NameInput"
                :invalid-feedback="invalidResponse('name')"
              >
              <b-form-input
                id="NameInput"
                type="text"
                v-model="name"
                v-validate="'required|min:6'"
                :state="validateState('name')"
                name="name">
              </b-form-input>
             </b-form-group>
          </b-form>
          <b-btn slot="footer" variant="primary" @click="submit" :disabled="disableSubmit">Login</b-btn>
      </b-card>
</template>

<script>
import Form from '@/mixins/form'

export default {
  name: 'LoginCard',
  mixins: [Form],
  data () {
    return {
      name: null
    }
  },
  methods: {
    submit () {
      this.submitting = true
      this.$store.dispatch('auth/login', {
        name: this.name
      }).then((success) => {
        if (!success) this.submitting = false
      })
    }
  }
}
</script>
