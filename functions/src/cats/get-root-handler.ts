import * as express from "express";

export const getRootHandler = async (request: express.Request, response: express.Response) => {
  try {
    response.status(200).send('Meow!');
  } catch (error) {
    response.status(400).json(`{error: ${error}}`);
  }
};
