import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  hashedPassword: String,
  image: String,
  role: { type: String, default: "user" },
});

const User = models.User || model("User", UserSchema);
export default User;
