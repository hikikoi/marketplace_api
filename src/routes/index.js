const Router = require("express").Router;
const authRouter = require("../model/auth/auth.router");
const productRouter = require("../model/product/product.router");
const categoryRouter = require("../model/category/category.router");
const cartRouter = require("../model/cart/cart.router");

const router = Router();

router
  .use("/auth", authRouter)
  .use("/", productRouter)
  .use("/", categoryRouter)
  .use("/", cartRouter);

module.exports = router