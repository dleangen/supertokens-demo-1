import * as express from 'express';
import * as cors from 'cors';
import {configureResponseHandler} from "./configure-response-handler";
import {getRootHandler} from "./cats/get-root-handler";
import {getFactHandler} from "./cats/get-fact-handler";
import SuperTokens from "supertokens-node";
import {SuperTokensInitConfig} from "./auth/super-tokens-init-config";

SuperTokens.init(SuperTokensInitConfig);

const app = express();

app.use(cors());

app.get('/', configureResponseHandler, getRootHandler);
app.get('/fact', configureResponseHandler, getFactHandler)

export default app;
