const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "Admin",
    enum: ["Sales Person", "Admin", "Super Admin"],
  },
  imageUrl: {
    type: String,
  },
  phone: { type: String },
  approved: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpire: String,
  adminId: String,
});

// static signup method
userSchema.statics.signup = async function (
  email,
  password,
  fullName,
  type,
  phone,
  adminId
) {
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const payload = { email, password: hash, fullName, phone };
  if (type) {
    payload["type"] = type;
  }
  if (adminId) {
    payload["adminId"] = adminId;
  }
  const user = await this.create(payload);

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });
userSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  console.log("Reset token byte", resetToken);
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log("hashed rt", this.resetPasswordToken);
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
