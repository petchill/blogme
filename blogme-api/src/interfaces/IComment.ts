import { Schema } from "mongoose";

export class ICommentPostBody {
  room_id: string;
  message: string;
}

export class ICommentCreate extends ICommentPostBody{
  owner: Schema.Types.ObjectId
}

export class ICommentPatchBody {
  message: string
}
