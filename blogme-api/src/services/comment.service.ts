import Joi from "joi";
import { Router, Request, Response } from "express";
import commentModel, { IComment } from "../models/comment.model";
import { errorLog } from "../utils/logger";
import {
  ICommentCreate,
  ICommentPatchBody,
  ICommentPostBody,
} from "../interfaces/IComment";
import { auth, IUserToken } from "../middlewares/auth";
import { Mongoose, Schema } from "mongoose";

export async function GetCommentByRoomId(roomId: string) {
  try{
    const response = await commentModel.find({ room_id: roomId})
    return response
  } catch (error) {
    errorLog(500, error, "Database: finding comment in failed")
  }
}

class CommentService {
  public router: Router = Router();
  constructor() {
    this.initilizeService();
  }

  private initilizeService() {
    this.router.get("/", this.getAllComments);
    this.router.get("/:id", this.getCommentById);
    this.router.post("/", auth, this.createComment);
    this.router.patch("/:id", auth, this.updateComment);
    this.router.delete("/:id", auth, this.deleteComment);
  }

  private validatePostSchema = (
    reqBody: any
  ): {
    validatedData: ICommentPostBody;
    validatedError: Joi.ValidationError;
  } => {
    const commentPostSchema = Joi.object({
      room_id: Joi.string().required(),
      message: Joi.string(),
    });
    const joiOptions = { convert: true, abortEarly: false, debug: true };
    const {
      error: validatedError,
      value: validatedData,
    } = commentPostSchema.validate(reqBody, joiOptions);
    return { validatedError, validatedData };
  };

  private validatePatchSchema = (
    reqBody: any
  ): {
    validatedData: ICommentPatchBody;
    validatedError: Joi.ValidationError;
  } => {
    const commentPatchSchema = Joi.object({
      message: Joi.string().required(),
    });
    const joiOptions = { convert: true, abortEarly: false, debug: true };
    const {
      error: validatedError,
      value: validatedData,
    } = commentPatchSchema.validate(reqBody, joiOptions);
    return { validatedError, validatedData };
  };

  private validateIdOwner = async (
    comment_id: string,
    userId: IUserToken["_id"]
  ): Promise<boolean> => {
    let commentData: IComment;
    try {
      commentData = await commentModel.findOne({ _id: comment_id }).lean();
    } catch (error) {
      errorLog(500, "Database: finding comment is fail");
    }
    if (commentData.owner != userId) return false;
    return true;
  };

  //GET
  private getAllComments = async (req: Request, res: Response) => {
    const query = req.query;
    try {
      const commentDataList: IComment[] = await commentModel.find(query).lean();
      const response = commentDataList;
      res.status(200);
      res.json({
        ok: true,
        status: 200,
        data: response,
      });
    } catch (error) {
      errorLog(500, error, "Database: finding comment in failed");
    }
  };

  //GET by id
  private getCommentById = async (req: Request, res: Response) => {
    const commentId = req.params.id;
    try {
      const response = await commentModel.findOne({ _id: commentId });
      if (!response) {
        res.status(204);
        res.json({
          ok: true,
          status: 204,
          data: { message: "this comment is not existing" },
        });
      }
      res.status(200);
      res.json({
        ok: true,
        status: 200,
        data: response,
      });
    } catch (error) {
      errorLog(500, "Database: removing comment is fail");
    }
  };

  //POST
  private createComment = async (req: Request, res: Response) => {
    const userData = req.user;
    const { validatedError, validatedData } = this.validatePostSchema(req.body);
    if (validatedError) {
      const errorMessages = validatedError.details
        .map((errorObj: Joi.ValidationErrorItem) => errorObj.message)
        .toString();
      errorLog(400, errorMessages);
    }
    const createdCommentPayload: ICommentCreate = {
      ...validatedData,
      owner: req.user._id,
    };
    try {
      const commentData = await commentModel.create(createdCommentPayload);
      const response = commentData;
      res.status(201);
      res.json({
        ok: true,
        status: 201,
        data: response,
      });
    } catch (error) {
      errorLog(500, error, "Database: creating comment is fail");
    }
  };

  //PATCH
  private updateComment = async (req: Request, res: Response) => {
    const commentId = req.params.id;
    const userData = req.user;
    const isOwner = await this.validateIdOwner(commentId, userData._id);
    if (!isOwner) {
      errorLog(403, "User not allowed to patch other user's room");
    }
    const { validatedError, validatedData } = this.validatePatchSchema(
      req.body
    );
    if (validatedError) {
      const errorMessages = validatedError.details
        .map((errorObj: Joi.ValidationErrorItem) => errorObj.message)
        .toString();
      errorLog(400, errorMessages);
    }
    const patchedCommentPayload = validatedData;
    try {
      const commentData = await commentModel.findOneAndUpdate(
        { _id: commentId },
        patchedCommentPayload,
        { new: true }
      );
      const response = commentData;
      if (!response) {
        res.status(204);
        res.json({
          ok: true,
          status: 204,
          data: { message: "this comment is not existing" },
        });
      }
      res.status(200);
      res.json({
        ok: true,
        status: 200,
        data: response,
      });
    } catch (error) {
      errorLog(500, error, "Database: creating comment is fail");
    }
  };

  //DELETE
  private deleteComment = async (req: Request, res: Response) => {
    const commentId = req.params.id;
    const userData = req.user;
    const isOwner = await this.validateIdOwner(commentId, userData._id);
    if (!isOwner) {
      errorLog(403, "User not allowed to delete other user's room");
    }
    try {
      const response = await commentModel.findOneAndRemove({ _id: commentId });
      if (!response) {
        res.status(204);
        res.json({
          ok: true,
          status: 204,
          data: { message: "this comment is not existing" },
        });
      }
      res.status(200);
      res.json({
        ok: true,
        status: 200,
        data: { message: "removing comment is success" },
      });
    } catch (error) {
      errorLog(500, "Database: removing comment is fail");
    }
  };
}

export default CommentService;
