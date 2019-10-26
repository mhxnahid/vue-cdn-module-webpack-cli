<template>
  <div>
    This is the home page
    <div class="time">Today is {{time}}</div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            time: 'Monday'
        }
    },
};
</script>

<style scoped>
.time{
    color: red;
}
</style>