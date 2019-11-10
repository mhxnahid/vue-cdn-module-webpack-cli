<template>
  <nav class="navbar">
    <div v-for="(item, index) in list" :key="`${index}-${item.l}`">
      <router-link :to="item.l">{{item.t}}</router-link>
    </div>
      <router-link v-if="!getUserLogged" to="/login">Login</router-link>
      <router-link v-if="!getUserLogged" to="/register">Register</router-link>
      <span v-if="getUserLogged" @click="logOut">Logout {{getUser.username}}</span>
  </nav>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  computed: mapGetters(['getUserLogged', 'getUser']),
  methods: mapActions(['logOut']),
  data() {
    return {
      list: [
        { l: "/", t: "Home" },
        { l: "/about", t: "About" },
        //{ l: "/posts", t: "Posts" },
        { l: "/notifications", t: "Msaingar" },
        //{ l: "/login", t: "Login" },
        //{ l: "/register", t: "Register" },
        //{ l: "/404", t: "404" }
      ]
    };
  }
};
</script>