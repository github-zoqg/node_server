// 1.导入express
import express from "express";
// 1.1 导入并配置cors中间件
import cors from "cors";
// 解析参数
import bodyParser from "body-parser";
// 引入router
import router_user from "../router/index.js";
import router_goods from "../router/goods.js";

//直接引入https模块
import https from "https";
import fs from "fs";
import path from "path";

// 2.创建服务器的实例对象
const app = express();
app.use(cors());

// 采用设置所有均可访问的方法解决跨域问题
app.all("*", function (req, res, next) {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  // 允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  // 跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() === "options") {
    res.send(200); // 让options尝试请求快速结束
  } else {
    next();
  }
});

// 1.2 配置解析表单数据的中间件, 这个中间件只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(bodyParser.urlencoded({ extended: false }));

// 1.3 只能解析parse application/json 格式
app.use(bodyParser.json());

// 一定要在路由之前封装res.cc函数
app.use((req, res, next) => {
  // status 默认值为 1，表示失败的情况
  // err的值，可能是错误对象，也可能是错误的描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  if (next) {
    next();
  }
});

app.use("/user", router_user);
app.use("/goods", router_goods);
// 定义POST请求的路由
// app.post("/api", (req, res) => {
//   console.log(req.body);
//   res.send("Received POST request");
// });
// 3.启动服务器
// app.listen(8089, (...args) => {
//   console.log(...args, "args");
//   console.log("api server running at http:127.0.0.1:8089");
// });

//启动https服务
//此处读取文件名称更改成自己下载的证书名称， 将证书放置到对应的目录下
// console.log(
//   import.meta.url,
//   path.join(import.meta.url, "../../static/key.pem"),
//   path.resolve("src/static/key.pem"),
//   "import.meta.url"
// );
var pk = fs.readFileSync(path.resolve("src/static/key.pem"));
var pc = fs.readFileSync(path.resolve("src/static/cert.pem"));
var opt = {
  key: pk,
  cert: pc,
};

var server = https.createServer(opt, app);
server.listen(8089);
