const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Public
router.get("/", productController.getAllProducts);

// Admin only
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  productController.createProduct
);

module.exports = router;
