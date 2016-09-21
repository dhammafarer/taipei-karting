<template>
  <div class="Race-Grid" v-if="gridReady(showRace, showGroup) && !raceComplete(showRace, showGroup)">
    <div class="Panel">

      <section class="Panel__Heading">
        <div class="Panel__Title">
          <span>{{ showRace === 'raceOne' ? 'First' : '2nd' }} Race Grid</span> <span class="label label-primary">{{ showGroup }}</span>
        </div>
      </section>

      <section class="Panel__Body">

        <div class="grid" v-if="byGroup(showGroup)">
          <div class="grid__positions">
            <div class="grid__position"
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

<style>
  .grid {
    width: 90%;
    margin: auto;
    margin-bottom: 60px;
  }
  .grid__positions {
    counter-reset: position;
  }
  .grid__position::before {
    counter-increment: position;
    content: counter(position);
    background-color: grey;
    color: white;
    text-align: center;
    padding: 0 5px;
    position:absolute;
    left: 0%;
  }
  .grid__position {
    width: 40%;
    height: 1.3em;
    text-align: center;
    border-color: grey;
    border-style: solid;
    border-width: 1px 1px 0px 0px;
    position: relative;
    margin-bottom: 10%;
  }
  .grid__position:first-child {
    margin-top: 0px;
  }
  .grid__position:nth-child(odd) {
    margin-left: 50%;
  }
  .grid__position:last-child {
  }

  .grid__position div {
    width: 100%;
    position: absolute;
    text-align: center;
  }
  .grid__position img {
    width: 50%;
    margin-top: 2%;
  }

  .grid__position p {
    margin: 1px auto;
  }
</style>
