// import * as admin from "firebase-admin";
// import Session from "supertokens-node/recipe/session";

export const thirdPartySignInUpPOST = (originalImplementation: any) => async function(input: any) {
  if (originalImplementation.thirdPartySignInUpPOST === undefined) {
    throw Error("Should never come here");
  }

  console.log('thirdPartySignInUpPOST');
  // const doesUserExist = doesUserExist(input);
  // await deleteUser()

  let response = await originalImplementation.thirdPartySignInUpPOST(input);

  if (response.status === "OK") {
    if (response.createdNewUser) {
      // TODO: some post sign up logic
      console.log('New user was created', response);
    } else {
      // TODO: some post sign in logic
      // response.custom_token = 'This is my custom token, yay!';
      console.log('Existing user was signed in');
    }
  }

  return response;
};
