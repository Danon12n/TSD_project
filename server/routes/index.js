const Router = require("express");
const router = new Router();
const customerRouter = require("../routes/customer-router");
const vendorRouter = require("../routes/vendor-router");
const userRouter = require("../routes/user-router");

router.use("/customer", customerRouter);
router.use("/vendor", vendorRouter);
router.use("/user", userRouter);

module.exports = router;
