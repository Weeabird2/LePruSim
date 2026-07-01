import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Catalog } from '../service/catalog';
@Component({
  selector: 'app-question-catalog',
  imports: [],
  templateUrl: './question-catalog.html',
  styleUrl: './question-catalog.css',
})
export class QuestionCatalog {
  constructor(public catalogService: Catalog) {}
}
