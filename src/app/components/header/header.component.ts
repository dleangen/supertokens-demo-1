import {Component, OnInit} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {CommonModule} from "@angular/common";
import {NavigationStart, Router, RouterModule} from "@angular/router";
import {map, Observable} from "rxjs";
import {SuperTokensAuthService} from "../../services/supertokens-auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
  ],
})
export class HeaderComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;
  notAuthenticated$: Observable<boolean>;

  /**
   * We don't want to show the header on the 'auth' route.
   */
  notSigninPage = true;

  constructor(
    private auth: SuperTokensAuthService,
    private router: Router) {
    auth.checkForSession();
    this.isAuthenticated$ = auth.isAuthenticated$;
    this.notAuthenticated$ = this.isAuthenticated$
      .pipe(
        map(isAuthenticated => !isAuthenticated),
      );
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.notSigninPage = !event.url.startsWith('/auth');
      }
    });
  }

  async onSignOut(): Promise<void> {
    await this.auth.signOut();
    this.router.navigate(['/auth']);
  }
}
