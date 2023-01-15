import Blog from '../../types/blog.type';
import IBaseDal from './basedal.interface';

export interface IBlogDal extends IBaseDal {
    create(blog: Blog): Promise<Blog>;
    updateDescription(blogId: string, description: string): Promise<Blog | null>;
    delete(blogId: string): Promise<Blog | null>;
    getById(blogId: string): Promise<Blog | null>;
    getAll(): Promise<Blog[]>;
    getByAuthor(userName: string): Promise<Blog[] | null>;
}
