export interface IRoom {
  topic: string;
  description: string;
  liked_user: Array<string>;
  view: number;
  tags: Array<string>;
  owner: string;
}
