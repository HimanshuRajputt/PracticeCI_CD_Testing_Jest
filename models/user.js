import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  age: { type: Number, require: true },
  city: { type: String, require: true },
  email: { type: String, require: true },
  status: { type: String, enum: ["active","inactive", "pending"], default: "pending" },
});

const User= mongoose.model("User",userSchema)

export default User