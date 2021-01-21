import bcrypt from "bcrypt";
import { errorLog } from "./logger";
const saltRounds = 10;

interface Result {
  salt: string,
  hashPassword: string
}

export async function genHashPassword(password: string): Promise<Result> {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    return { salt, hashPassword };
  } catch (error) {
    errorLog(500, error, "hash password is fail");
  }
}

export async function validateHashPassword(password: string, hashPassword: string): Promise<boolean> {
  try {
    const passwordIsCorrect = await bcrypt.compareSync(password, hashPassword);
    return passwordIsCorrect;
  } catch (error) {
    errorLog(500, error, "validate hashed password is fail");
  }
}
