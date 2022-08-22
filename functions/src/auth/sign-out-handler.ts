import * as admin from "firebase-admin";
import Session from "supertokens-node/recipe/session";

/**
 * When the user signs out, we also need to end the Firebase session
 * by revoking any refresh tokens.
 */
export const signOutPOST = (originalImplementation: any) => async function (input: any) {
  let session = await Session.getSession(input.options.req, input.options.res, input.userContext);
  const uid = session.getUserId();
  await admin.auth().revokeRefreshTokens(uid);
  return originalImplementation.signOutPOST!(input);
};
