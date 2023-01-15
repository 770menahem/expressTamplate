import config from './config/config';

import Logger from './infra/winston/logger';
import Auth from './services/auth.service';
import App from './infra/express/app';
import { SdiProxyOut } from './infra/proxyapi/proxyout/sdi.proxy';
import { SdiService } from './services/sdi.service';
import SdiRouter from './infra/express/routers/sdi.route';
import { SdiController } from './infra/express/controllers/sdi.controller';

export function initializeApp(port: any) {
    const logger = new Logger();



    const sdiProxy = new SdiProxyOut(config.proxy.sdiUrl);
    const sdiService = new SdiService(sdiProxy, logger);
    const sdiController = new SdiController(sdiService);


    const auth = new Auth();

    const sdiRouter = new SdiRouter(sdiController,auth.check);

    return new App(port, [sdiRouter]);
}
