import $axios from "../axios";

export default {
  data(){
    return {
      total: 10,
      currPage: 1,
      pageSize: 10,
      tableData: []
    }
  },
  methods: {
    searchFun (params={}){
      params.pageSize = this.pageSize;
      params.currPage = 1;
      this.getTableData(params);
    },
    getTableData (params={}) {
      this.pageSize = params.pageSize||this.pageSize;
      this.currPage = params.currPage||this.currPage;
      $axios.get("http://weixin.billjc.com/rest/ManualRecovery/list", {
        params: {
          pageSize: 10,
          currPage: 1,
          mode: "door",
          ...params
        }
      }).then(res=>{
        this.tableData = res.data.result;
        this.total = res.data.size;
      })
    },
  }
}
