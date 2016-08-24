<template>
  <div class="Notification">
    <button class="pull-right" @click="closeNotification(notification)">&times</button>
    <p><strong>{{ notification.title }}</strong><br>
    {{ notification.body }}</p>
  </div>
</template>

<script>
  import { closeNotification } from '../vuex/notifications/actions'

  export default {
    vuex: {
      actions: {
        closeNotification
      }
    },
    props: [ 'notification' ],
    ready () {
      if (this.notification.type === 'success') {
        setTimeout(() => this.closeNotification(this.notification), 3000)
      }
    }
  }
</script>

<style>
  .Notification {
    padding: 5px;
    margin-bottom: 10px;
    background-color: darkgrey;
    opacity: .8;
    color: white;
    border: 2px solid grey;
    border-radius: 4px;
    min-width: 250px;
  }
</style>
