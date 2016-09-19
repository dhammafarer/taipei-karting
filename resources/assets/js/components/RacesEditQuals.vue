<template>
  <div>

    <p v-if="!race.records.data.length">No drivers selected</p>

    <div v-else>

      <div class="Panel">
        <div v-if="round === 'one'" class="Panel__Heading">First Qualifier</div>
        <div v-if="round === 'two'" class="Panel__Heading">Second Qualifier</div>
        <table class="table">
          <tr>
            <th>Name</th><th>Fastest Lap</th>
          </tr>

          <tr v-for="record in race.records.data">
            <td>{{ record.driver.data.name }}</td>

            <td v-if="round === 'one'">
              <input class="form-field" v-model="record.qualOne" type="number" min="1" max="999" placeholder="00.000s">
            </td>

            <td v-if="round === 'two'">
              <input class="form-field" v-model="record.qualTwo" type="number" min="1" max="999" placeholder="00.000s">
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
