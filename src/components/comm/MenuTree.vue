<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
  </el-menu>
  <!--<el-menu class="x-menu" mode="horizontal" router>
      <template v-for="(item,index) in menu">
        <el-submenu v-if="item.children&&item.children.length>0" :index="item.name" :key="index">
          <template slot="title"><i :class="item.icon"></i>{{item.name}}</template>
          <template v-for="(item2,index2) in item.children">
            <el-submenu v-if="item2.children&&item2.children.length>0" :index="item2.name" :key="index2">
              <template slot="title">{{item2.name}}</template>
              <el-menu-item v-for="(item3, index3) in item2.children" :index="'/'+item3.url" :key="index3">{{item3.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="'/'+item2.url" :key="index2">{{item2.name}}</el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :index="'/'+item.url" :key="index"><i :class="item.icon"></i>{{item.name}}</el-menu-item>
      </template>
  </el-menu>-->
</template>

<script>
  export default {
    name: "MenuTree",
    props: ['menu'],
    data(){
      return {
        activeIndex: '1',
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>

</style>
