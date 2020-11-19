<template>
  <el-dialog title="DialogForm" :visible.sync="visible2">
    ###
  </el-dialog>
</template>

<script>
  export default {
    name: "DialogForm",
    props: ['visible'],
    data(){
      return {
        visible2: false
      }
    },
    watch: {
      visible(val){
        this.visible2 = val;
      },
      visible2(val){
        this.$emit('upVisible', val);
      }
    },
    created(){
      console.log('@@@')
    }
  }
</script>

<style scoped>

</style>
