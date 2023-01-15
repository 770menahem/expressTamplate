import axios, { AxiosInstance } from 'axios';
import  IBaseDal  from "../../interfaces/DAL/basedal.interface";

export abstract class ProxyOut implements IBaseDal {
    protected _axiosInstance: AxiosInstance;

    constructor(baseUrl: string) {
        this._axiosInstance = axios.create({
            baseURL: baseUrl,
            timeout: 15000000,
        });
    }

    public async getAll(): Promise<any[]> {
        const res = await this._axiosInstance.get('');
        return res.data;
    }

    public async getById(id: string): Promise<any> {
        const res = await this._axiosInstance.get(`/${id}`);
        return res.data;
    }

    public async create(item: any): Promise<any> {
        const res = await this._axiosInstance.post('', item);
        return res.data;
    }

    public async update(id: string, updatedFields: any): Promise<any> {
        const res = await this._axiosInstance.put(`/${id}`, updatedFields);
        return res.data;
    }

    public async delete(id: string): Promise<any> {
        const res = await this._axiosInstance.delete(`/${id}`);
        return res.data;
    }

}