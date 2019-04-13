<template>
<div>
  <b-card title="Create a new Event" sub-title="Card subtitle">
    <b-card-text>
        Enter a title and you are good to go.
    </b-card-text>

    <CreateEventForm/>
    <!-- <a href="#" class="card-link">Card link</a>
    <b-link href="#" class="card-link">Another link</b-link> -->
  </b-card>
</div>
</template>


<script>
import CreateEventForm from '../Form/CreateEventForm'

export default {
  name: 'CreateEventCard',
  components: {
    CreateEventForm
  }
}
</script>
