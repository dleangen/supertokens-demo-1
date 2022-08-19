import {Routes} from "@angular/router";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {HomeComponent} from "./components/home/home.component";
import {TrackComponent} from "./components/track/track.component";
import {CatsComponent} from "./components/cats/cats.component";

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
    path: '**',
    component: PageNotFoundComponent
  }
];
