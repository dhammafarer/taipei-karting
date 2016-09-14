<template>
  <div>

    <h4>Select Drivers</h4>

    <p v-if="!drivers.length" class="Message--no-data">No registered drivers.</p>

    <section v-else class="Drivers-list">
      <div class="Driver col-sm-3" v-for="driver in drivers">
        <div class="thumbnail"
          @click="toggleSelect(driver)"
        >
          <img class="Driver-photo"
           :src="driver.photo | driverPhoto"
           :class="{ 'Driver-photo--selected': selectedIds.indexOf(driver.id) > -1 }"
          >
          <div class="caption text-center">
            <h4>{{ driver.name }}</h4>
          </div>
        </div>
      </div>
    </section>

    <button @click="updateDrivers" class="btn btn-primary">Save</button>
    <button @click="$router.go({ name: 'races.show', params: {id: $route.params.id} })" class="btn btn-default">Cancel</button>

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
        selectedIds: []
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
        this.updateRaceDrivers(this.race.id, this.addedIds, this.removedIds)
          .then(()=>this.$router.go({ name: 'races.show', params: {id: this.$route.params.id } }))
      }
    },
    created () {
      this.originalIds = this.race.records.data.map(record => record['driver_id'])
      this.selectedIds = this.originalIds.slice()
    }
  }
</script>

<style>
  .Driver {
    cursor: pointer;
  }

  .Driver-photo {
    opacity: .3;
    width: 100%;
    height: 100%;
  }

  .Driver-photo--selected, .Driver-photo:hover {
    opacity: 1;
    border: 4px solid darkgrey;
  }
</style>
