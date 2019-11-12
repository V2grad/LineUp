<template>
<div>
  <user-card class="mb-4"/>
</div>
</template>

<script>
import UserCard from '../components/UserCard'
import SessionCard from '../components/SessionCard'

export default {
  name: 'Profile',
  components:{
    UserCard,
  },
  computed: {
    name () {
      return this.$store.getters['user/name']
    }
  }
}
</script>
