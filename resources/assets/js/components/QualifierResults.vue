<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <strong>Qualifiers</strong>
    </div>
    <ul class="list-group">
      <li href="#" v-for="record in race.records.data | orderBy qualTime" class="list-group-item">
        <div class="row">
          <div class="col-sm-4">
            {{ record.driver.data.name }}
          </div>
          <div class="col-sm-4">
            <span class="label"
              :class="record.qualOne < record.qualTwo && record.qualOne ? 'label-success': 'label-default'"
            >
              {{ record.qualOne | raceRecord }}
            </span>
          </div>
          <div class="col-sm-4">
            <span class="label label-default"
              :class="record.qualOne > record.qualTwo && record.qualTwo ? 'label-success': 'label-default'"
            >
              {{ record.qualTwo | raceRecord }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div><!-- panel -->
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
