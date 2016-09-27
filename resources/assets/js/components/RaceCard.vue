<template>
  <div class="Race-Card"
    :style="{ backgroundImage: racePhoto }"
    v-link="{ name: 'races.show', params: { id: race.id } }"
  >
    <div class="Race-Mask">
      <div class="Race-Card__Details">
        <span class="Race-Card__Date">{{ race.date | monthYear }}</span>
        <span class="Race-Card__Name">{{ race.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [ 'race' ],
    computed: {
      racePhoto () {
        return 'url(' + this.$options.filters.racePhoto(this.race.photo) + ')'
      }
    }
  }
</script>
