<template>
  <div class="dropdown-container">
    <button class="btn btn-sm btn-default dropbtn"
      v-show="$route.name === 'races.show'"
      @click="toggleDropdown"
      >
      Edit Race
    </button>

    <div v-if="editDropdown === true" class="dropdown">
      <div class="list-group">
        <a @click="setEditorView('details')" v-link="linkEdit" class="list-group-item" href="#">Details</a>
        <a @click="setEditorView('drivers')" v-link="linkEdit" class="list-group-item" href="#">Drivers</a>
        <a @click="setEditorView('qualOne')" v-link="linkEdit" class="list-group-item" href="#">1st Qual</a>
        <a @click="setEditorView('qualTwo')" v-link="linkEdit" class="list-group-item" href="#">2nd Qual</a>
        <a @click="setEditorView('raceOne')" v-link="linkEdit" class="list-group-item" href="#">1st Race</a>
        <a @click="setEditorView('raceTwo')" v-link="linkEdit" class="list-group-item" href="#">2nd Race</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { setEditorView } from '../vuex/races/actions'

  export default {
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
        var self = this
        var handler = function(e) {
          e.stopPropagation()
          if (e.target !== document.querySelector('dropdown-container')) self.editDropdown = false
          document.removeEventListener('click', handler)
        }
        document.addEventListener('click', handler)
      }
    }
  }
</script>

<style>
  .dropdown-container {
    position: relative;
  }

  .dropdown {
    margin-top: 5px;
    position: absolute;
    right: 0;
    width: 200px;
    z-index: 10;
  }
</style>
