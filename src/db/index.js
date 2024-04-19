// 1.导入mysql模块
import mysql from "mysql";

// 2.创建数据库连接对象
export const pool_user = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "user",
});

// 2.创建数据库连接对象
export const pool_goods = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "pool_goods",
});

// 2.创建数据库连接对象
export const pool_card = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "pool_card",
});

// 2.创建数据库连接对象
export const pool_record = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "pool_record",
});
