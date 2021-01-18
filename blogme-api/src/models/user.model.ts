import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  password_salt: string;
  profile_image_url?: string;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String },
    password: { type: String, required: true },
    password_salt: { type: String, required: true },
    profile_image_url: {type: String}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "users",
  }
);

export default mongoose.model("User", UserSchema);
