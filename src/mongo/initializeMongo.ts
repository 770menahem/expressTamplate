import mongoose from 'mongoose';
import { logInfo } from '../log/logger';



// const opts: ConnectOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
// };

const conn = mongoose.createConnection();

/**
 * Connect to mongo
 */
export const connect = async (uri: string) => {
    logInfo('Connecting to Mongo');

    await conn.openUri(uri);

    logInfo('Mongo connection established');
};


export default conn;