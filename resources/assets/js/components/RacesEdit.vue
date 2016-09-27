<template>
  <div>
    <div class="Races__Banner">
      <div class="Races__Title">{{ race.name }} <span v-if="view">/ {{ view | capitalize }}</span></div>
      <span>Race Editor</span>
      <div class="Races-Edit__Button">
        <button class="Btn" v-link="{ name: 'races.show', params: { id: $route.params.id } }">To Race</button>
      </div>
    </div>

    <section v-show="view === null">
      <div class="list-group">
        <a class="list-group-item" @click="setEditorView('details')">Details</a>
        <a class="list-group-item" @click="setEditorView('drivers')">Drivers</a>
        <a class="list-group-item" @click="setEditorView('qualOne')">1st Qual</a>
        <a class="list-group-item" @click="setEditorView('qualTwo')">2nd Qual</a>
        <a class="list-group-item" @click="setEditorView('raceOne')">1st Race</a>
        <a class="list-group-item" @click="setEditorView('raceTwo')">2nd Race</a>
      </div>
    </section>

    <edit-details v-if="view === 'details'"></edit-details>
    <edit-drivers v-if="view === 'drivers'"></edit-drivers>
    <qual-one round="one" v-if="view === 'qualOne'"></qual-one>
    <qual-two round="two" v-if="view === 'qualTwo'"></qual-two>
    <race-one round="one" v-if="view === 'raceOne'"></race-one>
    <race-two round="two" v-if="view === 'raceTwo'"></race-two>

  </div>
</template>

<script>
  import RacesEditDetails from './RacesEditDetails.vue'
  import RacesEditDrivers from './RacesEditDrivers.vue'
  import RacesEditQuals from './RacesEditQuals.vue'
  import RacesEditRaces from './RacesEditRaces.vue'
  import { setEditorView } from '../vuex/races/actions'
  import { getCurrentRace, getEditorView } from '../vuex/races/getters'

  export default {
    name: 'RacesEdit',
    components: {
      editDetails: RacesEditDetails,
      editDrivers: RacesEditDrivers,
      qualOne: RacesEditQuals,
      qualTwo: RacesEditQuals,
      raceOne: RacesEditRaces,
      raceTwo: RacesEditRaces
    },
    vuex: {
      actions: {
        setEditorView
      },
      getters: {
        view: getEditorView,
        race: getCurrentRace
      }
    },
    route: {
      deactivate () {
        this.setEditorView(null)
      }
    }
  }
</script>
