import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {Item} from "../model/item";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private db: AngularFirestore) { }

  get(): Observable<Item[]> {
    return this.db.collection<Item>('items')
      .valueChanges({idField: 'id'});
  }
}
