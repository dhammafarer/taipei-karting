<template>
  <div class="main">
    <h3>Qualifiers: Round {{ round | capitalize }}</h3>
    <p v-if="!race.records.length">No drivers selected</p>
    <div v-else>
      <div class="row">
        <div class="col-sm-3">
          <p><strong>Name</strong></p>
        </div>
        <div class="col-sm-3">
          <p><strong>Fastest Lap</strong></p>
        </div>
      </div>
      <div class="row" v-for="record in race.records">
        <div class="col-sm-3">
          <p>{{ record.driver.name }}</p>
        </div>
        <div class="col-sm-3">
          <div class="form-group">
            <input type="number" class="form-control" placeholder="00.000s"
              v-if="round === 'one'"
              v-model="record.qualOne"
            >
            <input type="number" class="form-control" placeholder="00.000s"
              v-if="round === 'two'"
              v-model="record.qualTwo"
            >
          </div>
        </div>
      </div>
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
</style>
