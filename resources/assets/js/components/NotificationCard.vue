<template>
  <div class="Notification" :class="'Notification--' + notification.type">
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
    computed: {
    },
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
    border: 1px solid grey;
    border-radius: 4px;
    min-width: 250px;
  }

  .Notification--success {
    background-color: rgba(124,178,71,.8);
  }

  .Notification--danger {
    background-color: rgba(226,112,35,.8);
  }
</style>
