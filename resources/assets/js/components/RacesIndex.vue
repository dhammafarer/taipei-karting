<template>
  <div class="container">

    <div class="col-sm-8">

      <h3>
        Races
        <button v-show="$route.name === 'races.index'" transition="fade" class="pull-right btn btn-primary btn-sm" v-link="{ name: 'races.create' }">Create New</button>
      </h3>
      <hr>

      <router-view transition transition-mode="out-in" class="view"></router-view>

      <div class="list-group">
        <a class="list-group-item" href="#"
          v-for="race in races"
          v-link="{ name: 'races.show', params: { id: race.id } }"
        >
          <img class="img img-responsive pull-left" :src="race.photo | racePhoto" width="50px" height="50px">
          <h4>{{ race.name }}</h4>
        </a>
      </div>

    </div>

  </div>
</template>

<script>
  import { fetchAllRaces } from '../vuex/races/actions'
  import { getAllRaces } from '../vuex/races/getters'

  export default {
    name: 'racesIndex',
    vuex: {
      actions: {
        fetchAllRaces
      },
      getters: {
        races: getAllRaces
      }
    },
    route: {
      data () {
        this.fetchAllRaces()
      }
    }
  }
</script>

<style lang="sass">
  .view {
    max-height: 1000px;
    transition: max-height .3s ease-in;
    overflow: hidden;
    &.v-enter, &.v-leave {
      max-height: 0;
    }
  }

  .fade-transition {
    transition: opacity .3s ease;
  }

  .fade-enter, .fade-leave {
    opacity: 0;
  }
</style>
