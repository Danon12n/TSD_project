const Router = require("express");
const router = new Router();
const customerController = require("../controllers/customer-controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/getPets", customerController.getPets);
router.get("/getShops", customerController.getShops);

router.post("/createOrder", customerController.createOrder);
router.post("/refuseOrder", customerController.refuseOrder);
router.post(
    "/getCustomerOrders",
    authMiddleware,
    customerController.getCustomerOrders
);

module.exports = router;
