<template>
  <div class="Race-Overview">
    <div v-if="!race.records.data.length">Race data is not available.</div>

    <div v-else>

      <!-- Race-Winners -->
      <section class="row">
        <div class="col-sm-12">
          <race-winners></race-winners>
        </div>
      </section>

      <!-- Race-Grids -->
      <section class="row">
        <div class="col-sm-6">
          <race-grid show-race="raceOne" show-group="A"></race-grid>
        </div>

        <div class="col-sm-6">
          <race-grid show-race="raceOne" show-group="B"></race-grid>
        </div>
      </section>

      <section class="row">
        <div class="col-sm-6">
          <race-grid show-race="raceTwo" show-group="A"></race-grid>
        </div>

        <div class="col-sm-6">
          <race-grid show-race="raceTwo" show-group="B"></race-grid>
        </div>
      </section>

      <!-- Race-Results -->
      <section class="row">
        <div class="col-sm-6">
          <race-results show-race="raceOne" show-group="A"></race-results>
        </div>

        <div class="col-sm-6">
          <race-results show-race="raceOne" show-group="B"></race-results>
        </div>
      </section>

      <section class="row">
        <div class="col-sm-6">
          <race-results show-race="raceTwo" show-group="A"></race-results>
        </div>

        <div class="col-sm-6">
          <race-results show-race="raceTwo" show-group="B"></race-results>
        </div>
      </section>

  </div><!-- Race-Overview -->
</template>

<script>
  import RaceWinners from './RaceWinners.vue'
  import RaceResults from './RaceResults.vue'
  import RaceGrid from './RaceGrid.vue'
  import QualifierResults from './QualifierResults.vue'
  import { getCurrentRace } from '../vuex/races/getters'

  export default {
    name: 'race-overview',
    vuex: {
      getters: {
        race: getCurrentRace
      }
    },
    components: {
      RaceWinners,
      RaceResults,
      RaceGrid,
      QualifierResults
    }
  }
</script>
