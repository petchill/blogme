import { Schema } from "mongoose";
interface IUserToken { 
  _id: Schema.Types.ObjectId;
  email: string;
}
declare global{
  namespace Express {
   export interface Request {
      user: IUserToken
   }
 }
}
