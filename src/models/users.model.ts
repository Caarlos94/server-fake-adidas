import { Schema, model } from "mongoose";
import { User } from "../interfaces/interfaces";

const UserSchema = new Schema<User>({
  email: { type: String, unique: true },
  password: String,
});

const UserModel = model("users", UserSchema);

export { UserModel };
