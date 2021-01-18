import { Router, Request, Response } from "express";
import userModel from "../models/user.model";
const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try{
    const response = await userModel.find();
    console.log("resposne => ", response);

  } catch (error) {
    console.error(error);
    
  }
});

export default router;
