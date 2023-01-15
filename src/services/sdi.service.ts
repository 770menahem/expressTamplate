import { ISdiDal } from "../interfaces/DAL/sdiDal.interface";
import { ISdiService } from "../interfaces/services/sdiService.interface";
import { ILogger } from "../log/logger";

export class SdiService implements ISdiService {
    private SdiRepo: ISdiDal;
    private _logger: ILogger;
    constructor(sdiRepo: ISdiDal, logger: ILogger) {
        this.SdiRepo = sdiRepo;
        this._logger = logger;
    }

    public getAllGroups = async () => {
        const groups = await this.SdiRepo.getAllGroups();
        return groups;
    }
    public getGroupById = async (id: string) => {
        const group = await this.SdiRepo.getGroupById(id);
        return group;
    }
    public createGroup = async (groupBody: any) => {
        await this.SdiRepo.createGroup(groupBody);
        this._logger.logInfo({ message: 'BlogService.createBlog created' });
    }
    public updateGroup = async (id: string, groupBody: any) => {
        await this.SdiRepo.updateGroup(id, groupBody);
    }
    public deleteGroup = async (id: string) => {
        await this.SdiRepo.deleteGroup(id);
    }
    public updateGroupOwnership = async (id: string, roleId: string) => {
        await this.SdiRepo.updateGroupOwnership(id, roleId);
    }
    public joinGroup = async (id: string, roleId: string) => {
        await this.SdiRepo.joinGroup(id, roleId);
    }


    

}