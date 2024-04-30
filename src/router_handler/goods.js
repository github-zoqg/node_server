import { pool_goods, pool_card, pool_record } from "../db/index.js";
import { paramsPlicing } from "../utils/index.js";

let sqlstr = "select * from goods_list_9999";

const addGoods = (req, res) => {
  const reqdata = req.body;

  let { goodsId, storeId, userId } = reqdata;
  let sql = "insert into goods_list_9999 set ?";
  pool_goods.query(sql, reqdata, (err, results) => {
    // 2.2 判断sql语句是否执行成功
    if (err) return res.cc(err);
    // 3.返回成功提示
    res.send({ status: 200, message: "成功" });
  });
};
const getGoodsList = (req, res) => {
  const { page, pageSize } = req.query;
  const reqdata = req.query;
  let { sql, reqArr } = paramsPlicing(sqlstr, reqdata);
  if (reqdata.keyword) {
    sql = `${sqlstr} where keyword like "%${reqdata.keyword}%" `;
  }
  // 调用db.query()执行sql语句
  // console.log(sql, reqArr, "sql");
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
      data: results[0],
      message: "成功",
    });
  });
};

const addCart = (req, res) => {
  const reqdata = req.body;
  if (!reqdata.goodsId) {
    return res.cc("参数缺失");
  }

  let sqlstr = "select * from card_list_9999";
  let { goodsId, storeId, userId } = reqdata;
  delete reqdata.volume;
  delete reqdata.keyword;
  let { sql, reqArr } = paramsPlicing(sqlstr, { goodsId, storeId, userId });
  pool_card.query(sql, reqArr, (err, results) => {
    if (err) return res.cc(err);
    if (results.length) {
      updateCartList(req, res, results[0].num);
    } else {
      const sql = "insert into card_list_9999 set ?";
      pool_card.query(
        sql,
        Object.assign(
          { ...reqdata },
          { date: new Date().setHours(0, 0, 0, 0) }
        ),
        (err, results) => {
          // console.log(results, "results");
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
  let { goodsId, storeId, userId } = reqdata;
  if (!goodsId || !storeId || !userId) return res.cc("参数缺失");
  // 删除数据
  const sqlStr =
    "delete from card_list_9999 where goodsId=? and storeId=? and userId=?";
  pool_card.query(sqlStr, [goodsId, storeId, userId], (err, results) => {
    // 2.2 判断sql语句是否执行成功
    if (err) return res.cc(err);
    // 3.返回成功提示
    res.send({ status: 200, message: "删除成功" });
  });
};

const getCartList = (req, res) => {
  let sqlstr = "select * from card_list_9999";
  const reqdata = req.body;
  let { sql, reqArr } = paramsPlicing(sqlstr, reqdata);
  // 调用db.query()执行sql语句
  pool_card.query(sql, reqArr, (err, results) => {
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

const updateCartList = (req, res, oldNum) => {
  const reqdata = req.body;
  let { goodsId, storeId, userId, num, source } = reqdata;
  if (!goodsId || !storeId || !userId) {
    return res.cc("参数缺失");
  }

  const sql =
    "update card_list_9999 set ? where goodsId=? and storeId=? and userId=?";
  // 调用db.query()执行sql语句
  pool_card.query(
    sql,
    [{ num: !source ? +num + oldNum : +num }, goodsId, storeId, userId],
    (err, results) => {
      // 2.2 判断sql语句是否执行成功
      if (err) return res.cc(err);
      // 3.返回成功提示
      res.send({ status: 200, message: "成功" });
    }
  );
};

const addRecord = (req, res) => {
  const reqdata = req.body;
  delete reqdata.volume;
  delete reqdata.keyword;
  let { goodsId, storeId, userId } = reqdata;
  if (!goodsId || !storeId || !userId) {
    return res.cc("参数缺失");
  }
  const sql = "insert into record_list_9999 set ?";
  pool_record.query(
    sql,
    Object.assign(
      { ...reqdata, status: 1 },
      { date: new Date().setHours(0, 0, 0, 0) }
    ),
    (err, results) => {
      // 判断sql语句是否执行成功
      if (err) return res.cc(err);
      return res.send({ status: 200, message: "成功" });
    }
  );
};

const getRecordList = (req, res) => {
  let sqlstr = "select * from record_list_9999";
  const reqdata = req.body;
  let params;
  if (reqdata.status == 0) {
    params = { userId: reqdata.userId };
  } else {
    params = reqdata;
  }
  let { sql, reqArr } = paramsPlicing(sqlstr, params);
  // 调用db.query()执行sql语句
  pool_record.query(sql, reqArr, (err, results) => {
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
  let { goodsId, storeId, userId } = reqdata;
  if (!goodsId || !storeId || !userId) {
    return res.cc("参数缺失");
  }
  return addRecord(req, res);
};

export default {
  addGoods,
  getGoodsList,
  getGoodsDetail,
  addCart,
  deleteCart,
  updateCartList,
  getCartList,
  addRecord,
  getRecordList,
  pay,
};
