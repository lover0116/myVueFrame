<template>
  <div class="x-cascader" v-if="visible" @click.self="close">
    <ul class="x-cascader-list" :style="'left:'+x + 'px;top:' + y + 'px;'">
      <li>
        <el-tree
          class="filter-tree"
          lazy
          :load="loadNode"
          :props="defaultProps"
          @node-click="aaa"
          ref="tree">
        </el-tree>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import $axios from "@/axios/index"
  export default {
    name: "Cascader",
    props: ['formkey'],
    data(){
      return {
        value: [],
        x: 0,
        y: 0,
        visible: false,
        defaultProps: {
          children: 'children',
          label: 'nameCn'
        }
      }
    },
    computed: {
      ...mapState({
        userInfo: state =>{
          return state.userInfo;
        }
      })
    },
    methods: {
      aaa(data, node){
        if(node.isLeaf){
          this.close();
          this.$emit("ok", data);
        }
      },
      loadNode(node, resolve) {
        let params = {
          exp: "eq"
        }, {level,data}=node;
        if (level === 0) {
          params.code = this.userInfo.orgCode;
        }else{
          params.parentOrgCode = data.code;
        }
        $axios.get("/rest/BaseOrg/list",{
          params: params
        }).then(res=>{
          let d = res.data.result;
          return resolve(d);
        })
      },
      show(x, y){
        this.x = x;
        this.y = y + 40;
        this.visible = true;
      },
      close(){
        this.visible = false;
      },
      filterText(val) {
        this.$refs.tree.filter(val);
      },
    }
  }
</script>

<style scoped>
  .x-cascader {
    position: fixed;z-index:9999;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(255, 255, 255, .1);
  }

  .x-cascader-list {
    position: absolute;padding:10px;margin:0;
    border-radius: 5px;
    background: #fff;
    display: flex;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, .2);
  }

  .x-cascader-list li {
    min-width: 180px;height: 260px;overflow-y:auto;border-right:1px solid #ddd;
  }
  .x-cascader-list li:last-child{
    border-right:none;
  }
  .x-cascader-item{
    padding: 5px 30px 5px 10px;position:relative;
  }
  .x-cascader-item:hover{
    background:#f4f4f4;cursor:pointer;
  }
  .x-cascader-active{
    color:#0062CC;
  }
  .x-cascader-child:after{
    content: '\e6e0';position:absolute;right:10px;top:50%;margin-top:-8px;font-family: element-icons!important;
  }
</style>
