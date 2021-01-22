import Joi from "joi";
import { Router, Request, Response } from "express";
import userModel, { IUser } from "../models/user.model";
import { errorLog } from "../utils/logger";
import { IUserPostBody, userPostSchema } from "../interfaces/IUser";
import { genHashPassword, validateHashPassword } from "../utils/hash";

class UserService {
  public router: Router = Router();
  constructor() {
    this.initilizeService();
  }

  private initilizeService() {
    this.router.get("/", this.getAllUsers);
    this.router.post("/", this.createUser);
    this.router.get("/:id", this.getUserById);
    this.router.delete("/:id", this.deleteUser);
  }

  private getAllUsers = async (req: Request, res: Response) => {
    const query = req.query;
    try {
      const userDataList: IUser[] = await userModel.find(query).lean();
      // TODO: get rid of password

      const response = userDataList.map((userData) => {
        const { password, password_salt, ...responseData } = userData;
        return responseData;
      });
      res.status(200);
      res.json({
        ok: true,
        status: 200,
        data: response,
      });
    } catch (error) {
      errorLog(500, error, "Database: finding user in failed");
    }
  };

  private getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const response = await userModel.findOne({ _id: userId });
      if (!response) {
        res.status(204);
        res.json({
          ok: true,
          status: 204,
          data: { message: "this user is not existing" },
        });
      }
      res.status(200);
      res.json({
        ok: true,
        status: 200,
        data: { message: "removing user is success" },
      });
    } catch (error) {
      errorLog(500, "Database: removing user is fail");
    }
  };

  private validatePostSchema = (
    reqBody: any
  ): { validatedData: IUserPostBody; validatedError: Joi.ValidationError } => {
    const userPostSchema = Joi.object({
      email: Joi.string().required(),
      username: Joi.string(),
      password: Joi.string().required(),
      profile_image_url: Joi.string(),
    });

    const joiOptions = { convert: true, abortEarly: false, debug: true };
    const {
      error: validatedError,
      value: validatedData,
    } = userPostSchema.validate(reqBody, joiOptions);
    return { validatedError, validatedData };
  };

  private createUser = async (req: Request, res: Response) => {
    // TODO: gen username is not exist
    const { validatedError, validatedData } = this.validatePostSchema(req.body);
    if (validatedError) {
      const errorMessages = validatedError.details
        .map((errorObj: Joi.ValidationErrorItem) => errorObj.message)
        .toString();
      errorLog(400, errorMessages);
    }
    const { hashPassword, salt } = await genHashPassword(
      validatedData.password
    );
    const createdUserPayload = {
      ...validatedData,
      password: hashPassword,
      password_salt: salt,
    };
    console.log("payload => ", createdUserPayload);
    try {
      const userData = await userModel.create(createdUserPayload);
      const response = userData;
      res.status(201);
      res.json({
        ok: true,
        status: 201,
        data: response,
      });
    } catch (error) {
      errorLog(500, error, "Database: creating user is fail");
    }
  };

  private deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const response = await userModel.findOneAndRemove({ _id: userId });
      if (!response) {
        res.status(204);
        res.json({
          ok: true,
          status: 204,
          data: { message: "this user is not existing" },
        });
      }
      res.status(200);
      res.json({
        ok: true,
        status: 200,
        data: { message: "removing user is success" },
      });
    } catch (error) {
      errorLog(500, "Database: removing user is fail");
    }
  };
}

export default UserService;
