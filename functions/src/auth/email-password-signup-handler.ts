// import * as admin from "firebase-admin";
// import Session from "supertokens-node/recipe/session";
// import {doesUserExist} from "./new-user";
// import {deleteUser} from 'supertokens-node';

export const emailPasswordSignUpPOST = (originalImplementation: any) => async function(input: any) {
  if (originalImplementation.emailPasswordSignUpPOST === undefined) {
    throw Error("Should never come here");
  }

  console.log('emailPasswordSignUpPOST', input);
  // const doesUserExist = doesUserExist(input);
  // await deleteUser()

  let response = await originalImplementation.emailPasswordSignUpPOST(input);

  console.log('Response', response);

  if (response.status === "OK") {
    // TODO: some post sign up logic
  }

  return response;
};
