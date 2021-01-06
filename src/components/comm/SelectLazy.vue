<template>
    <el-select style="width: 100%"
               v-model="v"
               filterable
               remote clearable
               reserve-keyword
               placeholder="请输入关键词"
               :remote-method="remoteMethod" @change="change">
        <el-option v-for="(item, index) in options" :key="index" :label="label2?item[label]+'('+item[label2]+')':item[label]" :value="item[value]"></el-option>
    </el-select>
</template>
<script>
    import _ from "lodash"
  export default {
    name: "SelectLazy",
    emit: ['setValue'],
    props: ['func', 'label', 'label2', 'value', 'formkey', 'orgCode'],
    data(){
      return {
        v: "",
        options: []
      }
    },
    methods:{
      change(v){
        console.log("orgCode", this.orgCode);
        let item = {};
        _.each(this.options, i=>{
          if(i[this.$props.value] === v){
            item = i;
          }
        })
        this.$emit("setValue", v, item, this.$props.formkey);
      },
      remoteMethod(v){
        if (v !== '') {
          let params = {
            name: v
          };
          if(this.$props.orgCode){
            params.orgCode = this.$props.orgCode;
          }
          this.$props.func(params).then(res=>{
            this.options = res.data.result;
          })
        } else {
          this.options = [];
        }
      },
      clear(){
        this.v = '';
      }
    }
  }
</script>

<style scoped>

</style>
