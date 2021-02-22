<template>
  <div class="x-main-box">
    <search-form :data="searchData" @searchFun="searchFun"></search-form>
    <div class="x-toolbar x-tl">
      <el-button type="primary" @click="addbtn">新增</el-button>
    </div>
    <table-page :total="total" :callback="getTableData" :currpage="currPage" :pagesize="pageSize">
      <el-table :data="tableData" border>
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span class="x-funbtn" @click="viewClick(scope.row)">查看</span>
            <span class="x-funbtn" @click="editClick(scope.row)">编辑</span>
            <span class="x-funbtn" @click="delClick(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </table-page>
    <dialog-form ref="dialogForm" :title="title" @confirm="save" @resetForm="resetForm" :editable="editable">
      <el-form ref="form" :model="form" label-width="140px" :rules="rules">
        <el-form-item label="字段" prop="name">
          <el-input v-if="editable" v-model="form.name" placeholder="请输入字段"></el-input>
          <span v-else>{{editData.name}}</span>
        </el-form-item>
      </el-form>
    </dialog-form>
  </div>

</template>

<script>
  import TablePage from "../../components/comm/TablePage"
  import SearchForm from "../../components/comm/SearchForm"
  import DialogForm from "../../components/comm/DialogForm"
  import mixins from "../../mixins"
  import {apiGetSysRole, apiPostSysRole} from "../../api"
  import _ from "lodash"
  export default {
    components: {
      TablePage,
      SearchForm,
      DialogForm
    },
    mixins: [mixins],
    data() {
      return {
        apiPost: apiPostSysRole,
        apiGet: apiGetSysRole,
        searchData: [
          {id: 'name', name: '名称'},
        ],
        editData: {},
        title: '新增',
        editable: true,
        visible: false,
        form: {
          id: '',
          name: ''
        },
        rules: {
          ['name']: [
            { required: true, message: '输入', trigger: 'blur' }
          ],
        }
      }
    },
    created() {
      this.refreshTable();
    },
    methods: {
      refreshTable(){
        this.getTableData({}, this.apiGet);
      },
      openDialog(){
        this.$refs.dialogForm.openDialog();
      },
      closeDialog(){
        this.$refs.dialogForm.closeDialog();
      },
      addbtn(){
        this.title = "新增";
        this.editable = true;
        this.openDialog();
      },
      viewClick(rows) {
        this.title = "查看";
        this.editable = false;
        this.openDialog();
        this.apiPost({
          params: { id: rows.id }
        }, "get").then(res=>{
          this.editData = res.result[0];
        })
      },
      editClick(rows) {
        this.title = "编辑";
        this.editable = true;
        this.openDialog();
        this.apiPost({
          params: { id: rows.id }
        }, "get").then(res=>{
          let data = res.result[0];
          let formdata = {};
          _.each(this.form, (value, key)=>{
            formdata[key] = data[key];
          })
          this.$nextTick(()=>{
            this.form = {...formdata};
          });
        });
      },
      delClick(id) {
        this.del(id, this.apiPost);
      },
      resetForm() {
        this.$refs["form"]&&this.$refs["form"].resetFields();
      },
      save() {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            let params = {
              ...this.form
            };
            let _promise;
            if(this.title==="新增"){
              delete params.id;
              _promise = this.apiPost(params);
            }else{
              _promise = this.apiPost(params, "put");
            }
            _promise.then(res=>{
              if(res.success){
                this.closeDialog();
                this.refreshTable();
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

    }
  }
</script>
<style>

</style>
