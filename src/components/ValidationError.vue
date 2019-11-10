<template>
  <ul class="pt-1">
      <li class="text-danger" v-for="(e, index) in errors" v-bind:key="`error-${index}`">{{e}}</li>
  </ul>
</template>

<script>
export default {
    data(){
        return {
            //
        }
    },
    props: ['errors'],
}
</script>