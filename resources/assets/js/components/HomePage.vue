<template>
  <div class="Home-Page">
    <div class="container page">
      <general-classification></general-classification>
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
