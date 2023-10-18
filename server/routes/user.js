const express = require("express");

// controller functions
const {
  loginUser,
  signupUser,
  getUsers,
  truncateUsers,
  deleteStore,
  updateStore,
  getStores,
  getUser,
  toggleActivityStore,
} = require("../controllers/userController");
const router = express.Router();
//routes
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/get-users", getUsers);
router.get("/get-users/:id", getUser);
//store
router.delete("/delete-store/:id", deleteStore);
router.put("/update-store/:id", updateStore);
router.put("/toggle-activity/:id", toggleActivityStore);
router.get("/get-stores", getStores);
//for testing...
router.delete("/del", truncateUsers);

module.exports = router;
