import jf from "joiful";
import Joi from "joi";
// joiful document => https://github.com/joiful-ts/joiful

export class IUserPostBody {
  // @jf.string().required()
  email!: string;

  // @jf.string()
  username?: string;

  // @(jf.string().required())
  password!: string;

  // @jf.string()
  profile_image_url?: string;
}

export const userPostSchema = {
  email: Joi.string().required(),
  username: Joi.string(),
  password: Joi.string().required(),
  profile_image_url: Joi.string()
}

