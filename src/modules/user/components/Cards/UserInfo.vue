<template>
  <b-card
    title="User Info">
    <p class="card-text">
      UserId: {{ userId }}
    </p>
    <b-form-input
      v-model="name"
      :maxlength="50"
      class="mt-3 mb-3"
      type="text"
      placeholder="user display name"/>
    <em slot="footer">
      <b-button-group size="lg">
        <b-btn
          variant="success"
          @click="writeData">Save</b-btn>
      </b-button-group>
    </em>
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserInfoCard',
  data() {
    return {
      name: ''
    }
  },
  computed: {
<<<<<<< HEAD
    ...mapGetters('auth', {
      userId: 'getUserId'
    }),
    ...mapGetters('user', {
      username: 'getUsername'
    })
  },
  methods: {
    ...mapActions('user', [
      'updateUser',
      'updateUsername'
    ]),
    writeData() {
      this.updateUsername(this.name).then(r => {
        this.$toasted.success('update complete')
      })
    }
  },
  mounted() {
    this.updateUser
    this.name = this.username
=======
      ...mapGetters('user', {
          userId: 'getUserId',
          username: 'getUsername',
      }),
      name: {
          get() {
              return this.username
          },
          set(value) {
              this.updateUsername(value)
          }
      }
  },
  methods: {
      ...mapActions('user', [
         'updateUsername'
      ])
>>>>>>> f7c10a3c252f2d4d5c5dfe839c24db5ddfbd9bf8
  }
}
</script>
