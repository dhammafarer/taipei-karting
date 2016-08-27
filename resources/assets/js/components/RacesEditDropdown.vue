<template>
  <div>

    <button class="btn btn-sm btn-default dropbtn"
      v-show="$route.name === 'races.show'"
      @click="toggleDropdown"
      >
      Edit Race
    </button>

    <div v-if="editDropdown === true" transition="fade" class="Edit-panel__mask"></div>
    <section v-if="editDropdown === true" transition="slideFromRight" class="Edit-panel">
      <div class="Edit-panel__list">
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
        editDropdown: false
      }
    },
    computed: {
      linkEdit () {
        return { name: 'races.edit', params: { id: this.$route.params.id } }
      }
    },
    methods: {
      toggleDropdown (e) {
        e.stopPropagation()
        this.editDropdown = !this.editDropdown
        let body = document.querySelector('body')
        body.style.overflow = 'hidden'
        let self = this
        let handler = function(e) {
          e.stopPropagation()
          if (e.target !== document.querySelector('dropdown-container')) self.editDropdown = false
          document.removeEventListener('click', handler)
          body.style.overflow = 'auto'
        }
        document.addEventListener('click', handler)
      }
    }
  }
</script>

<style>
  .Edit-panel {
    position: fixed;
    height: 100%;
    top: 0;
    right: 0;
    z-index: 9997;
    background-color: darkgrey;
    box-shadow: -5px 0 10px 0 rgba(0,0,0,.5);
    overflow-y: auto;
  }

  .Edit-panel__mask {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 9995;
    background-color: rgba(0,0,0,.5);
  }

  .Edit-panel__list {
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
