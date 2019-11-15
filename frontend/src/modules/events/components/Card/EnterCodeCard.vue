<template>
  <div>
    <b-form  @submit.stop.prevent>
      <label for="EnterCodeCard">Enter event code</label>
      <b-input v-model="Eventcode" :state="validation" id="EnterCodeCard"></b-input>
      <b-form-invalid-feedback :state="validation">
        Your code must have........   <!-- reserve for futrure use -->
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation">
      </b-form-valid-feedback>
     </b-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Eventcode: ''
      }
    },
    computed: {
      validation() {
        return this.Eventcode.length > 4 && this.Eventcode.length < 13
      }
    }
  }
</script>