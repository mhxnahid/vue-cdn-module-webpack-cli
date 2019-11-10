<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Login</div>
      <div class="card-body">
        <form action @submit.prevent="loginUserSend">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="fields.username"
              type="text"
              class="form-control"
              id="username"
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="fields.password"
              type="password"
              class="form-control"
              id="password"
              placeholder
            />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data(){
        return{
            fields: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions(['loginUser']),
        loginUserSend(){
            this.loginUser(this.fields)
        }
    }

};
</script>