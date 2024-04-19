// 1.导入express
import express from "express";
import user_handler from "../router_handler/user.js";

// 2.创建路由对象
const router = express.Router();
// 3.挂载路由
// 注册新用户
router.post("/getlist", user_handler.getlist);
router.post("/add", user_handler.add);
router.post("/update", user_handler.update);
router.post("/del", user_handler.del);

// 登录
router.post("/login", user_handler.login);
// 注册
router.post("/register", user_handler.reg);

export default router;
