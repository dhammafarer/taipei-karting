<template>
    <div class="col-sm-4 col-sm-offset-4">
      <h2>Log In</h2>
      <p>Log in to your account</p>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="form-group">
        <input
          type="text"
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
      <div class="btn-container">
        <button class="submit" :class="{ 'loading': loading  }" @click="submit">Access</button>
      </div>
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

<style lang="sass">
  .btn-container {
    text-align: center;
  }
  .submit {
    appearance: none;
    outline: none;
    border: 3px solid #000;
    width: 100px;
    height: 40px;
    border-radius: 40px;
    background-color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all .3s ease;
    &:hover {
      background-color: #000;
      color: #fff;
    }
    &:active {
      letter-spacing: 2px;
    }
  }

  .loading {
    width: 40px;
    font-size:0;
    border-left-color: gray;
    animation: rotating 2s 0.25s linear infinite;
    &:after {
      content:"";
    }
    &:hover {
      color: black;
      background: white;
    }
  }

  .disabled {
    opacity: .5;
    cursor: not-allowed !important;
    &:hover {
      background-color: white;
      color: black;
    }
  }

  @keyframes rotating {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
