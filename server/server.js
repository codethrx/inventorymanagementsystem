require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const upload = require("./utils/fileUpload");
// express app
const app = express();

// middleware
app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//main
// app.delete(
//   "/delete-all-categories",
//   require("./controllers/categoryController").deleteAllCategories
// );
// app.use('/api/superadmin')
app.post("/api/upload", upload.single("image"), function (req, res) {
  // res.json({ file: req.file });

  res.json({ path: req.file?.path, abc: "abc", ...req.body });
});
app.use("/api/user", userRoutes);
app.use("/api/products", require("./routes/product"));
app.use("/api/categories", require("./routes/category"));
app.use("/test", require("./routes/testing"));
// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(4000, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
