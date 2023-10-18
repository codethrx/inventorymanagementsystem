const express = require("express");

// controller functions
const {
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
  createCategory,
} = require("../controllers/categoryController");
const router = express.Router();
router.use(require("../middleware/requireAuth"));
router.get("/:id", getCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);
router.post("/", createCategory);
router.get("/", getCategories);

module.exports = router;
