import { Component } from '@angular/core';
import { Catalog } from '../service/catalog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exam-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './exam-catalog.html',
})
export class ExamCatalog {
  constructor(public catalogService: Catalog) {}
}
