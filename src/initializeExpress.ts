import { UserRepo } from './mongo/repo/user.repo';
import App from './express/app';
import UserRouter from './express/routes/user.route';
import { userModel } from './mongo/models/user.model';
import { UserService } from './express/services/user.service';
import { UserController } from './express/controllers/user.controller';
import { BlogController } from './express/controllers/blog.controller';
import BlogRouter from './express/routes/blog.route';
import { BlogService } from './express/services/blog.service';
import blogModel from './mongo/models/blog.model';
import { BlogRepo } from './mongo/repo/blog.repo';
import Auth from './express/services/auth.service';

export function initializeExpress(port: any) {
    const userRepo = new UserRepo(userModel);
    const blogRepo = new BlogRepo(blogModel);

    const userService = new UserService(userRepo);
    const blogService = new BlogService(blogRepo);

    const userController = new UserController(userService);
    const blogController = new BlogController(blogService);

    const auth = new Auth(userService.auth);

    const userRouter = new UserRouter(userController, auth.check);
    const blogRouter = new BlogRouter(blogController, auth.check);

    return new App(port, [userRouter, blogRouter]);
}
