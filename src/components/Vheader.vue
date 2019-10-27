<template>
  <nav class="navbar">
    <div v-for="(item, index) in list" :key="`${index}-${item.l}`">
      <router-link :to="item.l">{{item.t}}</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { l: "/", t: "Home" },
        { l: "/about", t: "About" },
        { l: "/posts", t: "Posts" },
        { l: "/404", t: "404" }
      ]
    };
  }
};
</script>