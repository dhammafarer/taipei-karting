<template>
  <div>

    <div v-if="menu === true" transition="fade" @click="closeMenu" class="Mask"></div>
    <section v-if="menu === true" transition="slideFromRight" class="Edit-menu">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="Edit-menu__Close">
              <button class="Btn" @click="closeMenu">
                <span class="icon-cancel-outline"></span>
              </button>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12">
            <div class="Races__Banner">
              <div class="Races__Title">{{ race.name }}</div>
              <span>Race Editor</span>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12">
            <div class="Edit-menu__list">
              <div class="list-group">
                <a @click="setEditor('details')" v-link="linkEdit" class="list-group-item" href="#"><span class="icon-doc-text"></span>Details</a>
                <a @click="setEditor('drivers')" v-link="linkEdit" class="list-group-item" href="#"><span class="icon-user-plus"></span>Drivers</a>
                <a @click="setEditor('qualOne')" v-link="linkEdit" class="list-group-item" href="#"><span class="icon-stopwatch"></span>1st Qual</a>
                <a @click="setEditor('qualTwo')" v-link="linkEdit" class="list-group-item" href="#"><span class="icon-stopwatch"></span>2nd Qual</a>
                <a @click="setEditor('raceOne')" v-link="linkEdit" class="list-group-item" href="#"><span class="icon-flag-checkered"></span>1st Race</a>
                <a @click="setEditor('raceTwo')" v-link="linkEdit" class="list-group-item" href="#"><span class="icon-flag-checkered"></span>2nd Race</a>
              </div>
              <races-delete-modal></races-delete-modal>

            </div>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<script>
  import { setEditorView } from '../vuex/races/actions'
  import { getCurrentRace } from '../vuex/races/getters'
  import RacesDeleteModal from './RacesDeleteModal.vue'

  export default {
    components: {
      RacesDeleteModal
    },
    vuex: {
      actions: {
        setEditorView
      },
      getters: {
        race: getCurrentRace
      }
    },
    props: [ 'menu' ],
    computed: {
      linkEdit () {
        return { name: 'races.edit', params: { id: this.$route.params.id } }
      }
    },
    methods: {
      setEditor (view) {
        this.setEditorView(view)
        this.closeMenu()
      },
      closeMenu () {
        this.menu = false
        document.querySelector('html').style.overflow = 'scroll'
      }
    }
  }

</script>
