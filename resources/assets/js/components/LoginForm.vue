<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <p>Log in to your account</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input
        type="email"
        class="form-control"
        placeholder="Enter your email"
        v-model="credentials.email"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="credentials.password"
      >
    </div>

    <button class="Btn Btn--submit" :class="{ 'loading': loading  }" @click="submit">Access</button>
  </div>
</template>

<script>
  import auth from '../auth'
  import { addNotification } from '../vuex/notifications/actions'

  export default {
    vuex: {
      actions: {
        addNotification
      }
    },
    data () {
      return {
        credentials: {
          email: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      submit() {
        let credentials = {
          email: this.credentials.email,
          password: this.credentials.password
        }

        this.loading = true

        auth.authenticate(credentials, 'races')
          .catch((err) => {
            this.addNotification({title: 'Login Failed!', body: 'Invalid Credentials', type: 'danger'})
            this.credentials.password = ''
            this.loading = false
          })
      }
    }
  }
</script>
