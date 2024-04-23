// 1.导入express
import express from "express";
import goods_handler from "../router_handler/goods.js";
import { verifyToken } from "../router/token.js";

// 2.创建路由对象
const router = express.Router();

// 添加商品
router.post("/addGoods", goods_handler.addGoods);
// 获取商品列表
router.get("/getGoodsList", goods_handler.getGoodsList);
// 获取商品详情
router.get("/getGoodsDetail", goods_handler.getGoodsDetail);
// 购物车
router.post("/addCart", verifyToken, goods_handler.addCart);
router.post("/getCartList", verifyToken, goods_handler.getCartList);
router.post("/updateCartList", verifyToken, goods_handler.updateCartList);
router.post("/deleteCart", verifyToken, goods_handler.deleteCart);
// 订单
router.post("/addRecord", verifyToken, goods_handler.addRecord);
router.post("/getRecordList", verifyToken, goods_handler.getRecordList);
// 支付
router.post("/pay", verifyToken, goods_handler.pay);

export default router;
