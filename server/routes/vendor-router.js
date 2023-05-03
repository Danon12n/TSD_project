const Router = require("express");
const router = new Router();
const vendorController = require("../controllers/vendor-controller");

router.delete("/deletePet", vendorController.deletePet);

router.post("/createPet", vendorController.createPet);
router.post("/updatePet", vendorController.updatePet);
router.post("/getShopOrders", vendorController.getShopOrders);
router.post("/getShopPets", vendorController.getShopPets);
router.post("/acceptOrder", vendorController.acceptOrder);

module.exports = router;
