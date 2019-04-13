<template>
<div>
  <b-card
    overlay
    img-src="https://picsum.photos/900/250/?image=3"
    img-alt="Card Image"
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
