import { Request, Response } from "express";

export interface ISdiController {
    getAllGroups(req: Request, res: Response): Promise<void>;
    getGroupById(req: Request, res: Response): Promise<void>;
    createGroup(req: Request, res: Response): Promise<void>;
    updateGroup(req: Request, res: Response): Promise<void>;
    deleteGroup(req: Request, res: Response): Promise<void>;
    updateGroupOwnership(req: Request, res: Response): Promise<void>;
    joinGroup(req: Request, res: Response): Promise<void>;

}