import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first, lastValueFrom, map, Observable, tap} from "rxjs";

interface Fact {
  fact: string;
  length: number;
}

@Injectable({
  providedIn: 'root'
})
export class CatFactsService {

  constructor(private http: HttpClient) { }

  getFact(): Observable<string> {
    return this.http.get<Fact>('http://localhost:5001/supertokens-demo-20220805/us-central1/cats/fact')
      .pipe(
        map((result: any) => result.fact),
        first(),
      );
  }
}
