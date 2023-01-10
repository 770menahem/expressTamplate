import { IUserController } from './../../interfaces/userController.interface';
import * as express from 'express';
import { wrapController } from '../utils/wraps';
import { updateSchema, createSchema } from '../joi/validator/user.schema';
import validateRequest from '../joi/joi';
import { BaseRouter } from '../../core/baseRouter';

class UserRouter extends BaseRouter<IUserController> {

    constructor(userController: IUserController, auth: express.RequestHandler) {
        super(userController, auth)
        this.path = '/users';
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post('/login', wrapController(this.controller.login));
        this.router.post('', validateRequest(createSchema), wrapController(this.getController().createUser));
        this.router.use(this.auth);
        this.router.get('', wrapController(this.getController().getAllUsers));
        this.router.get('/:userId', wrapController(this.getController().getUserById));
        this.router.put('/:userId', validateRequest(updateSchema), wrapController(this.getController().updateUser));
        this.router.delete('/:userId', wrapController(this.getController().deleteUser));
    }
}

export default UserRouter;
