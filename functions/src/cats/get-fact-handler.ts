import axios from 'axios';
import * as express from "express";

export const getFactHandler = async (request: express.Request, response: express.Response) => {
  try {
    const resp = await axios.get('https://catfact.ninja/fact');
    response.status(200).json(resp.data);
  } catch (error) {
    response.status(400).json(`{error: ${error}}`);
  }
};
