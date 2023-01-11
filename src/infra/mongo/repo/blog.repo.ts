import { BaseRepository } from './baseRepository';
import { IBlogDal } from '../../../interfaces/repos/blogDal.interface';
import Blog from '../../../types/blog.type';
import { createBlogDTO } from '../../../services/dtos/blog.schema';

export class BlogRepo extends BaseRepository<Blog> implements IBlogDal {
    public createBlog = async (blog: createBlogDTO): Promise<Blog> => {
        return await this.create(blog);
    };

    public updateBlog = async (blogId: string, description: string): Promise<Blog | null> => {
        return await this.update(blogId, { description });
    };

    public deleteBlog = async (blogId: string): Promise<Blog | null> => {
        return await this.deleteByIdentifier({ _id: blogId });
    };

    public getBlog = async (blogId: string): Promise<Blog | null> => {
        const blog = await this.findByIdentifier({ _id: blogId });
        return blog;
    };

    public getAllBlogs = async (): Promise<Blog[]> => {
        const blogs = await this.findAll();
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
