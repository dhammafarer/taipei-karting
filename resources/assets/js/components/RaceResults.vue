<template>
  <div class="Race-Results" v-if="raceComplete(showRace, showGroup)">
    <div class="Panel">

      <section class="Panel__Heading">
        <div class="Panel__Title">
          <span class="icon-flag-checkered">{{ showRace === 'raceOne' ? '1st' : '2nd' }} Race Group {{ showGroup }}</span>
        </div>
      </section>

      <section class="Panel__Body">

        <ul v-if="groupReady(showGroup)" class="list-group">
          <li href="#" v-for="record in race.records.data | filterBy showGroup in raceGroup | orderBy byPosition" class="list-group-item">
            <span class="label label-primary">{{ record[showRace] | raceRecord }}</span>
            <span>{{ record.driver.data.name }}</span>
          </li>
        </ul>

      </section>

    </div><!-- Panel -->
  </div><!-- Race-Results -->

</template>

<script>
  import { getCurrentRace } from '../vuex/races/getters'
  import { raceComplete, raceOnePosition, raceTwoPosition } from '../filters'

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
      raceComplete,
      raceOnePosition,
      raceTwoPosition,
      groupReady (group) {
        return this.race.records.data.some((r) => {
          return r[this.raceGroup] === group
        })
      }
    }
  }
</script>
