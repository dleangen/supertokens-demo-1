import {Injectable} from '@angular/core';
import {BehaviorSubject, mergeMap, Observable, of} from "rxjs";
import * as Session from "supertokens-web-js/recipe/session";
import {FirebaseAuthService} from "./firebase-auth.service";

@Injectable({
  providedIn: 'root'
})
export class SuperTokensAuthService {

  private hasSessionSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.hasSessionSubject.asObservable();
  userId$ = this.isAuthenticated$
    .pipe(
      mergeMap(hasSession => hasSession ? Session.getUserId() : of(null)),
    );

  constructor(private firebase: FirebaseAuthService) { }

  async checkForSession(): Promise<boolean> {
    const doesSuperTokensSessionExist = await Session.doesSessionExist();
    this.hasSessionSubject.next(doesSuperTokensSessionExist);
    if (doesSuperTokensSessionExist) {
      const token = (await Session.getAccessTokenPayloadSecurely()).firebaseToken;
      // Don't need to await this: run in parallel
      this.firebase.signInOrRefreshSession(token);
    }
    return doesSuperTokensSessionExist;
  }

  async signOut(): Promise<void> {
    await Session.signOut();
    await this.firebase.signOut();
    this.hasSessionSubject.next(false);
  }
}
