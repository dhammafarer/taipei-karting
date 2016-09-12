<template>
  <div class="race__results">
    <h3>Log Race Results</h3>

    <p v-if="!race.records.length">No drivers selected</p>

    <div v-else>
      <div class="row">

        <div class="header">
          <div class="col-sm-3">
            <p><strong>Name</strong></p>
          </div>
          <div class="col-sm-4">
            <p><strong>Race Group</strong></p>
          </div>
          <div class="col-sm-4">
            <p><strong>Final Position</strong></p>
          </div>
        </div>
      </div>

      <div class="row" v-for="record in race.records | orderBy byQualTime">

        <div class="col-sm-3">
          <p class="driver__name">{{ record.driver.name }}</p>
        </div>

        <div v-if="round === 'one'">
          <div class="col-sm-4">
            <select v-if="round === 'one'" v-model="record.raceOneGroup">
              <option disabled>Select Group</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
          <div class="col-sm-4">
            <input v-model="record.raceOne" type="number" placeholder="Position">
          </div>
        </div>

        <div v-if="round === 'two'">
          <div class="col-sm-4">
            <select v-model="record.raceTwoGroup">
              <option disabled>Select Group</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
          <div class="col-sm-4">
            <input v-model="record.raceTwo" type="number" placeholder="Position">
          </div>
        </div>

      </div><!-- row -->
    </div>

    <button class="btn btn-primary"
      @click="updateRecords"
    >
      Save
    </button>

    <button class="btn btn-default"
      v-link="{ name: 'races.show', params: { id: $route.params.id } }"
    >
      Cancel
    </button>
  </div>
</template>

<script>
  import { updateRaceRecords } from '../vuex/races/actions'
  import { getCurrentRace } from '../vuex/races/getters'
  import { byQualTime } from '../filters'

  export default {
    vuex: {
      getters: {
        currentRace: getCurrentRace
      },
      actions: {
        updateRaceRecords
      }
    },
    props: ['round'],
    data () {
      return {
        race: {}
      }
    },
    methods: {
      byQualTime,
      updateRecords () {
        this.updateRaceRecords(this.race.id, this.race.records)
        this.$router.go({ name: 'races.show', params: { id: this.$route.params.id } })
      }
    },
    created () {
      this.race = JSON.parse(JSON.stringify(this.currentRace))
    }
  }
</script>

<style>
  .race__results {
    counter-reset: position;
  }
  .driver__name::before {
    counter-increment: position;
    content: counter(position);
    margin-right: 5px;
    text-align: center;
    color: white;
    background-color: grey;
    padding: 2px 6px;
    border-radius: 2px;
  }
</style>
