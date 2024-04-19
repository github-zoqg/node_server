import { pool_goods } from "../db/index.js";
import { paramsPlicing } from "../utils/index.js";

let sqlstr = "select * from goods_list_9999";

const getGoodsList = (req, res) => {
  const { page, pageSize } = req.query;
  const reqdata = req.query;
  let { sql, reqArr } = paramsPlicing(sqlstr, reqdata);
  // 调用db.query()执行sql语句
  console.log(sql, reqArr, "sql");
  pool_goods.query(sql, reqArr, (err, results) => {
    // 判断sql语句是否执行成功
    if (err) return res.cc(err);
    // 返回数据
    res.send({
      status: 200,
      list: results,
      total: results.length,
      message: "成功",
    });
  });
};

const getGoodsDetail = (req, res) => {
  const reqdata = req.query;
  // 调用db.query()执行sql语句
  let { sql, reqArr } = paramsPlicing(sqlstr, reqdata);
  pool_goods.query(sql, reqArr, (err, results) => {
    // 判断sql语句是否执行成功
    if (err) return res.cc(err);
    // 返回数据
    if (results.length === 0) {
      return res.cc("商品不存在");
    }
    res.send({
      status: 200,
      list: results[0],
      message: "成功",
    });
  });
};

const addCart = (req, res) => {
  const reqdata = req.body;
  if (!reqdata.goodsId) {
    return res.cc("参数缺失");
  }
  let sqlStr = "select * from goods_list_9999 where goods_id=?";

  pool_goods.query(sqlStr, reqdata.goods_id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length) {
      // 定义更新商品数量sql语句
      const sql = "update goods_list_9999 set ? where num=?";
      // 调用db.query()执行sql语句
      pool_goods.query(sql, results.length, (err, results) => {
        // 2.2 判断sql语句是否执行成功
        if (err) return res.cc(err);
        // 3.返回成功提示
        res.send({ status: 200, message: "成功" });
      });
    } else {
      const sql = "insert into goods set ?";
      pool_goods.query(
        sql,
        Object.assign(reqdata, { date: new Date().setHours(0, 0, 0, 0) }),
        (err, results) => {
          // 2.2 判断sql语句是否执行成功
          if (err) return res.cc(err);
          // 3.返回成功提示
          res.send({ status: 200, message: "成功" });
        }
      );
    }
  });
};

const deleteCart = (req, res) => {
  const reqdata = req.body;
  if (!reqdata.goods_id) return res.cc("goods_id缺失");
  // 删除数据
  const sqlStr = "delete from goods_list_9999 where goods_id=?";
  pool_goods.query(sqlStr, reqdata.goods_id, (err, results) => {
    // 2.2 判断sql语句是否执行成功
    if (err) return res.cc(err);
    // 3.返回成功提示
    res.send({ status: 200, message: "删除成功" });
  });
};

const getCartList = (req, res) => {
  const reqdata = req.body;
  let { sql, reqArr } = paramsPlicing(sql, reqdata);
  // 调用db.query()执行sql语句
  pool_goods.query(sql, reqArr, (err, results) => {
    // 判断sql语句是否执行成功
    if (err) return res.cc(err);
    // 返回数据
    res.send({
      status: 200,
      list: results,
      total: results.length,
      message: "成功",
    });
  });
};

const addRecord = (req, res) => {
  const reqdata = req.body;
  if (!reqdata.goods_id) {
    return res.cc("参数缺失");
  }
  let sqlStr = "select goods_id from goods where goods_id=?";

  pool_goods.query(sqlStr, reqdata.goods_id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length) {
      // 定义更新商品数量sql语句
      const sql = "update goods set ? where num=?";
      // 调用db.query()执行sql语句
      pool_goods.query(sql, results.length, (err, results) => {
        // 判断sql语句是否执行成功
        if (err) return res.cc(err);
      });
    } else {
      const sql = "insert into goods set ?";
      pool_goods.query(
        sql,
        Object.assign(reqdata, { date: new Date().setHours(0, 0, 0, 0) }),
        (err, results) => {
          // 判断sql语句是否执行成功
          if (err) return res.cc(err);
        }
      );
    }
  });
};

const getRecordList = (req, res) => {
  const reqdata = req.body;
  let { sql, reqArr } = paramsPlicing(sql, reqdata);
  // 调用db.query()执行sql语句
  pool_goods.query(sql, reqArr, (err, results) => {
    // 判断sql语句是否执行成功
    if (err) return res.cc(err);
    // 返回数据
    res.send({
      status: 200,
      list: results,
      total: results.length,
      message: "成功",
    });
  });
};

const pay = (req, res) => {
  const reqdata = req.body;
  if (!reqdata.goods_id) {
    return res.cc("参数缺失");
  }
  res.send({ status: 200, message: "成功" });
  addRecord(req, res);
};

export default {
  getGoodsList,
  getGoodsDetail,
  addCart,
  deleteCart,
  getCartList,
  addRecord,
  getRecordList,
  pay,
};
