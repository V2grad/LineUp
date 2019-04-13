<template>
  <b-navbar
    toggleable="sm"
    type="dark"
    variant="info"
    fixed="top"
    class="nav-padding">
    <b-navbar-toggle target="nav_collapse"/>

    <b-navbar-brand :to="{'name': 'Landing'}">HandsUp</b-navbar-brand>

    <b-collapse
      id="nav_collapse"
      is-nav>

      <!-- <b-navbar-nav>
        <b-nav-item-dropdown text="Plan" >
          <b-dropdown-item
            :to="{'name': 'Plan'}"
            exact>Your Plan</b-dropdown-item>
          <b-dropdown-item
            :to="{'name': 'TransferredCourse'}"
            exact>Transferred/AP</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Course">
          <b-dropdown-item
            :to="{'name': 'CourseSelect'}"
            exact>Courses</b-dropdown-item>
          <b-dropdown-item
            :to="{'name': 'CustomCourse'}"
            exact>Custom Courses</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item :to="{'name': 'Actions'}">Actions</b-nav-item>
        <b-nav-item :to="{'name': 'ExportPlan'}">Export</b-nav-item>
      </b-navbar-nav> -->

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
        </b-nav-item-dropdown> -->
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
  }
}
</script>
