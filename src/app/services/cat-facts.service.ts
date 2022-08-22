import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, first, map, Observable, of} from "rxjs";
import {HttpFetchBackend} from "./http-fetch-backend.service";

interface Fact {
  fact: string;
  length: number;
}

@Injectable()
export class CatFactsService {

  constructor(private http: HttpClient) {
  }

  getFact(): Observable<string> {
    return this.http.get<Fact>('http://localhost:5001/supertokens-demo-20220805/us-central1/cats/fact')
      .pipe(
        map((result: any) => result.fact),
        catchError(err => {
          console.log(err);
          return of('err');
        }),
        first(),
      );
  }
}
