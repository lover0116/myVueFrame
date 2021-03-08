// 在这里可以做一些通用的配置
import Mock from 'mockjs'
// 设置所有ajax请求的超时时间，模拟网络传输耗时
Mock.setup({
  timeout: 0 - 300,
});
Mock.mock("/mock/list", "get", {
  code: 0,
  message: "请求成功",
  size: 10,
  success: true,
  "result|10": [
    {
      "id|+1": 1,
      "no|1-100": 100,
      name: "@name",
    }
  ],
});
Mock.mock("/mock/add", "post", {
  code: 0,
  message: "请求成功",
  success: true,
});
Mock.mock("/mock/add", "delete", {
  code: 0,
  message: "请求成功",
  success: true,
});
Mock.mock("/mock/add", "put", {
  code: 0,
  message: "请求成功",
  success: true,
});
