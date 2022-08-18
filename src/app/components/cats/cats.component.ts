import { Component, OnInit } from '@angular/core';
import {CatFactsService} from "../../services/cat-facts.service";
import {map, Observable} from "rxjs";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

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

  fact$!: Observable<string>;
  hasFact$!: Observable<boolean>;

  constructor(private cats: CatFactsService) { }

  ngOnInit(): void {
    this.fact$ = this.cats.getFact();

    this.hasFact$ = this.fact$
      .pipe(
        map(fact => !!fact && fact.length > 0),
      );
  }

}
