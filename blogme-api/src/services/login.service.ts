import Joi from "joi";
import jwt from "jsonwebtoken";
import { Router, Request, Response } from "express";
import userModel, { IUser } from "../models/user.model";
import { errorLog } from "../utils/logger";
import { IUserPostBody, userPostSchema } from "../interfaces/IUser";
import { genHashPassword, validateHashPassword } from "../utils/hash";
import config from "../config";

class ILogin {
  email: string;
  password: string;
}

class LoginService {
  public router: Router = Router();
  constructor() {
    this.initilizeService();
  }

  private initilizeService() {
    this.router.post("/", this.postLogin);
  }

  private validatePostSchema = (
    reqBody: any
  ): { validatedData: ILogin; validatedError: Joi.ValidationError } => {
    const userPostSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const joiOptions = { convert: true, abortEarly: false, debug: true };
    const {
      error: validatedError,
      value: validatedData,
    } = userPostSchema.validate(reqBody, joiOptions);
    return { validatedError, validatedData };
  };

  private postLogin = async (req: Request, res: Response) => {
    const { validatedError, validatedData } = this.validatePostSchema(req.body);
    if (validatedError) {
      const errorMessages = validatedError.details
        .map((errorObj: Joi.ValidationErrorItem) => errorObj.message)
        .toString();
      errorLog(400, errorMessages);
    }
    let userData: IUser;
    try {
      userData = await userModel.findOne({ email: validatedData.email }).lean();
    } catch (error) {
      errorLog(500, error, "Database: finding user is fail");
    }
    if (!userData) {
      errorLog(400, "this user is not existing");
    }
    const passwordCorrect = await validateHashPassword(
      validatedData.password,
      userData.password
    );
    if (!passwordCorrect) {
      errorLog(400, "this password is not correct");
    }
    const jwtPayload = {
      _id: userData._id,
      email: userData.email,
    };
    const jwtConfig = config.jwt;
    try {
      const accessToken = jwt.sign(
        { user: jwtPayload },
        jwtConfig.secret,
        jwtConfig.options
      );
      res.status(200),
        res.json({
          ok: true,
          status: 200,
          data: {
            access_token: accessToken,
          },
        });
    } catch (error) {
      errorLog(500, "Jwt error");
    }
  };
}

export default LoginService;
