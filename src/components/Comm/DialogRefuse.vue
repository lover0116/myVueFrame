<template>
  <el-dialog :width="width?width:'50%'" :visible.sync="dialogVisible" :title="title" @close="resetForm">
    <slot></slot>
    <div slot="footer" class="dialog-footer x-tc">
      <el-button type="primary" @click="confirm" :loading="loading">确 定</el-button>
      <el-button @click="closeDialog">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "DialogRefuse",
    emit: ['confirm', 'resetForm'],
    props: ["title", "width"],
    data(){
      return {
        dialogVisible: false,
        loading: false
      }
    },
    methods: {
      closeDialog(){
        this.loading = false;
        this.dialogVisible = false;
      },
      openDialog(){
        this.dialogVisible = true;
      },
      confirm(){
        this.$emit("confirm");
      },
      resetForm(){
        this.$emit("resetForm")
      },
      closeLoading(){
        this.loading = false;
      },
      openLoading(){
        this.loading = true;
      },
    }
  }
</script>

<style scoped>

</style>
