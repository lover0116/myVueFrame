<template>
  <div>
    <el-button @click="visible=true">@@</el-button>
    <DialogForm :visible="visible" v-on:upVisible="upVisible"></DialogForm>
  </div>
</template>

<script>
  import DialogForm from "./DialogForm";
  export default {
    name: "Dialog",
    data(){
      return {
        visible: false
      }
    },
    components: {
      DialogForm
    },
    methods:{
      upVisible(val){
        this.visible = val;
      }
    }
  }
</script>

<style scoped>

</style>
