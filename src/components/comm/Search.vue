<template>
  <el-form :inline="true" :model="form" ref="form">
    <el-form-item v-for="item in $props.data"
                  :prop="item.id"
                  :label="item.name"
                  :key="item.id"
    >
      <!--日期-->
      <el-date-picker clearable v-if="item.type === 'date'"
                      v-model="odate[item.id]"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期" @change="setDate(item.id)">
      </el-date-picker>
        <!--下拉-->
        <el-select clearable v-model="form[item.id]" :placeholder="'请选择'+item.name"
                   v-else-if="item.type === 'select'">
          <el-option v-for="record in item.data"
                     :label="record.label"
                     :value="record.value"
                     :key="record.value" :checked="record.checked"></el-option>
        </el-select>
        <!--输入-->
        <el-input clearable :placeholder="'请输入'+item.name" v-model="form[item.id]"
                  v-else></el-input>

    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "Search",
    props: ['data', 'callback'],
    data (){
      return {
        form: {},
        odate: {}
      }
    },
    methods: {
      onSubmit() {
        let params = JSON.parse(JSON.stringify(this.form));
        params.currPage = 1;
        this.$props.callback(params);
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
      setDate(key) {
        let dateArr = this.odate[key];
        let s1 = '', s2 = '';
        //console.log(dateArr);
        if (!dateArr) {
          this.form[key] = undefined;
        } else {
          s1 = this.re(dateArr[0], '00:00:00');
          s2 = this.re(dateArr[1], '23:59:59');
          this.form[key] = s1 + '~' + s2
        }

      },
    }
  }
</script>

<style scoped>

</style>
