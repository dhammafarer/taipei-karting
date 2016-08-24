<template>
  <div class="Notifications">
    <div class="Notification" v-for="notification in notifications">
      <span class="pull-right" @click="closeNotification(notification)">&times</span>
      <h3>{{ notification.title }}</h3>
      <p>{{ notification.body }}</p>
    </div>
  </div>
</template>

<script>
  import { getAllNotifications } from '../vuex/notifications/getters'
  import { closeNotification } from '../vuex/notifications/actions'

  export default {
    vuex: {
      getters: {
        notifications: getAllNotifications
      },
      actions: {
        closeNotification
      }
    }
  }
</script>

<style>
  .Notifications {
    position: fixed;
    z-index: 9999;
    top: 50px;
    right: 40px;
  }

  .Notification {
    padding: 0 10px 10px 10px;
    margin-bottom: 10px;
    background-color: darkgrey;
    opacity: .8;
    color: white;
    border: 2px solid grey;
    border-radius: 4px;
    min-width: 250px;
  }
</style>
