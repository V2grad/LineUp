<template>
<div>
    <b-form-select v-model="selected" :options="options" class="mb-3">
      <!-- This slot appears above the options from 'options' prop -->
      <template slot="first">
        <option :value="null" disabled>-- Please select an section --</option>
      </template>
    </b-form-select>
    <b-button @click="submit">Confirm</b-button>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddRecordForm',
  data () {
    return {
      selected: null
    }
  },
  computed: {
    ...mapGetters('event', {
      options: 'getTags'
    })
  },
  methods: {
    submit () {
      this.$store.dispatch('record/createRecord', this.selected).then(r => {
        if (r) {
          this.$router.push({ name: 'ShowRecord' })
        }
      })
    }
  }
}
</script>
