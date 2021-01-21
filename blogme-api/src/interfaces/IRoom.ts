export class IRoomPostBody{
  topic: string;
  content?: string;
  tags?: string[];
}

export class IRoomPatchBody{
  content?: string;
  tags?: string[];
}