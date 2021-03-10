import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";
import { IRoom } from "./room.model";

export interface IComment extends Document {
  room_id: IRoom["_id"];
  message: string;
  liked_user: IUser["_id"][];
  owner: IUser["_id"];
}

const CommentSchema: Schema = new Schema(
  {
    room_id: { type: Schema.Types.ObjectId, ref: "Comment" },
    message: { type: String },
    liked_user: { type: [Schema.Types.ObjectId], ref: "User", defaut: [] },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "comments",
  }
);

export default mongoose.model("Comment", CommentSchema);
