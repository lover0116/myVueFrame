<template>
  <div class="hello">
    <h1>welcome</h1>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    mounted () {
      console.log(document.cookie);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .w_100 {
    width: 100px;
  }
</style>
