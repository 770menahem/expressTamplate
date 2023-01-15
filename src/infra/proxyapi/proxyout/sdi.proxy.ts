import { ISdiDal } from "../../../interfaces/DAL/sdiDal.interface";
import { ProxyOut } from "../baseproxyout";


export class SdiProxyOut extends ProxyOut implements ISdiDal{
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    public async createGroup(groupBody: any): Promise<void> {
        await this.create(groupBody);
    }
    public async updateGroup(id: string, groupBody: any): Promise<void> {
        await this.update(id, groupBody);
    }
    public async deleteGroup(id: string): Promise<void> {
        await this.delete(id);
    }
    public async getGroupById(id: string): Promise<any> {
        const data = await this.getById(id);
        return data;
    }
    public async getAllGroups(): Promise<any[]> {
        const data = await this.getAll();
        return data;
    }
    public async updateGroupOwnership(id: string , entityId: string): Promise<void> {
        await this._axiosInstance.put(`/${id}/ownership/${entityId}`);
    }
    public async joinGroup(id: string, roleId: string): Promise<void> {
        await this._axiosInstance.put(`/${id}/join/${roleId}`);
    }
    
}
