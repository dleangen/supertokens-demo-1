import {Routes} from "@angular/router";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {HomeComponent} from "./components/home/home.component";
import {TrackComponent} from "./components/track/track.component";
import {CatsComponent} from "./components/cats/cats.component";
import {SignInComponent} from "./components/signin/signin.component";
import {SecretComponent} from "./components/secret/secret.component";
import {IsAuthenticatedGuard} from "./guards/is-authenticated.guard";

export const APP_ROUTES: Routes  = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'track',
    component: TrackComponent,
  },
  {
    path: 'learn',
    component: CatsComponent,
  },
  {
    path: 'auth',
    component: SignInComponent,
  },
  {
    path: 'secret',
    component: SecretComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
