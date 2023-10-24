const express = require("express");
const upload = require("../utils/fileUpload");
// controller functions
const {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsForSalesperson,
} = require("../controllers/productController");
const router = express.Router();
router.get("/salespersonproducts/:adminId", getProductsForSalesperson);
router.use(require("../middleware/requireAuth"));
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", upload.single("imageUrl"), updateProduct);
router.post("/", upload.single("imageUrl"), createProduct);
router.get("/", getProducts);

module.exports = router;
