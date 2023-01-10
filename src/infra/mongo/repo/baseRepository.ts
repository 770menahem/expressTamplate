import { Connection, FilterQuery, Model, Schema } from "mongoose";


//TODO: MAPPER ?!
export abstract class BaseRepository<T> {
    public _model: Model<T>

    constructor(db: Connection, modelName: string, schema: Schema<T>) {
        if (db.modelNames().includes(modelName)) {
            this._model = db.model(modelName);
        } else {
            this._model = db.model<T>(modelName, schema);
        }
    }

    async create(item: T): Promise<T> {
        const resItem = await this._model.create(item);
        return resItem;

    }

    async findByIdentifier(identifier: FilterQuery<T>): Promise<T | null> {
        let raw: T = await this._model.findOne(identifier).lean();
        return raw;
    }

    async update(identifier: string, item: Partial<T>): Promise<T | null> {
        const updatedRes = await this._model.findByIdAndUpdate(identifier, { $set: item })
        return updatedRes;
    }

    async deleteByIdentifier(identifier: FilterQuery<T>): Promise<T | null> {
        const resDelete = await this._model.findOneAndDelete(identifier)
        return resDelete;
    }

    async findAll(): Promise<T[]> {
        let items: T[] = await this._model.find().lean();
        return items;
    }

    async findMany(query: FilterQuery<T>): Promise<T[]> {
        let items: T[] = await this._model.find(query).lean();
        return items;
    }

}



// import mongoose, { AnyKeys, AnyObject, Connection,  Model,  Schema } from "mongoose";

// //TODO: MAPPER ?!
// export abstract class BaseRepository<T extends AnyKeys<Document> & AnyObject,Document extends mongoose.Document> {
//     public _model: Model<Document>

//     constructor(db: Connection,  modelName: string , schema: Schema<Document, Model<Document, {}, {}>, Document, {}>) {
//         if (db.modelNames().includes(modelName)) {
//             this._model = db.model(modelName);
//         } else {
//             this._model = db.model<Document>(modelName, schema);
//         }
//     }

//     async create(item: T) : Promise<void> {
//         await this._model.create(item);

//     }

//    async findById(identifier: string) : Promise<T | null> {
//     let raw: T = await this._model.findById(identifier).lean();
//     if (!raw) return null;
//     return raw;
//    }
//    async update(identifier: string,item: Partial<T>): Promise<void> {
//     await this._model.updateOne({_id: identifier},{$set: item})

//    }

//    async delete(identifier: string): Promise<void> {
//     await this._model.deleteOne({_id: identifier})
//    }
//    async find() : Promise<T[] | T> {
//     let items: T[] | T = await this._model.find({}).lean();
//     return items;
//    }

// }