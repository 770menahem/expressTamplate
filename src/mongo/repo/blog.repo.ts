import Blog from '../../types/blog.type';
import { BaseRepository } from '../../core/baserepository';
import { IBlogRepo } from '../../interfaces/blogRepo.interface';


export class BlogRepo extends BaseRepository<Blog> implements IBlogRepo {

    public createBlog = async (blog: Blog): Promise<Blog> => {
        return await this.create(blog);
        
    };

    public updateBlog = async (blogId: string, description: string): Promise<Blog | null> => {
        return await this.update(blogId, { description });
        
    };

    public deleteBlog = async (blogId: string): Promise<Blog | null> => {
        return await this.delete(blogId);
    };

    public getBlog = async (blogId: string): Promise<Blog | null> => {
        const blog = await this.findById(blogId);
        return blog;
    };

    public getAllBlogs = async (): Promise<Blog[]> => {
        const blogs = await this.find();
        return blogs;
        
    };

    public getBlogsByAuthor = async (userName: string): Promise<Blog[] | null> => {
        try {
            const blogs: Blog[] = await this._model.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'author',
                        foreignField: '_id',
                        as: 'author',
                    },
                },
                { $match: { 'author.name': userName } },
                { $unwind: '$author' },
            ]);

            return blogs;
        } catch (error) {
            return null;
        }
    };
}
