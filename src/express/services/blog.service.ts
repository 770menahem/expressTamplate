import Blog from '../../types/blog.type';
import { IBlogService } from '../../interfaces/blogService.interface';
import { logInfo } from '../../log/logger';
import { IBlogRepo } from '../../interfaces/blogRepo.interface';

export class BlogService implements IBlogService {
    private BlogRepo: IBlogRepo;
    constructor(blogRepo: IBlogRepo) {
        logInfo('BlogService created');
        this.BlogRepo = blogRepo;
    }

    public createBlog = async (blog: Blog) : Promise<Blog>=> {
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
