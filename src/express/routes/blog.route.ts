import * as express from 'express';
import { wrapController } from '../utils/wraps';
import validateRequest from '../joi/joi';
import { updateSchema, createSchema } from '../joi/validator/blog.schema';
import { IBlogController } from '../../interfaces/blogController.interface';
import { BaseRouter } from '../../core/baserouter';

class BlogRouter extends BaseRouter<IBlogController>{

    constructor(blogController: IBlogController, auth: express.RequestHandler) {
        super(blogController,auth)
        this.path =  '/blogs';
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.use(this.auth);
        this.router.get('', wrapController(this.getController().getAllBlogs));
        this.router.get('/:blogId', wrapController(this.getController().getBlog));
        this.router.post('', validateRequest(createSchema), wrapController(this.getController().createBlog));
        this.router.put('/:blogId', validateRequest(updateSchema), wrapController(this.getController().updateBlog));
        this.router.delete('/:blogId', wrapController(this.getController().deleteBlog));
        this.router.get('/author/:userName', wrapController(this.getController().getBlogsByAuthor));
    }
}

export default BlogRouter;
