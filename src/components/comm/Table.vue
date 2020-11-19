<template>
<div>
  <slot></slot>
  <el-pagination
    background
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    :current-page="pageindex||1"
    :page-sizes="[10, 20, 30, 40, 50]"
    :page-size="pagesize||10"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total||1"
    style="margin-top: 22px;text-align: center"
    >
  </el-pagination>
</div>
</template>

<script>
  export default {
    name: "Table",
    props: ['pageCallback', 'total', 'pagesize', 'pageindex'],
    methods: {
      handleCurrentChange (d) {
        //console.log(d);
        this.$props.pageCallback({
          currPage: d
        })
      },
      handleSizeChange (d) {
        //console.log(d);
        this.$props.pageCallback({
          pageSize: d,
        })
      },
    },
  }
</script>

<style scoped>

</style>
