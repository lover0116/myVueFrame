<template>
  <div class="x-search-box">
    <el-form :inline="true" :model="form" ref="form">
      <el-form-item v-for="item in $props.data"
                    :prop="item.id"
                    :label="item.type==='singlechecked'?'':item.name"
                    :key="item.id"
      >
        <!--日期-->
        <el-date-picker clearable v-if="item.type === 'date'"
                        v-model="odate[item.id]"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期" @change="setDate(item.id, item.datakey)">
        </el-date-picker>
        <!--下拉-->
        <el-select clearable v-model="form[item.id]" :placeholder="'请选择'+item.name"
                   v-else-if="item.type === 'select'">
          <el-option v-for="record in item.data"
                     :label="record.label"
                     :value="record.value"
                     :key="record.value" :checked="record.checked"></el-option>
        </el-select>
        <!--下拉lazy-->
        <select-lazy :formkey="item.id" v-else-if="item.type === 'selectLazy'" :func="item.func" :label="item.label" :value="item.value" @setValue="setSelectLazy" ></select-lazy>
        <!--级联-->
        <el-cascader v-model="form[item.id]" v-else-if="item.type === 'cascader'" :options="item.data"
                     clearable></el-cascader>
        <!--级联lazy-->
        <!--<Cascader ref="cascaderLazy" :formkey="item.id" v-else-if="item.type === 'cascaderLazy'" @value="aaa"></Cascader>-->
        <template v-else-if="item.type === 'cascaderLazy'">
          <el-input @focus="showCascader" v-model="form[item.id]" placeholder="请选择"></el-input>
          <Cascader :formkey="item.id" ref="refCascader" v-on:ok="okCascader"></Cascader>
        </template>
        <!--单复选框-->
        <el-checkbox v-model="form[item.id]" v-else-if="item.type === 'singlechecked'">{{item.name}}</el-checkbox>
        <!--输入-->
        <el-input clearable :placeholder="'请输入'+(item.placehoder?item.placehoder:item.name)" v-model="form[item.id]"
                  v-else></el-input>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!--<div class="x-tc">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="onReset">重置</el-button>
    </div>-->
  </div>
</template>

<script>
  import Cascader from "./Cascader"
  import SelectLazy from "./SelectLazy"
  import _ from "lodash"
  export default {
    name: "Search",
    emit: ['searchFun'],
    props: ['data'],
    components: {
      Cascader, SelectLazy
    },
    data() {
      return {
        form: {},
        odate: {},
      }
    },
    created(){
      let a = {};
      _.each(this.data,i=>{
        a[i.id] = "";
      })
      this.form = a;
    },
    methods: {
      setSelectLazy (v, item, formkey){
        //console.log(v, item, formkey);
        this.form[formkey] = v;
      },
      onSubmit() {
        let params = JSON.parse(JSON.stringify(this.form));
        params.currPage = 1;
        //console.log('params', params);
        delete params.xdate1;
        delete params.xdate2;
        this.$emit("searchFun", params);
      },
      onReset() {
        this.$refs.form.resetFields();
        this.odate = {};
        this.$refs.cascaderLazy&&this.$refs.cascaderLazy[0].clear();
        this.$emit("searchFun");
      },
      re(date, s) {
        if (!date) {
          return undefined;
        }
        let y = date.getFullYear(),
          m = ('00' + (date.getMonth() + 1)).slice(-2),
          d = ('00' + date.getDate()).slice(-2);
        let sdate = y + '-' + m + '-' + d;
        if (s) {
          sdate = sdate + ' ' + s;
        }
        return sdate;
      },
      setDate(key, dateKey) {
        let dateArr = this.odate[key];
        let s1 = '', s2 = '';
        if (!dateArr) {
          this.form[key] = undefined;
          if(dateKey){
            this.form[dateKey[0]] = undefined;
            this.form[dateKey[1]] = undefined;
          }
        } else {
          s1 = this.re(dateArr[0], '00:00:00');
          s2 = this.re(dateArr[1], '23:59:59');
          this.form[key] = s1 + '~' + s2;
          if(dateKey){
            this.form[dateKey[0]] = s1;
            this.form[dateKey[1]] = s2;
          }
        }
      },
      aaa(v, k){
        //console.log(v, k);
        this.form[k] = v.join("/");
      },
      okCascader(data){
        //console.log(data.code, data.nameCn);
        let key = this.$refs.refCascader[0].formkey;
        //this.form[key] = "";
        this.form[key] = data.nameCn;
      },
      showCascader (e) {
        let x = e.target.getClientRects()[0].x,
          y = e.target.getClientRects()[0].y;
        //console.log(x,y);
        this.$refs.refCascader[0]&&this.$refs.refCascader[0].show(x, y);
      },
      setForm(key, value){
        this.form[key] = value;
      }
    }
  }
</script>

<style scoped>
  .x-search-box {
    padding:10px 10px 0 10px;border-bottom: 1px solid #e9e9e9;
  }
  .x-search-box .el-form--inline .el-form-item{margin-bottom:10px;}
</style>
