import * as express from "express"
// import  BaseController  from "./basecontroller";

export abstract class BaseRouter<T>{

    public path;
    public router = express.Router();
    private controller: T;
    public auth: express.RequestHandler;
    
    constructor(controller: T, auth: express.RequestHandler) {
        this.controller = controller;
        this.auth = auth;
        this.initializeRoutes();
    }
    /**
     * getRouter
     */
    public getRouter() {
        return this.router;
        
    }

    public getController (){
        return this.controller;
    }

    public abstract initializeRoutes(): void;
}