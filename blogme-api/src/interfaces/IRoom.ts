import { Schema } from "mongoose";

export class IRoomPostBody{
  topic: string;
  description?: string;
  tags?: string[];
}

export class IRoomCreate extends IRoomPostBody{
  owner: Schema.Types.ObjectId
}

export class IRoomPatchBody{
  decription?: string;
  tags?: string[];
}