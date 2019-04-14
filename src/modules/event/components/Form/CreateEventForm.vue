<template>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          required
          placeholder="Enter title"
        ></b-form-input>
      </b-form-group>


      <b-form-group id="input-group-2" label="Event description:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter text"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          title: '',
          description: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.title = ''
        this.form.description = ''
        // Trick to reset/clear native browser form validation state
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>