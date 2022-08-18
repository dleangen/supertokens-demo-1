import * as functions from "firebase-functions";
import * as express from 'express';
import * as cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors());

/**
 * When accessing via localhost, need to add a CORS header.
 */
const localhostApiPort = '4200';

export const cats = functions.https.onRequest(async (request, response) => {
  try {
    const resp = await axios.get('https://catfact.ninja/fact');
    response.set('Access-Control-Allow-Origin', `http://localhost:${localhostApiPort}`);
    response.status(200).json(resp.data);
  } catch (error) {
    response.status(400).json(`{error: ${error}}`);
  }
});
