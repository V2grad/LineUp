<template>
  <b-navbar
    toggleable="sm"
    type="dark"
    variant="info"
    fixed="top"
    class="nav-padding">
    <b-navbar-toggle target="nav_collapse"/>

    <b-navbar-brand :to="{'name': 'Home'}">HandsUp</b-navbar-brand>

    <b-collapse
      id="nav_collapse"
      is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown
          text="Navigate"
          right>
          <b-dropdown-item :to="{'name': 'UserProfile'}">
            Welcome: {{ username }}
          </b-dropdown-item>
          <br>
          <b-dropdown-item
            :to="{'name': 'UserLogout'}"
            exact>
            Logout Current User
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<style scoped>
.nav-padding {
  position: fixed;
}
</style>

<script>
export default {
  name: 'NavBar',
  computed: {
    username() {
      return this.$store.getters['user/getUsername']
    }
  }
}
</script>
