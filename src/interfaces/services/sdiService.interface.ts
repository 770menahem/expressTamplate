
export interface ISdiService {
    createGroup(groupBody: any): Promise<void>;
    updateGroup(id: string, groupBody: any): Promise<void>;
    deleteGroup(id: string): Promise<void>;
    getGroupById(id: string): Promise<void>;
    getAllGroups(): Promise<any[]>;
    updateGroupOwnership(id: string , roleId: string): Promise<void>;
    joinGroup(id: string, roleId: string): Promise<void>;
}