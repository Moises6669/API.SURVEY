import { Request, Response, Router } from "express";
import { UserServices } from "../../services/user/user.service";

export class UserController {
  public router = Router();

  /**
   *
   */
  constructor() {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/hello").get(this.sayHello);
  }

  private sayHello = (req: Request, res: Response) => {
    try {
      res.json("hello");
      console.log("hola");
    } catch (error) {}
  };
}
