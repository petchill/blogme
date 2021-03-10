import { Router } from "express";
import UserService from "./services/user.sevice";
import RoomService from "./services/room.service";
import LoginService from "./services/login.service";

class ServiceRouter {
  public router: Router = Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.use("/users", new UserService().router);
    this.router.use("/rooms", new RoomService().router);
    this.router.use("/login", new LoginService().router);
  }
}

export default ServiceRouter;
