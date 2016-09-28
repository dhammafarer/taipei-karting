<template>
  <div class="General">

    <div class="Panel">
      <div class="Panel__Heading">
        <div class="Panel__Title">General Classification</div>
      </div>

      <div class="Panel__Body">
        <table class="table table-striped">
          <tr>
            <th>#</th><th>Driver</th><th class="text-center">Pts</th><th class="text-center">Races</th><th class="text-center hidden-xs">Avg</th><th class="text-center">Wins</th>
          </tr>

          <tr v-for="driver in standings">
            <td>
              <span class="Label Label--primary">{{ $index + 1 }}</span>
            </td>
            <td>
              <img class="img" :src="driver.country | countryFlag" alt="">
              {{ driver.name }}
            </td>
            <td class="text-center">
              {{ driver.points.total }}
            </td>
            <td class="text-center">
              {{ driver.races }}
            </td>
            <td class="text-center hidden-xs">
              {{ driver.average }}
            </td>
            <td class="text-center">
              {{ driver.wins.length }}
            </td>
          </tr>
        </table>

      </div>

    </div><!-- Panel -->

  </div>
</template>

<script>
  import rules from '../utilities/race-rules'
  import { getAllRaces } from '../vuex/races/getters'
  import { getAllDrivers } from '../vuex/drivers/getters'

  export default {
    vuex: {
      getters: {
        races: getAllRaces,
        allDrivers: getAllDrivers
      }
    },
    computed: {
      driverRecords () {
        return rules.getDriversWithClassification(this.allDrivers, this.races)
      },
      standings () {
        return this.driverRecords.sort((a,b) => {
          return a.points.total < b.points.total ? 1 : -1
        })
      }
    }
  }
</script>
