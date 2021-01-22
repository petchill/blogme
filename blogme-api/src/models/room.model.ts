import { string } from "joi";
import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IRoom extends Document {
  topic: string;
  content: string;
  liked_user: IUser["_id"][];
  view: number;
  tags: string[];
}

const RoomSchema: Schema = new Schema(
  {
    topic: { type: String, required: true },
    content: { type: String },
    liked_user: { type: [Schema.Types.ObjectId], ref: "User", defaut: [] },
    view: { type: Number, default: 0 },
    tags: { type: [String], defaut: [] },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "rooms",
  }
);

export default mongoose.model("Room", RoomSchema);
