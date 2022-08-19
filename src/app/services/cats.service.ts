import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {Cat} from "../model/cat";

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  constructor(private db: AngularFirestore) { }

  get(): Observable<Cat[]> {
    return this.db.collection<Cat>('cats')
      .valueChanges({idField: 'id'});
  }

  async adopt(cat: Partial<Cat>): Promise<boolean> {
    const newCat: Cat = {
      id: this.db.createId(),
      name: cat.name || 'Unnamed Cat',
      description: cat.description || 'A newly adopted cat, surely quite adorable'
    };

    await this.db.collection<Cat>('cats').add(newCat);
    return true;
  }
}
