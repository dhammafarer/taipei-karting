<template>
  <div class="Race-Classification">

    <div class="Panel">
      <div class="Panel__Heading">
        <div class="Panel__Title">Final Standings</div>
      </div>

      <div class="Panel__Body">
        <table class="table table-striped">
          <tr>
            <th>#</th><th>Driver</th><th>Total</th>
          </tr>

          <tr v-for="driver in drivers">
            <td>
              <span class="Label Label--primary">{{ $index + 1 }}</span>
            </td>
            <td>
              <img class="img" :src="driver.country | countryFlag" alt="">
              {{ driver.name }}
            </td>
            <td>
              {{ driver.total }} pts
            </td>
          </tr>
        </table>

      </div>

    </div><!-- Panel -->

  </div><!-- Race-Classification -->
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
      }
    }
  }
</script>
