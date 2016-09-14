<template>
  <div class="Race-Overview">
    <div v-if="!race.records.data.length">Race data is not available.</div>

    <div v-else>
      <div class="row">
        <div class="col-sm-12">
          <race-winners></race-winners>
        </div>
      </div>
  </div><!-- Race-Overview -->
</template>

<script>
  import RaceWinners from './RaceWinners.vue'
  import RaceResults from './RaceResults.vue'
  import RaceGrid from './RaceGrid.vue'
  import QualifierResults from './QualifierResults.vue'
  import { getCurrentRace } from '../vuex/races/getters'
  import { gridReady, raceComplete } from '../filters'

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
    },
    methods: {
      raceComplete,
      gridReady
    }
  }
</script>
