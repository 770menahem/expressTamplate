import initializeMongo from './mongo/initializeMongo';
import config from './config/config';
import { initializeExpress } from './initializeExpress';

const { mongo } = config;

/**
 * The main function.
 * Calls all the initialization functions.
 */
const main = async () => {
    await initializeMongo(mongo.uri);

    const port = config.server.port || 2770;

    const app = initializeExpress(port);

    app.start();
};

main().catch((err) => {
    console.log(err);
    process.exit();
});
