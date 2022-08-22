import {Component, OnInit} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss'],
  standalone: true,
  imports: [

  ],
})
export class SecretComponent {

  secret = uuidv4();

  constructor() { }
}
