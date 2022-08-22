import {apiDomain, websiteDomain} from "../config";
import Session from "supertokens-node/recipe/session";
import {TypeInput} from "supertokens-node/types";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import {emailPasswordSignUpPOST} from "./email-password-signup-handler";
import {thirdPartySignInUpPOST} from "./third-party-signinup-handler";
import {createNewSession} from "./create-new-session-handler";
import {signOutPOST} from "./sign-out-handler";
const { Google, Github } = ThirdPartyEmailPassword;

export const SuperTokensInitConfig: TypeInput = {
  framework: "express",
    supertokens: {
  // TODO: This is a core hosted for demo purposes. You can use this, but make sure to change it to your core instance URI eventually.
  connectionURI: "https://try.supertokens.com",
    apiKey: "<REQUIRED FOR MANAGED SERVICE, ELSE YOU CAN REMOVE THIS FIELD>",
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: "SuperTokens Demo App", // TODO: Your app name
      apiDomain, // TODO: Change to your app's API domain
      websiteDomain, // TODO: Change to your app's website domain,
      // The following seems to be necessary in order to get this working properly on Firebase Functions
      // TODO: Change these entries to match your setup
      websiteBasePath: '/auth',
      apiBasePath: '/',
      apiGatewayPath: '/supertokens-demo-20220805/us-central1/auth',
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      providers: [
        // We have provided you with development keys which you can use for testing.
        // IMPORTANT: Please replace them with your own OAuth keys for production use.
        Google({
          clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
          clientSecret: "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",
        }),
        Github({
          clientId: "467101b197249757c71f",
          clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
        }),
      ],
      override: {
        apis: (originalImplementation) => {
          return {
            ...originalImplementation,
            emailPasswordSignUpPOST: emailPasswordSignUpPOST(originalImplementation),
            thirdPartySignInUpPOST: thirdPartySignInUpPOST(originalImplementation),
          }
        },
      },
    }),
    Session.init({
      override: {
        functions: function (originalImplementation) {
          return {
            ...originalImplementation,
            createNewSession: createNewSession(originalImplementation),
          };
        },
        apis: (originalImplementation) => {
          return {
            ...originalImplementation,
            signOutPOST: signOutPOST(originalImplementation),
          }
        },
      },
    }),
  ],
}
