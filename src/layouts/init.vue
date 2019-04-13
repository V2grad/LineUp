<template>
  <b-container
    fluid
    class="main-container">
    <transition>
      <router-view/>
    </transition>
  </b-container>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
    name: 'InitLayout',
    mounted() {
        // this.updateLoading(true)
        // this.validateUser().then(r => {
        //     if (!r) {
        //         if (this.createUser()) {
        //             this.updateLoading(false)
        //         } else {
        //             this.updateError(true)
        //         }
        //     }
        // }).catch(e => {
        //     this.updateError(true)
        // })
    },
    methods: {
        // ...mapActions('user', {
        //     createUser,
        //     validateUser
        // }),
        // ...mapMutations('local', {
        //     updateLoading,
        //     updateError,
        // })
    }
}
</script>

