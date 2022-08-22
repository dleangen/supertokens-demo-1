import * as admin from "firebase-admin";

/**
 * When a new Session is created, we also need to create a new custom
 * Firebase Token.
 */
export const createNewSession = (originalImplementation: any) => async function (input: any) {
  try {
    const uid = input.userId;
    // Create the custom Firebase token using the Firebase Admin SDK
    const firebaseToken = await admin.auth().createCustomToken(uid);
    // Include the custom Firebase token as part of the accessTokenPayload
    input.accessTokenPayload = {
      ...input.accessTokenPayload,
      firebaseToken,
    };
    const result =  await originalImplementation.createNewSession(input);
    console.log('Result', result);
    return result;
  } catch (e) {
    const error = e as Error;
    const message = error.message || error.toString() || error;
    throw new Error(`An error occurred while creating a new Session: ${message}`);
  }
};
