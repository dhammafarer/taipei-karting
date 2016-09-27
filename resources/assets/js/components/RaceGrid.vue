<template>
  <div class="Race-Grid" v-if="gridReady(showRace, showGroup) && !raceComplete(showRace, showGroup)">
    <div class="Panel">

      <section class="Panel__Heading">
        <div class="Panel__Title">
          <span>{{ showRace === 'raceOne' ? 'First' : '2nd' }} Race Grid</span> <span class="label label-primary">{{ showGroup }}</span>
        </div>
      </section>

      <section class="Panel__Body">

        <div class="Grid" v-if="byGroup(showGroup)">
          <div class="Grid__Positions">
            <div class="Grid__Position"
              v-for="record in race.records.data | filterBy showGroup in raceGroup | orderBy byRace"
              >
              <div>
                <p>{{ record.driver.name }}</p>
                <img class="img img-circle" :src="record.driver.data.photo | driverPhoto">
              </div>
            </div>
          </div>
        </div>

      </section>

    </div><!-- Panel -->
  </div><!-- Race-Grid -->

</template>

<script>
  import { getCurrentRace } from '../vuex/races/getters'
  import { gridReady, raceComplete, byQualTime, byQualTimeReverse } from '../filters'

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
      byRace () {
        if (this.showRace === 'raceOne') {
          return this.byQualTime
        }
        if (this.showRace === 'raceTwo') {
          return this.byQualTimeReverse
        }
      }
    },
    methods: {
      raceComplete,
      gridReady,
      byQualTime,
      byQualTimeReverse,
      byGroup (group) {
        return this.race.records.data.some((r) => {
          return r[this.raceGroup] === group
        })
      }
    }
  }
</script>
