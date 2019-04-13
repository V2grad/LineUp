
<template>
  <b-jumbotron>
    <template slot="header">
      HandsUp
    </template>
    <template slot="lead">
      Way to wait in the line
    </template>
    <hr class="my-4">
    <p>
      Choose an action and get started!
    </p>
    <b-btn
      :to="{'name': 'JoinEvent'}"
      variant="primary">Join an Event</b-btn>
    <b-btn
      :to="{'name': 'CreateEvent'}"
      variant="success">Create an Event</b-btn>
    <b-btn
      variant="dark"
      href="https://github.com/V2grad/HandsUp">About this Project</b-btn>
    <b-btn
      variant="link"
      href="https://v2grad.org">About us</b-btn>
  </b-jumbotron>
</template>