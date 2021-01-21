import { string } from "joi";
import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  topic: string;
  content: string;
  like: number;
  view: number;
  tags: string[];
}

const RoomSchema: Schema = new Schema(
  {
    topic: { type: String, required: true },
    content: { type: String },
    like: { type: Number, default: 0 },
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
