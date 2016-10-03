<template>
  <div class="Home-Page">
    <div class="container page">
      <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
          <general-classification></general-classification>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GeneralClassification from './GeneralClassification.vue'

  export default {
    name: 'HomePage',
    components: {
      GeneralClassification
    }
  }
</script>
