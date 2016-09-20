<template>
  <div v-if="racesComplete" class="Race-Winners">
    <div class="Panel">

      <div class="Panel__Heading">
        <div class="Panel__Title">
          <span class="icon-trophy">Race Winner</span>
        </div>
      </div>

      <div class="Panel__Body">

          <div class="Race-Winners__Winner">
            <div class="Race-Winners__Image">
              <img class="img img-circle" :src="drivers[0].photo | driverPhoto" alt="Photo...">
            </div>
            <div class="Race-Winners__Body">
              <div class="Race-Winners__Name">{{ drivers[0].name }}</div>
              <div class="Race-Winners__Points">{{ drivers[0].total }} points</div>
            </div>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
  import rules from '../utilities/race-rules'
  import { getCurrentRace } from '../vuex/races/getters'
  export default {
    vuex: {
      getters: {
        race: getCurrentRace
      }
    },
    computed: {
      drivers () {
        return rules.getDriversByPoints(this.race.records)
      },
      racesComplete () {
        return this.race.records.data.some(r => r.raceOne > 0) && this.race.records.data.some(r => r.raceTwo > 0)
      }
    }
  }
</script>
