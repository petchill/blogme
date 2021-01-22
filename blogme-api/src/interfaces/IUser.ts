import Joi from "joi";

export class IUserPostBody {
  email!: string;
  username?: string;
  password!: string;
  profile_image_url?: string;
}

export const userPostSchema = {
  email: Joi.string().required(),
  username: Joi.string(),
  password: Joi.string().required(),
  profile_image_url: Joi.string()
}

