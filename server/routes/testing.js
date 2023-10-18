const express = require("express");
const router = express.Router();
const Test = require("../models/testModel");
const fileUpload = require("../utils/fileUpload");

router.get("/", async (req, res) => {
  const tests = await Test.find({});
  res.json(tests);
});
router.post("/", fileUpload.single("imageUrl"), async (req, res) => {
  const imageUrl = req.file;
  console.log(imageUrl);
  const payload = { ...req.body, ...(imageUrl && { imageUrl: imageUrl.path }) };
  const newPost = await Test.create(payload);
  res.json({ created: true });
});

module.exports = router;
