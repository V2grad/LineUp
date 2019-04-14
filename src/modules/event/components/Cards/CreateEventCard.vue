<template>
<b-card
  text-variant="white"
  title="Create a new Event"
  sub-title=""
>
  <b-card-text>
      Enter a title and you are good to go.
  </b-card-text>

  <CreateEventForm/>
  <!-- <a href="#" class="card-link">Card link</a>
  <b-link href="#" class="card-link">Another link</b-link> -->
</b-card>
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
