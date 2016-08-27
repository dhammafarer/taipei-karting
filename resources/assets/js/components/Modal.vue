<template>
  <div>

    <button class="btn btn-danger" @click.stop="openModal">Delete Race</button>

    <div class="Modal" v-if="modal">
      <div class="Modal__mask">
        <div class="Modal__container">
          <slot></slot>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        modal: false
      }
    },
    methods: {
      openModal() {
        let body = document.querySelector('body')
        let handler = function (e) {
          if (e.target === document.querySelector('.Modal__mask')) this.modal = false
          body.removeEventListener('click', handler)
        }.bind(this)
        this.modal = true
        body.addEventListener('click', handler)
      }
    }
  }
</script>

<style>
  .Modal__mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9998;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    transition: opacity .3s ease;
  }

  .Modal__container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
  }
</style>
