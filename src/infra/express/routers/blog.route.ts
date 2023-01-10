import * as express from 'express';
import { wrapController } from '../utils/wraps';
import validateRequest from '../joi/joi';
import { updateSchema, createSchema } from '../../services/dtos/blog.schema';
import { IBlogController } from '../../interfaces/blogController.interface';
import { BaseRouter } from '../../core/baseRouter';

class BlogRouter extends BaseRouter<IBlogController>{

    constructor(blogController: IBlogController, auth: express.RequestHandler) {
        super(blogController, auth)
        this.path = '/blogs';
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.use(this.auth);
        this.router.get('', wrapController(this.controller.getAllBlogs));
        this.router.get('/:blogId', wrapController(this.controller.getBlog));
        this.router.post('', validateRequest(createSchema), wrapController(this.controller.createBlog));
        this.router.put('/:blogId', validateRequest(updateSchema), wrapController(this.controller.updateBlog));
        this.router.delete('/:blogId', wrapController(this.controller.deleteBlog));
        this.router.get('/author/:userName', wrapController(this.controller.getBlogsByAuthor));
    }
}

export default BlogRouter;
