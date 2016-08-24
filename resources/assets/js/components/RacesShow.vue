<template>
  <div v-if="$loadingRouteData">Loading...</div>
  <div v-else class="container">
    <section  class="Races-show__banner">
      <h3>
        {{ race.name }}
        <span class="label label-default" v-if="$route.name === 'races.edit'">Editor</span>
      </h3>
    </section>

    <hr>

    <div class="pull-right">
      <races-edit-dropdown></races-edit-dropdown>
    </div>

    <button class="pull-right btn btn-sm btn-default"
      v-show="$route.name === 'races.edit'"
      v-link="{ name: 'races.show', params: {id: race.id} }"
      >
      Back to Race
    </button>

    <router-view></router-view>

    <section v-if="$route.name === 'races.show'">
      <race-overview></race-overview>
    </section>
  </div>
</template>

<script>
  import RacesEditDropdown from './RacesEditDropdown.vue'
  import RaceOverview from './RaceOverview.vue'
  import { setEditorView, fetchCurrentRace, updateCurrentRaceId } from '../vuex/races/actions'
  import { getCurrentRace } from '../vuex/races/getters'

  export default {
    name: 'RacesShow',
    components: {
      RacesEditDropdown,
      RaceOverview
    },
    vuex: {
      actions: {
        fetchCurrentRace,
        updateCurrentRaceId,
        setEditorView
      },
      getters:{
        race: getCurrentRace
      }
    },
    computed: {
      racePhoto () {
        return this.$options.filters.racePhoto(this.race.photo)
      }
    },
    route: {
      data (transition) {
        this.updateCurrentRaceId(transition.to.params.id)
        transition.next()
      }
    }
  }
</script>

<style>
</style>
