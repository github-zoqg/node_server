export const paramsPlicing = (sql, reqdata) => {
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
  console.log("sqlstr", sql, "reqdata", reqdata);
  return { reqArr, sql };
};
