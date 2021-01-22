import Joi from "joi";
import { Router, Request, Response } from "express";
import roomModel, { IRoom } from "../models/room.model";
import { errorLog } from "../utils/logger";
import { IRoomPostBody, IRoomPatchBody } from "../interfaces/IRoom";
import { auth, IUserToken } from "../middlewares/auth";
import { Mongoose, Schema } from "mongoose";

class RoomService {
  public router: Router = Router();
  constructor() {
    this.initilizeService();
  }

  private initilizeService() {
    this.router.get("/", this.getAllRooms);
    this.router.post("/", this.createRoom);
    this.router.get("/view/:id", this.viewRoom);
    this.router.get("/like/:id", auth, this.likeRoom);
    this.router.get("/:id", this.getRoomById);
    this.router.patch("/:id", this.updateRoom);
    this.router.delete("/:id", this.deleteRoom);
  }

  private getAllRooms = async (req: Request, res: Response) => {
    const query = req.query;
    try {
      const roomDataList: IRoom[] = await roomModel.find(query).lean();
      const response = roomDataList;
      res.status(200);
      res.json({
        ok: true,
        status: 200,
        data: response,
      });
    } catch (error) {
      errorLog(500, error, "Database: finding room in failed");
    }
  };

  private getRoomById = async (req: Request, res: Response) => {
    //TODO: add logic if already like will cannot like
    const roomId = req.params.id;
    try {
      const response = await roomModel.findOne({ _id: roomId });
      if (!response) {
        res.status(204);
        res.json({
          ok: true,
          status: 204,
          data: { message: "this room is not existing" },
        });
      }
      res.status(200);
      res.json({
        ok: true,
        status: 200,
        data: { message: "removing room is success" },
      });
    } catch (error) {
      errorLog(500, "Database: removing room is fail");
    }
  };

  private validatePostSchema = (
    reqBody: any
  ): { validatedData: IRoomPostBody; validatedError: Joi.ValidationError } => {
    const roomPostSchema = Joi.object({
      topic: Joi.string().required(),
      content: Joi.string(),
      tags: Joi.array().items(Joi.string()),
    });
    const joiOptions = { convert: true, abortEarly: false, debug: true };
    const {
      error: validatedError,
      value: validatedData,
    } = roomPostSchema.validate(reqBody, joiOptions);
    return { validatedError, validatedData };
  };

  private validatePatchSchema = (
    reqBody: any
  ): { validatedData: IRoomPatchBody; validatedError: Joi.ValidationError } => {
    const roomPatchSchema = Joi.object({
      content: Joi.string(),
      tags: Joi.array().items(Joi.string()),
    });
    const joiOptions = { convert: true, abortEarly: false, debug: true };
    const {
      error: validatedError,
      value: validatedData,
    } = roomPatchSchema.validate(reqBody, joiOptions);
    return { validatedError, validatedData };
  };

  private createRoom = async (req: Request, res: Response) => {
    const { validatedError, validatedData } = this.validatePostSchema(req.body);
    if (validatedError) {
      const errorMessages = validatedError.details
        .map((errorObj: Joi.ValidationErrorItem) => errorObj.message)
        .toString();
      errorLog(400, errorMessages);
    }
    const createdRoomPayload = validatedData;
    try {
      const roomData = await roomModel.create(createdRoomPayload);
      const response = roomData;
      res.status(201);
      res.json({
        ok: true,
        status: 201,
        data: response,
      });
    } catch (error) {
      errorLog(500, error, "Database: creating room is fail");
    }
  };

  private viewRoom = async (req: Request, res: Response) => {
    const roomId = req.params.id;
    try {
      const roomData = await roomModel.findOneAndUpdate(
        { _id: roomId },
        {
          $inc: { view: 1 },
        }
      );
      const response = roomData;
      if (!response) {
        res.status(204);
        res.json({
          ok: true,
          status: 204,
          data: { message: "this room is not existing" },
        });
      }
      204;
      res.status(200);
      res.json({
        ok: true,
        status: 200,
        data: response,
      });
    } catch (error) {
      errorLog(500, error, "Database: updating room is fail");
    }
  };

  private checkIsLiked(
    roomData: IRoom,
    userId: Schema.Types.ObjectId
  ): boolean {
    return roomData.liked_user.includes(userId);
  }
  // TODO: dislike
  private likeRoom = async (req: Request, res: Response) => {
    const userData: IUserToken = req.user;
    const roomId = req.params.id;
    let roomData: IRoom;
    try {
      roomData = roomModel.findOne({ _id: roomId });
    } catch (error) {
      errorLog(500, error, "Database: finding room is fail");
    }
    const userAlreadyliked = this.checkIsLiked(roomData, userData._id);
    if (userAlreadyliked) {
      // unlike
      try {
        const roomData = await roomModel.findOneAndUpdate(
          { _id: roomId },
          {
            $pull: { liked_user: userData._id },
          }
        );
        const response = roomData;
        if (!response) {
          res.status(204);
          res.json({
            ok: true,
            status: 204,
            data: { message: "this room is not existing" },
          });
        }
        res.status(200);
        res.json({
          ok: true,
          status: 200,
          data: response,
        });
      } catch (error) {
        errorLog(500, error, "Database: updating room is fail");
      }
    }
    // liked
    try {
      const roomData = await roomModel.findOneAndUpdate(
        { _id: roomId },
        {
          $push: { liked_user: userData._id },
        }
      );
      const response = roomData;
      if (!response) {
        res.status(204);
        res.json({
          ok: true,
          status: 204,
          data: { message: "this room is not existing" },
        });
      }
      res.status(200);
      res.json({
        ok: true,
        status: 200,
        data: response,
      });
    } catch (error) {
      errorLog(500, error, "Database: updating room is fail");
    }
  };

  private updateRoom = async (req: Request, res: Response) => {
    const roomId = req.params.id;
    const { validatedError, validatedData } = this.validatePostSchema(req.body);
    if (validatedError) {
      const errorMessages = validatedError.details
        .map((errorObj: Joi.ValidationErrorItem) => errorObj.message)
        .toString();
      errorLog(400, errorMessages);
    }
    const patchedRoomPayload = validatedData;
    try {
      const roomData = await roomModel.findOneAndUpdate(
        { _id: roomId },
        patchedRoomPayload
      );
      const response = roomData;
      if (!response) {
        res.status(204);
        res.json({
          ok: true,
          status: 204,
          data: { message: "this room is not existing" },
        });
      }
      res.status(200);
      res.json({
        ok: true,
        status: 200,
        data: response,
      });
    } catch (error) {
      errorLog(500, error, "Database: creating room is fail");
    }
  };

  private deleteRoom = async (req: Request, res: Response) => {
    const roomId = req.params.id;
    try {
      const response = await roomModel.findOneAndRemove({ _id: roomId });
      if (!response) {
        res.status(204);
        res.json({
          ok: true,
          status: 204,
          data: { message: "this room is not existing" },
        });
      }
      res.status(200);
      res.json({
        ok: true,
        status: 200,
        data: { message: "removing room is success" },
      });
    } catch (error) {
      errorLog(500, "Database: removing room is fail");
    }
  };
}

export default RoomService;
