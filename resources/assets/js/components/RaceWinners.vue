<template>
  <div class="Race__Winners">
    <ul>
      <li v-for="record in race.records.data">{{ record.driver.data.name }}</li>
    </ul>
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
      groupA () {
        let driversOneA = this.race.records.data.filter(record => record.raceOneGroup === 'A').length
        let driversTwoA = this.race.records.data.filter(record => record.raceTwoGroup === 'A').length
        return { one: driversOneA, two: driversTwoA }
      },
      points () {
      }
    }
  }
</script>
