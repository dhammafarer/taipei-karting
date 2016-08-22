<template>
  <div v-if="groupReady(showGroup)" class="panel-body">Group {{ showGroup }}</div>
    <ul v-if="groupReady(showGroup)" class="list-group race__results">
      <li href="#" v-for="record in race.records | filterBy showGroup in raceGroup | orderBy byPosition" class="list-group-item">
        <img :src="record.driver.photo | driverPhoto">
        <span class="label label-default">{{ record[this.raceGroup] | raceRecord }}</span>
        <span class="label label-primary">{{ record[showRace] | raceRecord }}</span> {{ record.driver.name }}
      </li>
    </ul>
  </div>
</template>

<script>
  import { getCurrentRace } from '../vuex/races/getters'
  import { raceOnePosition, raceTwoPosition } from '../filters'

  export default {
    vuex: {
      getters: {
        race: getCurrentRace
      }
    },
    props: [ 'showRace', 'showGroup' ],
    computed: {
      raceGroup () {
        return this.showRace + 'Group'
      },
      byPosition () {
        if (this.showRace === 'raceOne') {
          return this.raceOnePosition
        }
        if (this.showRace === 'raceTwo') {
          return this.raceTwoPosition
        }
      }
    },
    methods: {
      raceOnePosition,
      raceTwoPosition,
      groupReady (group) {
        return this.race.records.some((r) => {
          return r[this.raceGroup] === group
        })
      }
    }
  }
</script>

<style scoped>
  .race__results img {
    width: 15%;
  }
</style>
