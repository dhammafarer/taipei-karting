<template>
  <div>

    <div v-if="menu  === true" transition="fade" @click="closeMenu" class="Mask"></div>
    <section v-if="menu === true" transition="slideFromRight" class="Edit-menu">
      <div class="container">
        <div class="Edit-menu__Close">
          <button class="Btn" @click="closeMenu">
            <span class="icon-cancel-outline"></span>
          </button>
        </div>
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
    </section>

  </div>
</template>

<script>
  import { setEditorView } from '../vuex/races/actions'
  import RacesDeleteModal from './RacesDeleteModal.vue'

  export default {
    components: {
      RacesDeleteModal
    },
    vuex: {
      actions: {
        setEditorView
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
      openMenu () {
        this.menu = true
        document.querySelector('html').style.overflow = 'hidden'
      },
      closeMenu () {
        this.menu = false
        document.querySelector('html').style.overflow = 'scroll'
      }
    }
  }

</script>

<style lang="sass">
  @import 'resources/assets/sass/_variables.scss';

  .Edit-menu {
    position: fixed;
    height: 100%;
    top: 0;
    right: 0;
    z-index: 9997;
    background-color: $body-color;
    box-shadow: -5px 0 10px 0 rgba(0,0,0,.5);
    overflow-y: auto;
    padding: 10px 0;
  }

  .Mask {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 9995;
    background-color: rgba(0,0,0,.5);
  }

  .Edit-menu__list {
    z-index: 9999;
    padding: 10px 0;
  }

  .slideFromRight-transition {
    transition: all .3s ease;
    width: 100%;
  }

  .slideFromRight-enter, .slideFromRight-leave {
    opacity: 0;
    width: 0;
  }
</style>
