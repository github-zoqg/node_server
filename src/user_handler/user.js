import db from "../db/index.js";

// 注册新用户的处理函数
const reg = (req, res) => {
  res.send("reg ok 接口返回成功");
};

// 登陆的处理函数
const login = (req, res) => {
  res.send("login ok");
};

const getlist = (req, res) => {
  // 1.获取客户端提交到服务器的用户表单信息
  const reqdata = req.body;
  // 2. 定义插入新用户的sql语句db.getConnection((err, connection) =>{
  let sql = "select * from custom_list";
  let reqArr = [];
  let reqKeyArr = [];
  //   删除为空参数
  for (let key in reqdata) {
    if (reqdata[key]) {
      reqKeyArr.push(key);
      reqArr.push(reqdata[key]);
    } else {
      delete reqdata[key];
    }
  }
  if (reqArr.length > 1) {
    sql = sql + " where " + reqKeyArr.join("=? and ") + "=?";
  }
  if (reqArr.length == 1) {
    sql = sql + " where " + reqKeyArr[0] + "=?";
  }
  //   db.getConnection((err, connection) => {
  //     if (err) {
  //       console.log("连接失败");
  //     } else {
  //       console.log("连接成功");
  //       connection.query(sql, (err, results) => {
  //         if (err) return res.cc(err);
  //         // 当不再使用时，归还到连接池中
  //         res.send({ status: 200, list: results, message: "成功" });
  //         connection.release();
  //         // 当不再使用时并要从连接池中移除
  //         // connection.destory();
  //       });
  //     }
  //   });
  // 2.1 调用db.query()执行sql语句

  db.query(
    sql,
    reqArr,
    // reqdata.name,
    (err, results) => {
      // 2.2 判断sql语句是否执行成功
      if (err) return res.cc(err);
      // if (err) return res.send({ status: 1, message: err.message });
      // 3.返回数据
      res.send({
        status: 200,
        list: results,
        total: results.length,
        message: "成功",
      });
    }
  );
};

const add = (req, res) => {
  // console.log(req.body);
  const reqdata = req.body;
  if (!reqdata.name || !reqdata.phone) {
    return res.cc("参数缺失");
  }
  let sqlStr = "select phone from custom_list where phone=?";

  db.query(sqlStr, reqdata.phone, (err, results) => {
    if (err) return res.cc(err);
    if (results.length) {
      return res.cc("该手机号已提交,请更换手机号");
    } else {
      // 2. 定义插入新用户的sql语句
      const sql = "insert into custom_list set ?";
      // 2.1 调用db.query()执行sql语句
      db.query(
        sql,
        Object.assign(reqdata, { date: new Date().setHours(0, 0, 0, 0) }),
        (err, results) => {
          // 2.2 判断sql语句是否执行成功
          if (err) return res.cc(err);
          // 3.返回成功提示
          res.send({ status: 200, message: "提交成功" });
        }
      );
    }
  });
};

const update = (req, res) => {
  // console.log(req);
  // 1.获取客户端提交到服务器的用户表单信息
  const reqdata = req.body;
  // 2.对表单中的数据进行合法性的校验
  if (!reqdata.id) {
    // return res.send({ status: 1, message: '用户名或者密码不合法！' });
    return res.cc("id缺失");
  }
  let sqlStr = "select id from custom_list where id=?";
  db.query(sqlStr, reqdata.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length) {
      let sql = "update custom_list set ? where id=?";
      db.query(sql, [reqdata, reqdata.id], (err, results) => {
        if (err) return res.cc(err);
        return res.send({
          status: 200,
          message: "更新成功",
        });
      });
    }
  });
};

const del = (req, res) => {
  //   console.log(req);
  const reqdata = req.body;
  if (!reqdata.id) return res.cc("id缺失");
  // 删除数据
  const sqlStr = "delete from custom_list where id=?";
  db.query(sqlStr, reqdata.id, (err, results) => {
    // 2.2 判断sql语句是否执行成功
    if (err) return res.cc(err);
    // 3.返回成功提示
    res.send({ status: 200, message: "删除成功" });
  });
};
export default {
  reg,
  login,
  getlist,
  add,
  update,
  del,
};
