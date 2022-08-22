import { Component, OnInit } from '@angular/core';
import {CatFactsService} from "../../services/cat-facts.service";
import {map, Observable, shareReplay} from "rxjs";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SuperTokensAuthService} from "../../services/supertokens-auth.service";
import {HttpClient} from "@angular/common/http";
import {HttpFetchBackend} from "../../services/http-fetch-backend.service";

@Component({
  selector: 'app-cats',
  templateUrl: './fact.component.html',
  styleUrls: ['./fact.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
    {
      provide: HttpClient,
      useFactory: (backend: HttpFetchBackend) => new HttpClient(backend),
      deps: [HttpFetchBackend]
    },
    {
      provide: CatFactsService,
      useFactory: (http: HttpClient) => new CatFactsService(http),
      deps: [HttpClient]
    },
  ],
})
export class FactComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;
  fact$!: Observable<string>;
  hasFact$!: Observable<boolean>;

  constructor(
    private cats: CatFactsService,
    private auth: SuperTokensAuthService) {
    auth.checkForSession();
    this.isAuthenticated$ = auth.isAuthenticated$;
  }

  ngOnInit(): void {
    this.fact$ = this.cats.getFact().pipe(shareReplay());

    this.hasFact$ = this.fact$
      .pipe(
        map(fact => !!fact && fact.length > 0),
      );
  }

}
