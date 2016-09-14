<template>
  <div class="Edit-Races">
    <p v-if="!race.records.data.length">No drivers selected</p>

    <div v-else>

      <div class="Panel">
        <div v-if="round === 'one'" class="Panel__Heading">First Race Standings</div>
        <div v-if="round === 'two'" class="Panel__Heading">Second Race Standings</div>
        <table class="table">
          <tr>
            <th>#</th><th>Name</th><th>Group</th><th>Position</th>
          </tr>

          <tr v-for="record in race.records.data">
            <td><span class="Edit-Races__Standing"></span></td>

            <td>{{ record.driver.data.name }}</td>

            <td v-if="round === 'one'">
              <button @click="record.raceOneGroup = 'A'" class="Btn" :class="{ 'Btn--active': record.raceOneGroup === 'A' }">A</button>
              <button @click="record.raceOneGroup = 'B'" class="Btn" :class="{ 'Btn--active': record.raceOneGroup === 'B' }">B</button>
            </td>

            <td v-if="round === 'two'">
              <button @click="record.raceTwoGroup = 'A'" class="Btn" :class="{ 'Btn--active': record.raceTwoGroup === 'A' }">A</button>
              <button @click="record.raceTwoGroup = 'B'" class="Btn" :class="{ 'Btn--active': record.raceTwoGroup === 'B' }">B</button>
            </td>

            <td v-if="round === 'one'">
              <input class="form-field" v-model="record.raceOne" type="number" min="1" max="99" placeholder="Pos">
            </td>

            <td v-if="round === 'two'">
              <input class="form-field" v-model="record.raceTwo" type="number" min="1" max="99" placeholder="Pos">
            </td>
          </tr>
        </table>
      </div>

    </div>

    <button @click="updateRecords" class="Btn Btn--submit" :class="{ 'loading': loading }">Save</button>

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
        race: {},
        loading: false
      }
    },
    methods: {
      byQualTime,
      updateRecords () {
        this.loading = true
        this.updateRaceRecords(this.race.id, this.race.records)
          .then(() => this.$router.go({ name: 'races.show', params: { id: this.$route.params.id } }))
          .catch(() => this.loading = false)
      }
    },
    created () {
      this.race = JSON.parse(JSON.stringify(this.currentRace))
    }
  }
</script>
