import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CatsService} from "../../services/cats.service";
import {map, Observable} from "rxjs";
import {Cat} from "../../model/cat";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {SuperTokensAuthService} from "../../services/supertokens-auth.service";
import {CatFactsService} from "../../services/cat-facts.service";
import {HttpClient} from "@angular/common/http";
import {HttpFetchBackend} from "../../services/http-fetch-backend.service";

interface CatForm {
  name: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class TrackComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;
  cats$!: Observable<Cat[]>;
  hasCats$!: Observable<boolean>

  form: FormGroup<CatForm> = new FormGroup<CatForm>(
    {
      name: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
      description: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    }
  );

  constructor(
    private cats: CatsService,
    private auth: SuperTokensAuthService) {
    this.isAuthenticated$ = auth.isAuthenticated$;
  }

  ngOnInit(): void {
    this.cats$ = this.cats.get();
    this.hasCats$ = this.cats$
      .pipe(
        map(items => !!items && items.length > 0),
      );
  }

  onAdopt(form: FormGroup<CatForm>): void {
    const result = this.cats.adopt(form.value);
    this.form.reset();
  }

  onCancel(): void {
    this.form.reset();
  }
}
