import * as express from 'express';
import * as cors from 'cors';
import {configureResponseHandler} from "./configure-response-handler";
import {getRootHandler} from "./cats/get-root-handler";
import {getFactHandler} from "./cats/get-fact-handler";
import {verifySession} from "supertokens-node/recipe/session/framework/express";
import SuperTokens from "supertokens-node";
import {SuperTokensInitConfig} from "./auth/super-tokens-init-config";
import {websiteDomain} from "./config";
import supertokens from "supertokens-node";

SuperTokens.init(SuperTokensInitConfig);

const app = express();

app.use(
  cors({
    origin: websiteDomain,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.get('/', configureResponseHandler, getRootHandler);
app.get('/fact', configureResponseHandler, verifySession(), getFactHandler)

export default app;
