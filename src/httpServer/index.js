import http from "http";
import url from "url";
import util from "util";
import querystring from "querystring";

// post请求
http
  .createServer(function (req, res) {
    // 定义了一个post变量，用于暂存请求体的信息
    var post = "";

    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on("data", function (chunk) {
        console.log(chunk,'chunk')
      post += chunk;
    });

    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on("end", function () {
      post = querystring.parse(post) || "123";
    console.log(post, "post");
    //   res.end(post);
      res.writeHead(200, { "Content-Type": "application/json;charset=utf8" });
      var resObj = {
        status: 1,
        querystring: post
      };
      res.write(JSON.stringify(resObj));
      //   res.end(util.inspect(post));
      res.end();
    });
  })
  .listen(8089);

// http
//   .createServer(function (req, res) {
//     res.writeHead(200, {
//       "Content-Type": "application/json;charset=utf8",
//     });

//     // 解析 url 参数
//     var params = url.parse(req.url, true).query;
//     console.log(params, "params");
//     res.write("网站名：" + params.name);
//     res.write("\n");
//     res.write("网站 URL：" + params.url);
//     res.end();
//   })
//   .listen(8088);

console.log("httpServer 加载完成");
