<template>
  <div class="Race-Card"
    :style="{ backgroundImage: racePhoto }"
    v-link="{ name: 'races.show', params: { id: race.id } }"
  >
    <div class="Race-Mask">
      <div class="Race-Card__Details">
        <span class="Race-Card__Name">{{ race.name }}</span>
        <span class="Race-Card__Date">{{ race.date | dateGP }}</span>
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

<style lang="sass">
  @import 'resources/assets/sass/_variables.scss';

  .Race-Card {
    position: relative;
    height: 100px;
    border: 2px solid $tertiary-color;
    border-radius: 4px;
    margin-bottom: 8px;
    cursor: pointer;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 0 3px $primary-color;
    &:hover .Race-Mask {
      background-color: rgba(0,0,0,.7);
    }
    &:hover .Race-Card__Details {
      opacity: 1;
    }
  }

  .Race-Mask {
    background-color: rgba(0,0,0,.2);
    height: 100%;
    transition: all .3s ease;
  }

  .Race-Card__Details {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: .9;
  }

  .Race-Card__Name {
    color: white;
    font-size: 1.8em;
    font-family: $title-font;
    text-align: center;
    text-shadow: 0 0 2px $tertiary-color;
  }

  .Race-Card__Date {
    margin-top: -5px;
    background-color: $secondary-color;
    color: $tertiary-color;
    padding: 0 6px;
    border-radius: 4px;
  }
</style>
