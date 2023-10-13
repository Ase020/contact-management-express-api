import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username required!"],
      unique: [true, "Username already exists"],
      min: 4,
    },
    email: {
      type: String,
      required: [true, "Email required!"],
      unique: [true, "Email already in use!"],
    },
    password: {
      type: String,
      required: [true, "Password required to register!"],
      min: 6,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export default UserModel;
