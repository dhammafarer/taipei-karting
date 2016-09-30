<template>
  <div class="Races">
    <div class="container page">

      <section class="Races__Banner">

        <div class="Races__Toolbar">
          <div class="Races__Title">Races {{ seasonYear }}</div>

          <div class="Races__Buttons">
            <button class="Btn Btn--large" :class="{ 'Btn--active': seasons }" @click="seasons = !seasons">
              <span class="icon-calendar"></span>
            </button>
            <button class="Btn Btn--large" :class="{ 'Btn--active': search }" @click="search = !search">
              <span class="icon-search"></span>
            </button>
            <button class="Btn Btn--large" :class="{ 'Btn--active': $route.name === 'races.create' }"
              v-link="linkCreate"
              >
              <span class="icon-plus"></span>
            </button>

          </div>
        </div>

        <div class="Races__Seasons" v-show="seasons">
          <button class="Btn" :class="{ 'Btn--active': seasonYear === '' }" @click="seasonYear = ''">All</button>
          <button class="Btn" :class="{ 'Btn--active': seasonYear === '2017' }" @click="seasonYear = '2017'">2017</button>
          <button class="Btn" :class="{ 'Btn--active': seasonYear === '2016' }" @click="seasonYear = '2016'">2016</button>
          <button class="Btn" :class="{ 'Btn--active': seasonYear === '2015' }" @click="seasonYear = '2015'">2015</button>
        </div>

        <div class="Races__Search Floated-form" v-show="search">
          <label transition="floatUp" v-show="searchString">Search Name</label>
          <input type="text" class="form-field" placeholder="Search Name"
            :class="{'has-input': searchString}"
            v-model="searchString"
          >
        </div>

      </section>

      <router-view transition transition-mode="out-in" class="view"></router-view>

      <race-card v-for="race in filteredRaces" :race="race"></race-card>

      <div v-if="filteredRaces.length === 0">No races match these criteria.</div>

    </div>
  </div>
</template>

<script>
  import { getAllRaces } from '../vuex/races/getters'
  import RaceCard from './RaceCard.vue'

  export default {
    name: 'racesIndex',
    components: { RaceCard },
    vuex: {
      getters: {
        races: getAllRaces
      }
    },
    data () {
      return {
        seasons: false,
        search: false,
        searchString: '',
        seasonYear: ''
      }
    },
    computed: {
      filteredRaces () {
        return this.races
          .filter(race => race.name.toLowerCase().indexOf(this.searchString.trim().toLowerCase()) > -1)
          .filter(race => race.date.toLowerCase().indexOf(this.seasonYear.trim().toLowerCase()) > -1)
      },
      linkCreate () {
        let linkTo = this.$route.name === 'races.create' ? 'races.index' : 'races.create'

        return { name: linkTo }
      }
    },
    ready () {
      let date = new Date()
      this.seasonYear = date.getFullYear() + ''
    }
  }
</script>
