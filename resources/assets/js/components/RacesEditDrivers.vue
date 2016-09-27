<template>
  <div>

    <p v-if="!drivers.length" class="Message--no-data">No registered drivers.</p>

    <section v-else class="Drivers-list">

      <div class="Media Driver-Card Driver-Card--selectable"
        v-for="driver in drivers" @click="toggleSelect(driver)"
      >
        <img class="Media__Figure Driver-Card__Photo" :src="driver.photo | driverPhoto">
        <div class="Media__Body Driver-Card__Info">
          <h4>
            {{ driver.name }}
          </h4>
            <img :src="driver.country | countryFlag" :alt="driver.country">
        </div>
        <div class="Driver-Card__Mask" transition="floatUp" v-if="selectedIds.indexOf(driver.id) > -1">
          <p>
            <span class="icon-ok"></span>
          </p>
        </div>
      </div>

    </section>

    <button @click="updateDrivers" class="Btn Btn--submit" :class="{ 'loading': loading }">Save</button>

  </div>
</template>

<script>
  import { getCurrentRace } from '../vuex/races/getters'
  import { getAllDrivers } from '../vuex/drivers/getters'
  import { updateRaceDrivers, setEditorView } from '../vuex/races/actions'

  export default {
    vuex: {
      getters: {
        race: getCurrentRace,
        drivers: getAllDrivers
      },
      actions: {
        updateRaceDrivers,
        setEditorView
      }
    },
    data () {
      return {
        originalIds: [],
        selectedIds: [],
        loading: false
      }
    },
    computed: {
      addedIds () {
        return this.selectedIds.filter((id) => {
          return this.originalIds.indexOf(id) === -1
        })
      },
      removedIds () {
        return this.originalIds.filter((id) => {
          return this.selectedIds.indexOf(id) === -1
        })
      }
    },
    methods: {
      toggleSelect (driver) {
        let index = this.selectedIds.indexOf(driver.id)
        if (index === -1) this.selectedIds.push(driver.id)
        else this.selectedIds.splice(index, 1)
      },
      updateDrivers () {
        this.loading = true
        this.updateRaceDrivers(this.race.id, this.addedIds, this.removedIds)
          .then(() => this.loading = false)
          .then(() => this.$router.go({ name: 'races.show', params: {id: this.$route.params.id } }))
      }
    },
    created () {
      this.originalIds = this.race.records.data.map(record => record['driver_id'])
      this.selectedIds = this.originalIds.slice()
    }
  }
</script>
