import { UserRepo } from './mongo/repo/user.repo';
import App from './express/app';
import UserRouter from './express/routes/user.route';
import { blogSchema } from './mongo/models/blog.model';
import { userSchema } from './mongo/models/user.model';
import { UserService } from './services/user.service';
import { UserController } from './express/controllers/user.controller';
import { BlogController } from './express/controllers/blog.controller';
import BlogRouter from './express/routes/blog.route';
import { BlogService } from './services/blog.service';
import { BlogRepo } from './mongo/repo/blog.repo';
import Auth from './services/auth.service';
import conn from './mongo/initializeMongo';
import config from './config/config';
import Logger from './infra/winston/logger';

export function initializeApp(port: any) {
    const userRepo = new UserRepo(conn, config.mongo.userCollectionName, userSchema);
    const blogRepo = new BlogRepo(conn, config.mongo.blogCollectionName, blogSchema);

    const userService = new UserService(userRepo);
    const blogService = new BlogService(blogRepo, Logger);

    const userController = new UserController(userService);
    const blogController = new BlogController(blogService);

    const auth = new Auth(userService.auth);

    const userRouter = new UserRouter(userController, auth.check);
    const blogRouter = new BlogRouter(blogController, auth.check);

    return new App(port, [userRouter, blogRouter]);
}
