<template>
  <div class="Race-Card">
    <div class="Race-Card__Photo" v-link="{ name: 'races.show', params: { id: race.id } }"
      :style="{ backgroundImage: full === true ? racePhoto : raceThumb }"
      :class="{ 'blur': !full }"
    >
    </div>
    <img @load="full = true" style="display: none" :src="race.photo | racePhoto" alt="">
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
    data () {
      return {
        full: false
      }
    },
    computed: {
      racePhoto () {
        return 'url(' + this.$options.filters.racePhoto(this.race.photo) + ')'
      },
      raceThumb () {
        return 'url(' + this.$options.filters.raceThumb(this.race.photo) + ')'
      }
    }
  }
</script>
