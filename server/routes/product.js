const express = require("express");
const upload = require("../utils/fileUpload");
// controller functions
const {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const router = express.Router();
router.use(require("../middleware/requireAuth"));
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", upload.single("imageUrl"), updateProduct);
router.post("/", upload.single("imageUrl"), createProduct);
router.get("/", getProducts);

module.exports = router;
