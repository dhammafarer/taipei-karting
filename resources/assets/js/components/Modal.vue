<template>
  <div class="Modal" v-if="show">
    <div class="Modal__mask" @click="show = false">
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
            <slot name="footer"></slot>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
