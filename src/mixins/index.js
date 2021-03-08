export default {
  data(){
    return {
      total: 0,
      currPage: 1,
      pageSize: 10,
      tableData: [],
      callback: null,
      fixParams: null,
      searchParams: null
    }
  },
  mounted(){
    this.getTableData();
  },
  methods: {
    searchFun (params={}){
      params.pageSize = this.pageSize;
      params.currPage = 1;
      this.searchParams = params;
      this.getTableData(params);
    },
    sortChange(row){
      //console.log(row.order, row.prop);
      let fixParams = {};
      if(row.order){
        fixParams[row.order==='ascending'?'asc':'desc'] = row.prop;
      }
      this.getTableData({
        pageSize: this.pageSize,
        currPage: 1
      }, this.callback, fixParams);
    },
    getTableData (
      params={},
      Axios=this.apiGet,
      fixParams={}
      ) {
      this.pageSize = params.pageSize||this.pageSize;
      this.currPage = params.currPage||this.currPage;
      if(!this.callback){
        this.callback = Axios;
      }
      if(!this.fixParams||fixParams){
        this.fixParams = fixParams||{};
      }
      let proxy = this.callback || Axios;
      proxy&&proxy({
        currPage: this.currPage,
        pageSize: this.pageSize,
        ...this.searchParams,
        ...params,
        ...this.fixParams
      })
        .then(res=>{
          if(!res||res.name === "Error"){
            return ;
          }
          this.tableData = res.result;
          this.total = res.size;
        });
    },
    del(id, func){
      this.$confirm('确定删除这条记录吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        func({
          data: [id]
        }, "delete").then((res)=>{
          if(res.success){
            this.getTableData({}, this.callback);
          }
        })
      }).catch(() => {

      });
    }
  }
}
