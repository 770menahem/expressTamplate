import IBaseDal from "./basedal.interface";

export interface ISdiDal extends IBaseDal{
    createGroup(groupBody: any): Promise<void>;
    updateGroup(id: string, groupBody: any): Promise<void>;
    deleteGroup(id: string): Promise<void>;
    getGroupById(id: string): Promise<void>;
    getAllGroups(): Promise<any[]>;
    updateGroupOwnership(id: string , entityId: string): Promise<void>;
    joinGroup(id: string, roleId: string): Promise<void>;
}