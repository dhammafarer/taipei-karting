<template>
  <div class="Qualifier-Results">

    <div class="Panel">
      <div class="Panel__Heading">
        <div class="Panel__Title"><span class="icon-stopwatch">Qualifiers</span></div>
      </div>
      <div class="Panel__Body">
        <table class="table table-striped">
          <tr>
            <th>Driver</th><th>First</th><th>Second</th>
          </tr>

          <tr href="#" v-for="record in race.records.data | orderBy qualTime">
            <td>
              {{ record.driver.data.name }}
            </td>

            <td>
              <span class="Label" :class="record.qualOne < record.qualTwo && record.qualOne ? 'Label--secondary': 'Label--primary'">
                {{ record.qualOne | raceRecord }}
              </span>
            </td>

            <td>
              <span class="Label" :class="record.qualOne > record.qualTwo && record.qualTwo ? 'Label--secondary': 'Label--primary'">
                {{ record.qualTwo | raceRecord }}
              </span>
            </td>
          </tr>
        </table>

      </div>
    </div><!-- Panel -->

  </div>
</template>

<script>
  import { getCurrentRace } from '../vuex/races/getters'
  import { byQualTime } from '../filters'

  export default {
    vuex: {
      getters: {
        race: getCurrentRace
      }
    },
    methods: {
      byQualTime
    }
  }
</script>
