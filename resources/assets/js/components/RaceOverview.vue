<template>
  <div>
    <div v-if="!race.records.length">Race data is not available.</div>

    <div v-else>
      <div class="row">
        <h4>Race Results</h4>
        <hr>
      </div>

      <div class="row">
        <div class="col-sm-6" v-if="gridReady('raceOne')">
          <div class="panel panel-default">
            <div class="panel-heading">
              <strong>First Race</strong>
            </div>

            <div class="panel-body" v-if="gridReady('raceOne') && !raceComplete('raceOne', 'A')">
              <race-grid show-race="raceOne" show-group="A"></race-grid>
            </div>
            <race-results v-if="raceComplete('raceOne', 'A')" show-race="raceOne" show-group="A"></race-results>

            <div class="panel-body" v-if="gridReady('raceOne') && !raceComplete('raceOne', 'B')">
              <race-grid show-race="raceOne" show-group="B"></race-grid>
            </div>
            <race-results v-if="raceComplete('raceOne', 'B')" show-race="raceOne" show-group="B"></race-results>

          </div><!-- panel -->
        </div>

        <div class="col-sm-6" v-if="gridReady('raceOne')">
          <div class="panel panel-default">
            <div class="panel-heading">
              <strong>Second Race</strong>
            </div>

            <div class="panel-body" v-if="!gridReady('raceTwo')">
              <p>Grid positions are not available yet</p>
            </div>

            <div class="panel-body" v-if="gridReady('raceTwo') && !raceComplete('raceTwo', 'A')">
              <race-grid show-race="raceTwo" show-group="A"></race-grid>
            </div>
            <race-results v-else show-race="raceTwo" show-group="A"></race-results>

            <div class="panel-body" v-if="gridReady('raceTwo') && !raceComplete('raceTwo', 'B')">
              <race-grid show-race="raceTwo" show-group="B"></race-grid>
            </div>
            <race-results v-else show-race="raceTwo" show-group="B"></race-results>

          </div><!-- panel -->
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <qualifier-results></qualifier-results>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
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
