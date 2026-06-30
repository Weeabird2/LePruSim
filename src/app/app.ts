import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Catalog } from './service/catalog';
import { CatalogInfo } from './data/catalog-info';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  catalog?: CatalogInfo;

  constructor(private catalogService: Catalog) {}

  ngOnInit() {
    this.catalogService.getCatalog().subscribe({
      next: (data) => {
        this.catalog = data;
      },
      error: (err) => {
        console.error('Kann nicht geladen werden!', err);
      },
    });
  }
}
