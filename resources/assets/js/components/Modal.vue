<template>
  <div class="Modal">

    <div @click.stop="openModal">
      <slot name="trigger"></slot>
    </div>

    <div class="Modal__mask" v-if="modal">
      <div class="Modal__container">
        <div class="panel panel-default">

          <div class="panel-heading">
            <h3 class="panel-title">
              <slot name="title"></slot>
            </h3>
          </div>

          <div class="panel-body">
            <slot name="body"></slot>
          </div>

          <div class="panel-footer">
              <slot name="ok"></slot>
              <span @click="modal = false">
                <slot name="cancel"></slot>
              </span>
          </div>

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
          if (e.target === document.querySelector('.Modal__mask')) {
            body.removeEventListener('click', handler)
            this.modal = false
          }
        }.bind(this)
        this.modal = true
        body.addEventListener('click', handler)
      }
    }
  }
</script>

<style>
  .Modal {
    display: inline-block;
  }

  .Modal__mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9998;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    transition: opacity .3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
