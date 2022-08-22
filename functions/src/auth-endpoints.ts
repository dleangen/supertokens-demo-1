import supertokens from 'supertokens-node';
import {middleware, errorHandler} from 'supertokens-node/framework/express';
import * as express from 'express';
import * as cors from 'cors';
import SuperTokens from 'supertokens-node';
import {SuperTokensInitConfig} from "./auth/super-tokens-init-config";
import {websiteDomain} from './config';

SuperTokens.init(SuperTokensInitConfig);

const app = express();

app.use(
  cors({
    origin: websiteDomain,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(middleware());
app.use(errorHandler());

export default app;
