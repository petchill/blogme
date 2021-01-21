import { Router } from "express";
import UserService from "./services/user.sevice";
import RoomService from "./services/room.service";

class ServiceRouter {
  public router: Router = Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.use("/users", new UserService().router);
    this.router.use("/rooms", new RoomService().router);
  }
}

export default ServiceRouter;
