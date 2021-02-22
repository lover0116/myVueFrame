<template>
  <el-dialog :visible.sync="dialogVisible" :title="title" @close="resetForm">
    <slot></slot>
    <div slot="footer" class="dialog-footer x-tc">
      <el-button v-if="editable" type="primary" @click="confirm" :loading="loading">确 定</el-button>
      <el-button @click="closeDialog">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "DialogRefuse",
    emit: ['confirm', 'resetForm'],
    props: {
      title: {
        type: String,
        default: "提示"
      },
      editable: {
        type: Boolean,
        default: true
      }
    },
    data(){
      return {
        dialogVisible: false,
      }
    },
    computed: {
      loading(){
        return this.$store.state.base.btnLoading;
      }
    },
    methods: {
      closeDialog(){
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
    }
  }
</script>

<style scoped>

</style>
