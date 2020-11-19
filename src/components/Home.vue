<template>
  <div class="hello">
    <h1>welcome</h1>
    <div>{{count}}</div>
    <el-button @click="upCount">++++++</el-button>
    <br />
    -----
    <br />
    <div>{{list}}</div>
    --过滤b--<br />
    <div>{{nameA}}</div>
  </div>
</template>

<script>
  //import { test } from '@/api/index'
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'Home',
    computed: {
      ...mapState({
        count: state => state.xz.count,
        list: state=> state.xz.list
      }),
      ...mapGetters(['nameA'])
    },
    methods: {
      ...mapActions(['upCount'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .w_100 {
    width: 100px;
  }
</style>
