import { Request, Response, Router } from "express";
import { UserServices } from "../../services/user/user.service";

export class UserController {
  public router = Router();

  /**
   *
   */
  constructor(private userSservice: UserServices) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/hello").get(this.sayHello);
    this.router.route("/newuser").post(this.createUser);
  }

  private createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userSservice.createUser(req.body);
      res.status(201).json({
        ok: true,
        user,
      });
    } catch (error) {
      res.json({ error });
    }
  };

  private sayHello = (req: Request, res: Response) => {
    try {
      res.json("hello");
    } catch (error) {}
  };
}
