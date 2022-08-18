import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ItemsService} from "../../services/items.service";
import {map, Observable} from "rxjs";
import {Item} from "../../model/item";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class ItemsComponent implements OnInit {

  items$!: Observable<Item[]>;
  hasItems$!: Observable<boolean>

  constructor(private items: ItemsService) { }

  ngOnInit(): void {
    this.items$ = this.items.get();
    this.hasItems$ = this.items$
      .pipe(
        map(items => !!items && items.length > 0),
      );
  }
}
