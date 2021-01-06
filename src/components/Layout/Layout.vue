<template>
  <div class="x-container">
    <div class="x-header">
      <div class="x-logo"><a href="/#/Welcome"><img alt="" src="../../assets/images/logo.png" /></a></div>
      <div class="x-menu">
        <el-menu router class="el-menu-demo" mode="horizontal">
          <el-menu-item index="/temp">处理中心</el-menu-item>
        </el-menu>
      </div>
      <div class="x-user">
        <div class="x-user-icon">
          <el-icon class="el-icon-user-solid"></el-icon>
        </div>
        <div class="x-user-name">你好</div>
        <div class="x-user-out x-underline" @click="logout">注销</div>
      </div>
    </div>
    <div class="x-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
          <span style="line-height:30px;">{{item.meta.title}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="x-main">
      <router-view></router-view>
    </div>
    <div class="x-footer">
      footer
    </div>
  </div>
</template>

<script>
  import $axios from "../../axios/index"
  export default {
    name: "Layout",
    data(){
      return {
        breadcrumb: [],
        menuData: [],
        activeIndex: '1'
      }
    },
    watch: {
      $route(val) {
        this.getBreadList(val);
      }
    },
    computed: {
      userInfo: function(){
        return this.$store.state.userInfo;
      }
    },
    methods: {
      getBreadList(val) {
        // 过滤路由matched对象
        if (val.matched) {
          // 拿到过滤好的路由v-for遍历出来
          this.breadcrumb = val.matched.filter(item => {
            return item.meta && item.meta.title
          });
        }
      },
      logout() {
        $axios.get("/exit")
          .then(() => {
            this.$router.push("/Login");
          });
      },
    },
    created(){
      let val = this.$route;
      this.getBreadList(val);
      let user = window.localStorage.getItem('user');
      if(user){
        this.$store.dispatch("upUser", JSON.parse(user));
      }
    }
  }
</script>

<style scoped>
  .x-container{
    width:100%;display:flex;flex-direction: column;
  }
  .x-header{
    width:100%;height:56px;display:flex;overflow:hidden;border-bottom:1px solid #e9e9e9;
  }
  .x-logo{
    width:50px;
  }
  .x-logo img{width:50px;}
  .x-menu{
    flex:1;border-bottom:none;
  }
  .x-user{
    display:flex;align-items:center;padding-right:10px;box-sizing:border-box;
  }
  .x-user-icon{
    width:40px;height:40px;border-radius:50%;background:#f6f6f6;margin-right:10px;
    text-align:center;line-height:40px;font-size:24px;
  }
  .x-user-name{
    flex:1;
  }
  .x-user-out{
    color:#0c6d50;margin-left:10px;
  }
  .x-breadcrumb{
    height:32px;line-height:32px;padding:0 10px;background:#f6f6f6;
  }
  .x-main{
    flex:1;height: calc(100% - 130px);overflow-y:auto;padding-bottom:10px;box-sizing:border-box;background:#f6f6f6;
  }

  .x-footer{
    width:100%;padding:0 20px;box-sizing:border-box;height:40px;line-height:40px;display:flex;border-top:1px solid #e9e9e9;
  }
  .x-footer-l{
    flex:1;
  }
</style>
