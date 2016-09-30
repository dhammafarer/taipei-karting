<template>
  <div class="Driver-History">

    <div class="Panel">
      <div class="Panel__Heading">
        <div class="Panel__Title">
          Racing History
        </div>
      </div>

      <div class="Panel__Body">
        <table class="table table-striped">
          <tr>
            <th>#</th><th>Date</th><th>Race</th><th>Standing</th><th>Points</th>
          </tr>

          <tr v-for="record in history">
            <td>
              <span>{{ $index + 1 }}</span>
            </td>
            <td>
              {{ record.race.date }}
            </td>
            <td>
              {{ record.race.name }}
            </td>
            <td>
              {{ record.standing }}
            </td>
            <td>
              {{ record.points.total }}
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
        drivers: getAllDrivers,
        races: getAllRaces
      }
    },
    props: ['driver'],
    computed: {
      history () {
        return rules.getDriverHistory(this.driver.id, this.races)
      }
    }
  }
</script>
