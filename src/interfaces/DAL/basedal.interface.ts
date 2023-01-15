export default interface IBaseDal {
    getAll(): Promise<any[]>;
    getById(id: string): Promise<any>;
    create(item: any): Promise<any>;
    update(id: string, updatedBody: any): Promise<any>;
    delete(id: string): Promise<any>;
}
