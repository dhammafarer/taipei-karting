<template>
  <div>

    <button class="btn btn-sm btn-default"
      v-show="$route.name === 'races.show'"
      @click.stop="openMenu"
      >
      Edit Race
    </button>

    <div v-if="menu  === true" transition="fade" class="Mask"></div>
    <section v-if="menu === true" transition="slideFromRight" class="Edit-menu">
      <div class="Edit-menu__list">
        <div class="list-group">
          <a @click="setEditorView('details')" v-link="linkEdit" class="list-group-item" href="#">Details</a>
          <a @click="setEditorView('drivers')" v-link="linkEdit" class="list-group-item" href="#">Drivers</a>
          <a @click="setEditorView('qualOne')" v-link="linkEdit" class="list-group-item" href="#">1st Qual</a>
          <a @click="setEditorView('qualTwo')" v-link="linkEdit" class="list-group-item" href="#">2nd Qual</a>
          <a @click="setEditorView('raceOne')" v-link="linkEdit" class="list-group-item" href="#">1st Race</a>
          <a @click="setEditorView('raceTwo')" v-link="linkEdit" class="list-group-item" href="#">2nd Race</a>
        </div>
        <races-delete-modal></races-delete-modal>
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
    data () {
      return {
        menu: false
      }
    },
    computed: {
      linkEdit () {
        return { name: 'races.edit', params: { id: this.$route.params.id } }
      }
    },
    methods: {
      openMenu () {
        let body = document.querySelector('body')
        body.style.overflow = 'hidden'
        let handler = function(e) {
          e.stopPropagation()
          body.style.overflow = 'auto'
          if (e.target === document.querySelector('.Mask')) {
            this.menu = false
            body.removeEventListener('click', handler)
          }
        }.bind(this)
        this.menu = true
        body.addEventListener('click', handler)
      }
    }
  }
</script>

<style>
  .Edit-menu {
    position: fixed;
    height: 100%;
    top: 0;
    right: 0;
    z-index: 9997;
    background-color: darkgrey;
    box-shadow: -5px 0 10px 0 rgba(0,0,0,.5);
    overflow-y: auto;
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
  }

  .slideFromRight-transition {
    transition: all .3s ease;
    width: 300px;
  }

  .slideFromRight-enter, .slideFromRight-leave {
    opacity: 0;
    width: 0;
  }
</style>
