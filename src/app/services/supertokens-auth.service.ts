import {Injectable} from '@angular/core';
import {BehaviorSubject, mergeMap, Observable, of} from "rxjs";
import * as Session from "supertokens-web-js/recipe/session";

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

  constructor() { }

  async checkForSession(): Promise<boolean> {
    const doesSuperTokensSessionExist = await Session.doesSessionExist();
    this.hasSessionSubject.next(doesSuperTokensSessionExist);
    return doesSuperTokensSessionExist;
  }

  signOut(): Promise<void> {
    return Session.signOut()
      .then(() => this.hasSessionSubject.next(false));
  }
}
