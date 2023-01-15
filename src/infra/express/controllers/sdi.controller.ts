import { Request, Response } from "express";
import { ISdiService } from "../../../interfaces/services/sdiService.interface";
import { ISdiController } from "./sdiController.interface";

export class SdiController implements ISdiController {
    private _sdiService: ISdiService;

    constructor(sdiService: ISdiService) {
        console.log("SdiController created");      
        this._sdiService = sdiService;
    }
    public getAllGroups = async (_req: Request, res: Response): Promise<void> => {
        const result = await this._sdiService.getAllGroups();
        res.json(result)

    }
    public getGroupById = async (req: Request, res: Response): Promise<void> => {
        const result = await this._sdiService.getGroupById(req.params.id);
        res.json(result)
    }
    public createGroup = async (req: Request, res: Response) => {
        await this._sdiService.createGroup(req.body);
        res.send("Created Successfully").status(200)

    }
    public updateGroup = async (req: Request, res: Response): Promise<void> => {
        await this._sdiService.updateGroup(req.params.id, req.body);
        res.send("Updated Successfully").status(200);
    }
    public deleteGroup = async (req: Request, res: Response): Promise<void> => {
        await this._sdiService.deleteGroup(req.params.id);
        res.send("Deleted Successfully").status(200);
    }
    public updateGroupOwnership = async (req: Request, res: Response): Promise<void> => {
        await this._sdiService.updateGroupOwnership(req.params.id, req.body);
        res.send("Ownership Updated Successfully").status(200);
    }
    public joinGroup = async (req: Request, res: Response): Promise<void> => {
        await this._sdiService.joinGroup(req.params.id, req.body.roleId);
        res.send("Joined Successfully").status(200);
    }


}