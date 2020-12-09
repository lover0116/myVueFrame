<template>
  <div>
    <el-button @click="visible=true">@@</el-button>
    <DialogForm :visible="visible" v-on:upVisible="upVisible"></DialogForm>
    <Search :data="searchData" :callback="searchFun"></Search>
    <Table :total="total" :callback="getTableData" :currpage="currPage" :pagesize="pageSize">
      <el-table :data="tableData" border>
        <el-table-column prop="sn" label="流水号" sortable></el-table-column>
        <el-table-column prop="memberName" label="会员名称" sortable></el-table-column>
      </el-table>
    </Table>
  </div>
</template>

<script>
  import DialogForm from "./DialogForm";
  import Table from "../comm/Table";
  import Search from "../comm/Search";
  import mixins from '../../mixins/index'
  export default {
    name: "Dialog",
    mixins: [mixins],
    data(){
      return {
        visible: false,
        searchData: [
          { id: "memberName", name: "会员名称" }
        ]
      }
    },
    components: {
      DialogForm,
      Table,
      Search
    },
    created(){
      this.getTableData();
      //console.log("@@@", this);
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
