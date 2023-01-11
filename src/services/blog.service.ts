import { IBlogDal } from '../interfaces/repos/blogDal.interface';
import { IBlogService } from '../interfaces/services/blogService.interface';
import { ILogger } from '../log/logger';
import Blog from '../types/blog.type';

export class BlogService implements IBlogService {
    private BlogRepo: IBlogDal;
    private _logger: ILogger;
    constructor(blogRepo: IBlogDal, logger: ILogger) {
        this.BlogRepo = blogRepo;
        this._logger = logger;
    }

    public createBlog = async (blog: Blog): Promise<Blog> => {
        const newBlog = await this.BlogRepo.createBlog(blog);
        this._logger.logInfo({ message: 'BlogService.createBlog created' });

        return newBlog;
    };

    public updateBlog = async (blogId: string, description: string) => {
        const blog = await this.BlogRepo.updateBlog(blogId, description);
        return blog;
    };

    public deleteBlog = async (blogId: string) => {
        const blog = await this.BlogRepo.deleteBlog(blogId);
        return blog;
    };

    public getBlog = async (blogId: string) => {
        const blog = await this.BlogRepo.getBlog(blogId);
        return blog;
    };

    public getAllBlogs = async () => {
        const blogs = await this.BlogRepo.getAllBlogs();
        return blogs;
    };

    public getBlogsByAuthor = async (userName: string) => {
        const blogs = await this.BlogRepo.getBlogsByAuthor(userName);
        return blogs;
    };
}
