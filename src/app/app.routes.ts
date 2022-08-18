import {Routes} from "@angular/router";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {HomeComponent} from "./components/home/home.component";
import {ItemsComponent} from "./components/items/items.component";

export const APP_ROUTES: Routes  = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'items',
    component: ItemsComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
