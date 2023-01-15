import { RequestHandler } from "express";
import { ISdiController } from "../controllers/sdiController.interface";
import { wrapController } from "../utils/wraps";
import { BaseRouter } from "./baseRouter";

class SdiRouter extends BaseRouter<ISdiController> {
  constructor(sdiController: ISdiController, auth: RequestHandler) {
    super(sdiController, auth);
    this.path = "/sdi";
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.use(this.auth);
    this.router.get("", wrapController(this.controller.getAllGroups));
    this.router.get("/:id", wrapController(this.controller.getGroupById));
    this.router.post("", wrapController(this.controller.createGroup));
    this.router.put("/:id",  wrapController(this.controller.updateGroup));
    this.router.delete("/:id", wrapController(this.controller.deleteGroup));
    this.router.put("/:id/ownership", wrapController(this.controller.updateGroupOwnership));  
    this.router.put("/:id/join", wrapController(this.controller.joinGroup));

    }
}

export default SdiRouter;

