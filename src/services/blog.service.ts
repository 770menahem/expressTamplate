import { IBlogRepo } from "../interfaces/repos/blogRepo.interface";
import { IBlogService } from "../interfaces/services/blogService.interface";
import { ILogger } from "../log/logger";
import Blog from "../types/blog.type";

export class BlogService implements IBlogService {
    private BlogRepo: IBlogRepo;
    private _logger: ILogger;
    constructor(blogRepo: IBlogRepo, logger: ILogger) {
        this.BlogRepo = blogRepo;
        this._logger = logger;
    }

    public createBlog = async (blog: Blog): Promise<Blog> => {
        this._logger.logInfo({ message: 'BlogService.createBlog created' });
        return await this.BlogRepo.createBlog(blog);

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