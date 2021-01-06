<template>
<div>
  <slot></slot>
  <el-pagination
    background
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    :current-page="currpage||1"
    :page-sizes="[10, 20, 50]"
    :page-size="pagesize||10"
    layout="total, prev, pager, next, sizes"
    :total="total"
    style="margin-top: 22px;"
    >
  </el-pagination>
</div>
</template>

<script>
  export default {
    name: "Table",
    props: ['callback', 'total', 'currpage', 'pagesize'],
    methods: {
      handleCurrentChange (d) {
        this.$props.callback&&this.$props.callback({
          currPage: d,
          pageSize: this.pagesize
        })
      },
      handleSizeChange (d) {
        this.$props.callback&&this.$props.callback({
          currPage: this.currpage,
          pageSize: d
        })
      },
    },
  }
</script>

<style scoped>

</style>
