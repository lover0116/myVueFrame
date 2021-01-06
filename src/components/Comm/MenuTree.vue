<template>
  <el-menu class="x-menu" mode="horizontal" router>
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
  </el-menu>
</template>

<script>
  export default {
    name: "MenuTree",
    props: ['menu'],
  }
</script>

<style scoped>

</style>
