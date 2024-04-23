import jwt from "jsonwebtoken";

export const createtoken = (userId) => {
  const token = jwt.sign({ userId: userId }, "secretKey", { expiresIn: "1h" });
  return token;
};

// token验证
export function verifyToken(req, res, next) {
  const token = req.headers.token;
  console.log(token, "token");
  if (token) {
    jwt.verify(token, "secretKey", (err, decoded) => {
      if (err) {
        console.log(err, "err");
        return res.cc("Token无效", 401);
      }
      req.userId = decoded.userId;
      next();
    });
  } else {
    res.cc({ status: 401, message: "token不存在" });
  }
}
