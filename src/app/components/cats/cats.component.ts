import { Component, OnInit } from '@angular/core';
import {CatFactsService} from "../../services/cat-facts.service";
import {map, Observable} from "rxjs";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SuperTokensAuthService} from "../../services/supertokens-auth.service";

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class CatsComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;
  fact$!: Observable<string>;
  hasFact$!: Observable<boolean>;

  constructor(
    private cats: CatFactsService,
    private auth: SuperTokensAuthService) {
    this.isAuthenticated$ = auth.isAuthenticated$;
  }

  ngOnInit(): void {
    this.fact$ = this.cats.getFact();

    this.hasFact$ = this.fact$
      .pipe(
        map(fact => !!fact && fact.length > 0),
      );
  }

}
