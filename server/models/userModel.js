const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
});

// static signup method
userSchema.statics.signup = async function (
  email,
  password,
  fullName,
  type,
  phone
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

module.exports = mongoose.model("User", userSchema);
