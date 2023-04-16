const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    phoneNumber: { type: String, required: true, trim: true, unique: true },
    roles: { type: [String], default: ["USER"] },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    team: { type: [String], default: [] },
    token: { type: String, default: "" },
    lastLogin: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("user", UserSchema);

module.exports = {
  UserModel,
};
