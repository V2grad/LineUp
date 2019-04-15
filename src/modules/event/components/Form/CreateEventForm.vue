<template>
    <div>
        <b-form>
            <b-form-group id="TitleGroup"
              label="Title"
              label-for="TitleInput"
               :invalid-feedback="invalidResponse('title')"
            >
                <b-form-input
                    id="TitleInput"
                    type="text"
                    v-model="title"
                    v-validate="'required|min:6'"
                    :state="validateState('title')"
                    name="email">
                </b-form-input>
            </b-form-group>
              <!-- <b-form-group id="PasswordGroup"
                label="Password"
                label-for="PasswordInput"
                :invalid-feedback="invalidResponse('password')"
              >
              <b-form-input
                id="PasswordInput"
                type="password"
                v-model="password"
                v-validate="'required|min:6'"
                :state="validateState('password')"
                name="password">
              </b-form-input>
             </b-form-group> -->
          </b-form>
          <b-btn slot="footer" variant="primary" @click="submit" :disabled="disableSubmit">Confirm</b-btn>
    </div>
</template>

<script>
import Form from '@/mixins/form'

export default {
    name: 'CreateEventForm',
    mixins: [Form],
     data () {
        return {
            title: '',
            tags: []
        }
    },
    methods: {
        submit () {
        this.submitting = true
        this.$store.dispatch("event/createEvent", {
            title: this.title,
            tags: ['General']
        }).then((success) => {
            if (!success) this.submitting = false
            else this.$toasted.success('Create Successfully')
        })
        }
    }
}
</script>
